using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class DeleteMovieList
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Guid MovieListId { get; set; }
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

        var appUserMovieListEntry = await _context.AppUserMovieList.SingleOrDefaultAsync(x =>
            x.MovieListId == request.MovieListId &&
            x.AppUserId == user.Id);

        if (appUserMovieListEntry == null)
          return Result<Unit>.Failure("User has no connection to the list");

        if (!appUserMovieListEntry.isOwner)
          return Result<Unit>.Failure("User does not own the list");

        var movieList = await _context.MovieList.FindAsync(request.MovieListId);

        if (movieList == null)
          return Result<Unit>.Failure("MovieList not found");

        _context.MovieList.Remove(movieList);
        _context.AppUserMovieList.Remove(appUserMovieListEntry);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to delete list");

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}