using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ApiBaseController : ControllerBase
  {
    private IMediator _mediator;

    public IMediator Mediator => _mediator ??=
        HttpContext.RequestServices.GetService<IMediator>();

    protected ActionResult HandleResult<T>(Result<T> result)
    {
      if (result == null) return NotFound();
      if (result.IsSuccess && result.Value != null)
        return Ok(result.Value);
      if (result.IsSuccess && result.Value == null)
        return NotFound();
      return BadRequest(result.Error);
      //return BadRequest(new { errorMessage = result.Error });
    }
  }
}