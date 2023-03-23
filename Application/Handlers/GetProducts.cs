using Application.Core;
using Domain;
using MediatR;
using Persistance;

namespace Application.Handlers
{
  public class GetProducts
  {

    public class Query : IRequest<Result<List<Movie>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<Movie>>>
    {
      private List<Movie> movies = new List<Movie> {
      new Movie {
        Id = new Guid("1c64360e-83a6-4e9a-96e7-301be9b3d4c1"),
        Name = "Test"
      },
      new Movie {
        Id = new Guid("673c0b16-b815-41ad-8f36-81ec67ac24c2"),
        Name = "Test2"
      }
    };
      private readonly DataContext _context;

      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Result<List<Movie>>> Handle(Query request, CancellationToken cancellationToken)
      {

        return Result<List<Movie>>.Success(movies);
      }
    }
  }
}