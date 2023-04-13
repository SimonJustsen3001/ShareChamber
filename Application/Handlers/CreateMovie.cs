using Application.Core;
using Application.Interfaces;
using Application.JsonDTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistance;


namespace Application.Handlers
{
  public class CreateMovie
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string Query { get; set; }
    }

    // public class CommandValidator : AbstractValidator<Command>
    // {
    //   public CommandValidator()
    //   {
    //     RuleFor(x => x.Trip).SetValidator(new TripValidator());
    //   }
    // }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {

        var movies = new List<Movie>();
        var genres = new List<Genre>();
        var movieIds = "";
        Dictionary<string, string> titleFeaturedActors = new Dictionary<string, string>();
        Dictionary<string, string> titleDirector = new Dictionary<string, string>();

        var requestUri = $"https://imdb8.p.rapidapi.com/auto-complete?q={request.Query}";

        var client = new HttpClient();
        var movieIdRequest = new HttpRequestMessage
        {
          Method = HttpMethod.Get,
          RequestUri = new Uri(requestUri),
          Headers =
          {
            { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
            { "X-RapidAPI-Host", "imdb8.p.rapidapi.com" },
          },
        };
        using (var response = await client.SendAsync(movieIdRequest))
        {
          response.EnsureSuccessStatusCode();
          var body = await response.Content.ReadAsStringAsync();
          var movieObject = JsonConvert.DeserializeObject<MovieSearchResponse>(body);
          System.Console.WriteLine(body);
          foreach (var movie in movieObject.D)
          {
            titleFeaturedActors[movie.Id] = movie.S;
            if (movieIds != "")
            {
              movieIds = $"{movieIds}%2C{movie.Id}";
              continue;
            }
            movieIds = movie.Id;
          }
        }

        System.Console.WriteLine("\n\n Got movie Ids\n\n");



        var directorRequest = new HttpRequestMessage
        {
          Method = HttpMethod.Get,
          RequestUri = new Uri($"https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList={movieIds}&info=creators_directors_writers"),
          Headers =
          {
            { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
            { "X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com" },
          },
        };
        using (var response = await client.SendAsync(directorRequest))
        {
          response.EnsureSuccessStatusCode();
          var body = await response.Content.ReadAsStringAsync();
          var movieObject = JsonConvert.DeserializeObject<DirectorResponse>(body);
          foreach (var movieResult in movieObject.Results)
          {
            if (movieResult.Directors != null && movieResult.Directors.Count > 0)
            {
              var firstDirector = movieResult.Directors[0];
              if (firstDirector.Credits != null && firstDirector.Credits.Count > 0)
              {
                string directorName = firstDirector.Credits[0].Name.Nametext.Text;
                titleDirector[movieResult.Id] = directorName;
              }
            }
          }
        }

        System.Console.WriteLine("\n\n Got director name \n\n");

        var getMoviesUri = new Uri($"https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList={movieIds}&info=base_info");

        var movieRequest = new HttpRequestMessage
        {
          Method = HttpMethod.Get,
          RequestUri = getMoviesUri,
          Headers =
          {
            { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
            { "X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com" },
          },
        };
        using (var response = await client.SendAsync(movieRequest))
        {
          response.EnsureSuccessStatusCode();
          var body = await response.Content.ReadAsStringAsync();
          var movieObject = JsonConvert.DeserializeObject<MovieResponse>(body);
          movies = ParseMovie(movieObject, titleFeaturedActors, titleDirector);
          System.Console.WriteLine($"Printing body: {body}");
        }

        foreach (var movie in movies)
        {
          if (!_context.Movies.AsNoTracking().Any(x => x.Id == movie.Id))
            _context.Movies.Add(movie);
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("No movies available");

        return Result<Unit>.Success(Unit.Value);
      }

      private List<Movie> ParseMovie(MovieResponse movieObject, Dictionary<string, string> titleFeaturedActors, Dictionary<string, string> titleDirector)
      {
        List<Movie> movies = new List<Movie>();

        if (movieObject?.Movies == null)
        {
          return movies;
        }

        foreach (var movie in movieObject.Movies)
        {
          List<MovieGenre> movieGenre = new List<MovieGenre>();
          if (movie.Title.Text == null)
            continue;

          if (movie?.Genres?.GenreList != null)
          {

            foreach (var genre in movie.Genres.GenreList)
            {
              var existingGenre = _context.Genres.AsNoTracking().FirstOrDefault(x => x.Id == genre.Id);
              if (existingGenre == null)
              {
                existingGenre = new Genre { Id = genre.Id }; // Assuming your Genre class has a Name property
                _context.Genres.Add(existingGenre);
                _context.SaveChanges(); // Save the changes to create the new genre in the database
              }

              System.Console.WriteLine($"inside parse of movie {movie.Id} {existingGenre.Id}");

              movieGenre.Add(new MovieGenre
              {
                MovieId = movie.Id,
                GenreId = existingGenre.Id
              });

            }
          }

          titleFeaturedActors.TryGetValue(movie.Id, out string featuredActors);
          titleDirector.TryGetValue(movie.Id, out string director);

          movies.Add(new Movie
          {
            Title = movie.Title?.Text ?? string.Empty,
            TitleType = movie.TitleType?.Text ?? string.Empty,
            Description = movie.Plot?.PlotTextObj?.PlainText ?? string.Empty,
            Rating = Convert.ToDecimal(movie.RatingsSummary?.AggregateRating ?? 0),
            Voters = movie.RatingsSummary?.VoteCount ?? 0,
            Year = movie.ReleaseDate?.Year ?? 0,
            RunTime = movie.Runtime?.Seconds ?? 0,
            FeaturedActors = featuredActors ?? "",
            Director = director ?? "",
            Id = movie.Id,
            ImageUrl = movie.PrimaryImage?.Url ?? string.Empty,
            MovieGenres = movieGenre,
          });
        }

        return movies;
      }
    }
  }
}