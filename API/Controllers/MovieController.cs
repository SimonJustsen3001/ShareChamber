using Application.Handlers;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
  public class MovieController : ApiBaseController
  {
    [HttpGet("{query}")]
    public async Task<IActionResult> GetMovies(string query)
    {
      return HandleResult(await Mediator.Send(new GetMovies.Query { QueryString = query }));
    }

    [HttpPost("{query}")]
    public async Task<IActionResult> PostMovies(string query)
    {
      return HandleResult(await Mediator.Send(new CreateMovie.Command { Query = query }));
    }
  }
}
