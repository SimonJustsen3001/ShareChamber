using API.DTOs;
using Application.Handlers;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
  public class MovieListController : ApiBaseController
  {
    [HttpPost("{name}")]
    public async Task<IActionResult> GetMovies(string name)
    {
      return HandleResult(await Mediator.Send(new CreateMovieList.Command { Name = name }));
    }

    [HttpPatch("{movieListId}")]
    public async Task<IActionResult> AddMovieToList(Guid movieListId, MovieToListDto movie)
    {
      return HandleResult(await Mediator.Send(new UpdateMovieList.Command { MovieListId = movieListId, MovieId = movie.MovieId }));
    }
  }
}
