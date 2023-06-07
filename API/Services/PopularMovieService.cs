using API.Services;
using Application.JsonDTOs;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Services
{
  public class PopularMovieService : BackgroundService
  {
    private readonly DataContext _context;
    public PopularMovieService(DataContext context)
    {
      _context = context;
    }

    protected override async Task ExecuteAsync(CancellationToken cancelToken)
    {
      while (!cancelToken.IsCancellationRequested)
      {
        var nextRunTime = DateTime.Now.AddDays(2);
        var delay = nextRunTime - DateTime.Now;

        await Task.Delay(delay, cancelToken);
        await UpdatePopular();
      }
    }

    public async Task UpdatePopular()
    {
      System.Console.WriteLine("Starting update");
      try
      {
        var movies = new List<Movie>();
        var genres = new List<Genre>();
        var allMovies = new List<Movie>();
        var batchSize = 25;
        var apiKey = Environment.GetEnvironmentVariable("API_KEY");


        Dictionary<string, string> titleFeaturedActors = new Dictionary<string, string>();
        Dictionary<string, string> titleDirector = new Dictionary<string, string>();

        APIHelper api = new APIHelper(apiKey, titleFeaturedActors, titleDirector);

        var splitMovieIds = api.GetPopularIdsFromAPI();
        for (int i = 0; i < 4; i++)
        {
          var batch = splitMovieIds.GetRange(i * batchSize, batchSize);
          var movieIds = string.Join("%2C", batch);

          api.PopulateActorField(movieIds);
          api.PopulateDirectorField(movieIds);
          MovieResponse movieObject = api.GetMoviesFromAPI(movieIds);
          movies = ParseMovie(movieObject, titleFeaturedActors, titleDirector);

          foreach (var movie in movies)
          {
            if (!_context.Movies.AsNoTracking().Any(x => x.Id == movie.Id))
              _context.Movies.Add(movie);
          }
          allMovies.AddRange(movies);
        }


        var existingPopularMovies = _context.PopularMovies.ToList();

        var moviesToRemove = existingPopularMovies
          .Where(pm => !allMovies.Any(am => am.Id == pm.MovieId))
          .ToList();

        var moviesToAdd = allMovies
          .Where(am => !existingPopularMovies.Any(pm => pm.MovieId == am.Id))
          .Select(am => new PopularMovie { MovieId = am.Id })
          .ToList();

        if (moviesToRemove.Count > 0 || moviesToAdd.Count > 0)
        {
          _context.PopularMovies.RemoveRange(moviesToRemove);
          await _context.PopularMovies.AddRangeAsync(moviesToAdd);
        }

        var result = await _context.SaveChangesAsync() > 0;
        if (result)
          System.Console.WriteLine("Database updated successfully");
        else
          System.Console.WriteLine("Nothing to update");

      }
      catch (Exception ex)
      {
        System.Console.WriteLine($"Failed: {ex}");
      }
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
              existingGenre = new Genre { Id = genre.Id };
              _context.Genres.Add(existingGenre);
              _context.SaveChanges();
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