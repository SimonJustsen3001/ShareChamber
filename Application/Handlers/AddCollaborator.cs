using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class AddCollaborator
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Guid MovieListId { get; set; }
      public string CollaboratorDisplayName { get; set; }
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
        var collaborator = await _context.Users.SingleOrDefaultAsync(x => x.DisplayName == request.CollaboratorDisplayName);

        if (collaborator == null)
          return Result<Unit>.Failure($"Could not find user with name {request.CollaboratorDisplayName}");

        var userMovieList = await _context.AppUserMovieList
          .Include(x => x.MovieList)
          .ThenInclude(x => x.MovieMovieLists)
          .SingleOrDefaultAsync(x => x.AppUserId == user.Id && x.MovieListId == request.MovieListId);

        if (userMovieList == null)
          return Result<Unit>.Failure("Authorization failed: UserMovieList does not exist");

        if (userMovieList.MovieList == null)
          return Result<Unit>.Failure("Authorization failed: User does not have access to movie list");

        if (userMovieList.isOwner == false)
          return Result<Unit>.Failure("Authorization failed: User is not the owner of the list");

        var existingCollaboration = await _context.AppUserMovieList.SingleOrDefaultAsync(x => x.AppUserId == collaborator.Id && x.MovieListId == request.MovieListId);

        if (existingCollaboration != null)
          return Result<Unit>.Failure("User is already a collaborator for this list");

        if (collaborator.AppUserMovieLists == null)
        {
          collaborator.AppUserMovieLists = new List<AppUserMovieList>();
        }


        collaborator.AppUserMovieLists.Add(new AppUserMovieList
        {
          isOwner = false,
          AppUser = collaborator,
          AppUserId = collaborator.Id,
          MovieList = userMovieList.MovieList,
          MovieListId = userMovieList.MovieListId
        });

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to update the database");

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}