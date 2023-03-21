using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistance;

namespace Application.Handlers
{
  public class Login
  {
    public class Command : IRequest<Result<Unit>>
    {
      public AppUser AppUser { get; set; }
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
        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}