using API.DTOs;
using Application.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
  public class MovieController : ApiBaseController
  {
    [AllowAnonymous]
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

    [HttpPost("{movieId}/rating")]
    public async Task<IActionResult> PostRating(string movieId, [FromBody] RatingDTO ratingDTO)
    {
      return HandleResult(await Mediator.Send(new CreateMovieRating.Command { MovieId = movieId, Rating = ratingDTO.Rating }));
    }
  }
}
