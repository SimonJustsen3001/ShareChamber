using Application.Core;
using Application.Interfaces;
using Application.JsonDTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistance;


namespace Application.Handlers
{
  public class CreateMovieRating
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string MovieId { get; set; }
      public int Rating { get; set; }
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
        var existingRating = await _context.MovieRatings.SingleOrDefaultAsync(x => x.AppUserId == user.Id && x.MovieId == request.MovieId);

        if (existingRating != null)
        {
          if (existingRating.Rating != request.Rating)
          {
            existingRating.Rating = request.Rating;
            await _context.SaveChangesAsync();
          }

          return Result<Unit>.Success(Unit.Value);
        }
        else
        {
          existingRating = new MovieRating
          {
            AppUser = user,
            Movie = _context.Movies.SingleOrDefault(x => x.Id == request.MovieId),
            Rating = request.Rating
          };
          await _context.MovieRatings.AddAsync(existingRating);
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to update rating");

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}