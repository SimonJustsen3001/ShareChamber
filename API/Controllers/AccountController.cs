using API.DTOs;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private static List<AppUser> users = new List<AppUser>
    {
      new AppUser {
        DisplayName = "simon",
        UserName = "simon",
        Email = "simon@hotmail.com"
      },
      new AppUser {
        DisplayName = "jesper",
        UserName = "jesper",
        Email = "jesper@hotmail.com"
      }
    };

    private readonly IMapper _mapper;
    private readonly ILogger<AccountController> _logger;

    public AccountController(IMapper mapper, ILogger<AccountController> logger)
    {
      _logger = logger;
      _mapper = mapper;
    }

    [HttpGet]
    public ActionResult<List<AppUser>> GetUsers()
    {
      _logger.LogInformation("Successfully returned users", DateTimeOffset.UtcNow);
      return Ok(users.Select(user => _mapper.Map<LoginDto>(user)));
    }
  }
}