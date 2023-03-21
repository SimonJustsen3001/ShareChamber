using API.DTOs;
using API.Services;
using Application.Handlers;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AccountController : ApiBaseController
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
    private readonly TokenService _tokenService;
    private readonly UserManager<AppUser> _userManager;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService, IMapper mapper, ILogger<AccountController> logger)
    {
      _userManager = userManager;
      _tokenService = tokenService;
      _logger = logger;
      _mapper = mapper;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(AppUser user)
    {
      _logger.LogInformation("Test", DateTime.UtcNow);
      return HandleResult(await Mediator.Send(new Login.Command { AppUser = user }));

      //_logger.LogInformation("Successfully returned users", DateTimeOffset.UtcNow);
      //return Ok(users.Select(user => _mapper.Map<LoginDto>(user)));
    }
  }
}