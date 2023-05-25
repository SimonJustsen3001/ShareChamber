using API.DTOs;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class RemoveMovieFromMovieLists
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string MovieId { get; set; }

      public UpdateMovieListsDTO MovieLists { get; set; }
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

        if (user == null)
          return Result<Unit>.Failure("User not found");


        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
          try
          {
            var movie = await _context.Movies.FindAsync(request.MovieId);

            if (movie == null)
              return Result<Unit>.Failure("Movie not found");

            foreach (var movieListId in request.MovieLists.MovieLists)
            {
              var appUser = await _context.AppUserMovieList
                .Include(x => x.MovieList)
                .ThenInclude(x => x.MovieMovieLists)
                .ThenInclude(x => x.Movie)
                .SingleOrDefaultAsync(x => x.AppUserId == user.Id && x.MovieListId == movieListId);

              var movieList = appUser?.MovieList;

              if (movieList is null)
                return Result<Unit>.Failure("Movie list not found");

              var existingMovies = movieList.MovieMovieLists
                .Select(mml => mml.Movie.Id)
                .ToHashSet();

              if (!existingMovies.Contains(request.MovieId))
                return Result<Unit>.Failure("Movie is not on list");

              movieList.MovieMovieLists.Remove(movieList.MovieMovieLists.SingleOrDefault(x => x.MovieListId == movieListId && x.MovieId == request.MovieId));
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the database");
            await transaction.CommitAsync();

            return Result<Unit>.Success(Unit.Value);
          }
          catch (System.Exception)
          {
            await transaction.RollbackAsync();
            throw;
          }
        }

      }
    }
  }
}