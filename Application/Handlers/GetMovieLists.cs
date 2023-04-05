using Application.Core;
using Application.Interfaces;
using Application.JsonDTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Handlers
{
  public class GetMovieLists
  {
    public class Query : IRequest<Result<List<MovieListDTO>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<MovieListDTO>>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }
      public async Task<Result<List<MovieListDTO>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

        var userMovieList = await _context.AppUserMovieList
          .Include(x => x.MovieList)
          .ThenInclude(x => x.MovieMovieLists)
          .ThenInclude(x => x.Movie)
          .Where(x => x.AppUserId == user.Id)
          .ToListAsync();

        var movieLists = userMovieList.Select(x => x.MovieList).Select(x => new MovieListDTO
        {
          Id = x.Id,
          Name = x.Name,
          MovieMovieLists = x.MovieMovieLists.Select(x => new MovieMovieListDTO
          {
            MovieId = x.MovieId,
            Movie = new MovieWithoutMovieMovieListsDTO
            {
              Id = x.Movie.Id,
              Title = x.Movie.Title,
              TitleType = x.Movie.TitleType,
              Description = x.Movie.Description,
              Rating = x.Movie.Rating,
              Voters = x.Movie.Voters,
              Year = x.Movie.Year,
              RunTime = x.Movie.RunTime,
              FeaturedActors = x.Movie.FeaturedActors,
              Director = x.Movie.Director,
              ImageUrl = x.Movie.ImageUrl,
              MovieGenres = x.Movie.MovieGenres
            },
            MovieListId = x.MovieListId
          }).ToList()
        }).ToList();

        return Result<List<MovieListDTO>>.Success(movieLists);
      }
    }
  }
}