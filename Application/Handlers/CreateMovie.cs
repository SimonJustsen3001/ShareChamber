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

          dynamic movieObject = JsonConvert.DeserializeObject(body);
          Console.WriteLine(movieObject);

          movieIds = GetMovieIds(movieObject.d);

          // movies = ParseMovie(movieObject.d);
        }

        var getMoviesUri = new Uri($"https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList={movieIds}&info=base_info");

        System.Console.WriteLine($"https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList={movieIds}&info=base_info");


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
          System.Console.WriteLine("before deserialize");
          var movieObject = JsonConvert.DeserializeObject<MovieResponse>(body);
          System.Console.WriteLine("after deserialize");
          movies = ParseMovie(movieObject);
        }

        foreach (var movie in movies)
        {
          if (!_context.Movies.AsNoTracking().Any(x => x.Id == movie.Id))
            _context.Movies.Add(movie);
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to find movie");

        return Result<Unit>.Success(Unit.Value);
      }

      private string GetMovieIds(dynamic movieObject)
      {
        string movieIds = "";

        foreach (var movie in movieObject)
        {
          if (string.IsNullOrEmpty(Convert.ToString(movie.id)))
          {
            continue;
          }
          if (movieIds == "")
            movieIds = Convert.ToString(movie.id);
          else
            movieIds = $"{movieIds}%2C{Convert.ToString(movie.id)}";
        }

        return movieIds;
      }

      private List<Movie> ParseMovie(MovieResponse movieObject)
      {
        List<Movie> movies = new List<Movie>();

        foreach (var movie in movieObject.Movies)
        {
          if (movie.Title.Text == null)
            continue;
          movies.Add(new Movie
          {
            Title = movie.Title?.Text ?? string.Empty,
            TitleType = movie.TitleType?.Text ?? string.Empty,
            Description = movie.Plot?.PlotTextObj?.PlainText ?? string.Empty,
            Rating = Convert.ToDecimal(movie.RatingsSummary?.AggregateRating ?? 0),
            Voters = movie.RatingsSummary?.VoteCount ?? 0,
            Year = movie.ReleaseDate?.Year ?? 0,
            RunTime = movie.Runtime?.Seconds ?? 0,
            Id = movie.Id,
            ImageUrl = movie.PrimaryImage?.Url ?? string.Empty
          });
        }

        return movies;
      }
    }
  }
}