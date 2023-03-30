using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class GetMovieLists
  {
    public class Query : IRequest<Result<List<MovieList>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<MovieList>>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }
      public async Task<Result<List<MovieList>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

        var userMovieList = await _context.AppUserMovieList
          .Include(x => x.MovieList)
          .Where(x => x.AppUserId == user.Id)
          .ToListAsync();

        var movieLists = userMovieList.Select(x => x.MovieList).Select(x => new MovieList { Id = x.Id, Name = x.Name }).ToList();

        return Result<List<MovieList>>.Success(movieLists);
      }
    }
  }
}