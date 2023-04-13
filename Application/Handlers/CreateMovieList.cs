using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class CreateMovieList
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string Name { get; set; }
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
        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
        if (await _context.AppUserMovieList.AsNoTracking().Where(x => x.AppUserId == user.Id).AnyAsync(x => x.MovieList.Name == request.Name))
        {
          return Result<Unit>.Failure("Failed to create List, name already exists");
        }

        _context.AppUserMovieList.Add(new AppUserMovieList
        {
          AppUser = user,
          MovieList = new MovieList
          {
            Name = request.Name
          },
          isOwner = true
        });


        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to find movie");

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}