using API.Services;
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

        Dictionary<string, string> titleFeaturedActors = new Dictionary<string, string>();
        Dictionary<string, string> titleDirector = new Dictionary<string, string>();
        APIHelper api = new APIHelper(titleFeaturedActors, titleDirector);

        var movieIds = api.GetIdsFromAPI(request.Query);
        if (movieIds == "")
          return Result<Unit>.Failure("No movies found");
        api.PopulateDirectorField(movieIds);
        MovieResponse movieObject = api.GetMoviesFromAPI(movieIds);
        movies = ParseMovie(movieObject, titleFeaturedActors, titleDirector);

        foreach (var movie in movies)
        {
          if (!_context.Movies.AsNoTracking().Any(x => x.Id == movie.Id))
            _context.Movies.Add(movie);
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("No changes made");

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