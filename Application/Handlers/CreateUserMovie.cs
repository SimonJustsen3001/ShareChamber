using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistance;

namespace Application.Handlers
{
  public class CreateUserMovie
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
    }
  }
}