using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class UpdateMovieList
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
          .ThenInclude(x => x.MovieMovieLists)
          .SingleOrDefaultAsync(x => x.AppUserId == user.Id && x.MovieListId == request.MovieListId);

        // Authentication (if user has access to the list)
        if (userMovieList == null)
          return Result<Unit>.Failure("Authorization failed: User does not have access to movie list");

        if (userMovieList.MovieList == null)
          return Result<Unit>.Failure("Authorization failed: User does not have access to movie list");
        // Ensuring Movie and List exist in database
        if (!await _context.Movies.AnyAsync(x => x.Id == request.MovieId))
        {
          return Result<Unit>.Failure("Failed to find movie");
        }

        if (_context.MovieMovieList.Any(x => x.Movie.Id == request.MovieId && x.MovieList.Id == request.MovieListId))
          return Result<Unit>.Failure("Movie is already on the list");

        userMovieList.MovieList.MovieMovieLists.Add(new MovieMovieList
        {
          Movie = _context.Movies.FirstOrDefault(x => x.Id == request.MovieId),
          MovieList = userMovieList.MovieList
        });

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to update the database");

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}