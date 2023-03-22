using Application.Core;
using Domain;
using MediatR;
using Persistance;

namespace Application.Handlers
{
  public class CreateProduct
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Product Product { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;

      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}