using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class GetPopularMovies
  {
    public class Query : IRequest<Result<List<Movie>>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<List<Movie>>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }
      public async Task<Result<List<Movie>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var popularMoviesIds = await _context.PopularMovies
          .Select(pm => pm.MovieId)
          .ToListAsync();
        var movies = await _context.Movies
          .Where(m => popularMoviesIds
            .Contains(m.Id))
          .OrderBy(x => x.ImageUrl == null ? 1 : 0)
          .ThenBy(x => x.Title)
          .ToListAsync();

        return Result<List<Movie>>.Success(movies);
      }
    }
  }
}