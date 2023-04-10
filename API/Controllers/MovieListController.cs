using API.DTOs;
using Application.Handlers;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
  public class MovieListController : ApiBaseController
  {

    [HttpGet()]
    public async Task<IActionResult> GetUsersMovieList()
    {
      return HandleResult(await Mediator.Send(new GetMovieLists.Query { }));
    }

    [HttpPost("{name}")]
    public async Task<IActionResult> GetMoviesOnList(string name)
    {
      return HandleResult(await Mediator.Send(new CreateMovieList.Command { Name = name }));
    }

    [HttpPatch("{movieListId}")]
    public async Task<IActionResult> AddMovieToList(Guid movieListId, MovieToListDto movie)
    {
      return HandleResult(await Mediator.Send(new AddMovieToMovieList.Command { MovieListId = movieListId, MovieId = movie.MovieId }));
    }

    [HttpPatch("{movieListId}/removeMovie/{movieId}")]
    public async Task<IActionResult> RemoveMovieFromList(Guid movieListId, string movieId)
    {
      return HandleResult(await Mediator.Send(new RemoveMovieFromMovieList.Command { MovieListId = movieListId, MovieId = movieId }));
    }

    [HttpDelete("{movieListId}")]
    public async Task<IActionResult> DeleteMovieList(Guid movieListId)
    {
      return HandleResult(await Mediator.Send(new DeleteMovieList.Command { MovieListId = movieListId }));
    }
  }
}
