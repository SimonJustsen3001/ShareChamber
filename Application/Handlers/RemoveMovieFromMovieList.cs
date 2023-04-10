using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class RemoveMovieFromMovieList
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Guid MovieListId { get; set; }
      public string MovieId { get; set; }
    }

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
        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

        var userMovieList = await _context.AppUserMovieList
          .Include(x => x.MovieList)
          .SingleOrDefaultAsync(x => x.AppUserId == user.Id && x.MovieListId == request.MovieListId);

        // Authentication (if user has access to the list)
        if (userMovieList == null)
          return Result<Unit>.Failure("Authorization failed: User does not have access to movie list");

        if (userMovieList.MovieList == null)
          return Result<Unit>.Failure("Authorization failed: User does not have access to movie list test");
        // Ensuring Movie and List exist in database
        if (!await _context.Movies.AnyAsync(x => x.Id == request.MovieId))
        {
          return Result<Unit>.Failure("Failed. Movie does not exist");
        }

        var movieMovieList = _context.MovieMovieList.SingleOrDefault(x => x.MovieId == request.MovieId && x.MovieListId == request.MovieListId);

        if (movieMovieList == null)
          return Result<Unit>.Failure("Movie does not exist on the list");

        _context.MovieMovieList.Remove(movieMovieList);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to update the database");

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}