using Application.Handlers;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
  public class ListController : ApiBaseController
  {
    [HttpPost("{name}")]
    public async Task<IActionResult> GetMovies(string name)
    {
      return HandleResult(await Mediator.Send(new CreateMovieList.Command { Name = name }));
    }
  }
}
