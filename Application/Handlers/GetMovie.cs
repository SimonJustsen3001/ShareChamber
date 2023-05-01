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
        public class Query : IRequest<Result<Movie>>
        {
            public string MovieId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Movie>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Movie>> Handle(Query request, CancellationToken cancellationToken)
            {
                var movie = await _context.Movies.SingleOrDefaultAsync(x => x.Id == request.MovieId);
                return Result<Movie>.Success(movie);
            }
        }
    }
}