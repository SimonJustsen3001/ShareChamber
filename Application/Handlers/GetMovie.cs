using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class GetMovie
  {
    public class Query : IRequest<Result<List<Movie>>>
    {
      public string QueryString { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Movie>>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }
      public async Task<Result<List<Movie>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var query = request.QueryString.Replace("%", " ").Replace("'", "").ToLower();
        var movies = await _context.Movies.Where(x => x.Title.ToLower().Replace("'", "").Contains(query)).ToListAsync();

        return Result<List<Movie>>.Success(movies);
      }
    }
  }
}