using Application.Core;
using Application.Interfaces;
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

        var requestUri = $"https://imdb8.p.rapidapi.com/auto-complete?q={request.Query}";

        var client = new HttpClient();
        var IMDBrequest = new HttpRequestMessage
        {
          Method = HttpMethod.Get,
          RequestUri = new Uri(requestUri),
          Headers =
          {
            { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
            { "X-RapidAPI-Host", "imdb8.p.rapidapi.com" },
          },
        };
        using (var response = await client.SendAsync(IMDBrequest))
        {
          response.EnsureSuccessStatusCode();
          var body = await response.Content.ReadAsStringAsync();

          dynamic movieObject = JsonConvert.DeserializeObject(body);

          movies = ParseMovie(movieObject.d);

        }

        foreach (var movie in movies)
        {
          if (_context.Movies.AsNoTracking().Any(x => x.Id == movie.Id))
            continue;
          _context.Movies.Add(movie);
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to find movie");

        return Result<Unit>.Success(Unit.Value);
      }

      private List<Movie> ParseMovie(dynamic movieObject)
      {
        List<Movie> movies = new List<Movie>();

        foreach (var movie in movieObject)
        {
          var movieEntity = new Movie();
          if (!string.IsNullOrEmpty(Convert.ToString(movie.id)))
          {
            movieEntity.Id = movie.id;
          }
          if (!string.IsNullOrEmpty(Convert.ToString(movie.l)))
          {
            movieEntity.Title = movie.l;
          }
          if (!string.IsNullOrEmpty(Convert.ToString(movie.qid)))
          {
            movieEntity.TitleType = movie.qid;
          }
          if (!string.IsNullOrEmpty(Convert.ToString(movie.s)))
          {
            movieEntity.Author = movie.s;
          }
          if (!string.IsNullOrEmpty(Convert.ToString(movie.y)))
          {
            movieEntity.Year = movie.y;
          }
          if (!string.IsNullOrEmpty(Convert.ToString(movie.i)))
          {
            if (!string.IsNullOrEmpty(Convert.ToString(movie.i.imageUrl)))
              movieEntity.ImageUrl = movie.i.imageUrl;
          }
          movies.Add(movieEntity);
        }
        return movies;
      }
    }
  }
}