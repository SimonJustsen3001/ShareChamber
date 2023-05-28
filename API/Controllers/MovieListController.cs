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

    [HttpPatch("addMovie/{movieId}")]
    public async Task<IActionResult> AddMovieToList(string movieId, UpdateMovieListsDTO addMovieList)
    {
      return HandleResult(await Mediator.Send(new AddMovieToMovieLists.Command { MovieId = movieId, MovieLists = addMovieList }));
    }

    [HttpPatch("removeMovie/{movieId}")]
    public async Task<IActionResult> RemoveMovieFromList(string movieId, UpdateMovieListsDTO removeMovieList)
    {
      return HandleResult(await Mediator.Send(new RemoveMovieFromMovieLists.Command { MovieId = movieId, MovieLists = removeMovieList }));
    }
    [HttpPatch("{movieListId}/addCollaborator/{collaboratorName}")]
    public async Task<IActionResult> AddCollaborator(Guid movieListId, string collaboratorName)
    {
      return HandleResult(await Mediator.Send(new AddCollaborator.Command { MovieListId = movieListId, CollaboratorDisplayName = collaboratorName }));
    }

    [HttpDelete("{movieListId}")]
    public async Task<IActionResult> DeleteMovieList(Guid movieListId)
    {
      return HandleResult(await Mediator.Send(new DeleteMovieList.Command { MovieListId = movieListId }));
    }
  }
}
