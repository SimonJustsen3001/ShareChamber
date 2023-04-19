using Application.Core;
using Application.Interfaces;
using Application.JsonDTOs;
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
            .ThenInclude(x => x.MovieGenres)
            .ThenInclude(x => x.Genre)
          .Include(x => x.MovieList)
            .ThenInclude(x => x.AppUserMovieLists)
            .ThenInclude(x => x.AppUser)
          .Include(x => x.AppUser)
          .Where(x => x.AppUserId == user.Id)
          .ToListAsync();


        var movieLists = userMovieList.Select(uml => uml.MovieList).Select(ml => new MovieListDTO
        {
          Id = ml.Id,
          Name = ml.Name,
          OwnerName = _context.AppUserMovieList.SingleOrDefault(auml => auml.MovieListId == ml.Id && auml.isOwner).AppUser.DisplayName,
          CollaboratorNames = ml.AppUserMovieLists.Where(auml => auml.MovieListId == ml.Id && !auml.isOwner).Select(z => z.AppUser.DisplayName).Where(dn => dn != null).ToList(),
          MovieMovieLists = ml.MovieMovieLists.Select(mml => new MovieMovieListDTO
          {
            MovieId = mml.MovieId,
            MovieListId = mml.MovieListId,
            Movie = new MovieWithoutMovieMovieListsDTO
            {
              Id = mml.Movie.Id,
              Title = mml.Movie.Title,
              TitleType = mml.Movie.TitleType,
              Description = mml.Movie.Description,
              Rating = mml.Movie.Rating,
              PersonalRating = _context.MovieRatings.SingleOrDefault(mr => mr.AppUserId == user.Id && mml.MovieId == mr.MovieId)?.Rating ?? 0,
              Voters = mml.Movie.Voters,
              Year = mml.Movie.Year,
              RunTime = mml.Movie.RunTime,
              FeaturedActors = mml.Movie.FeaturedActors,
              Director = mml.Movie.Director,
              ImageUrl = mml.Movie.ImageUrl,
              MovieGenres = mml.Movie.MovieGenres.Select(x => new GenreListDTO
              {
                Id = x.Genre.Id
              }).ToList()
            },
          }).ToList()
        }).ToList();

        return Result<List<MovieListDTO>>.Success(movieLists);
      }
    }
  }
}