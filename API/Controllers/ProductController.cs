using Application.Handlers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProductController : ApiBaseController
  {
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      return HandleResult(await Mediator.Send(new GetProducts.Query()));
    }

    [HttpPost]
    public async Task<IActionResult> Create()
    {
      return HandleResult(await Mediator.Send(new GetProducts.Query()));
    }
  }
}