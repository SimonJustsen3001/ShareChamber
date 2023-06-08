using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly ILogger<AccountController> _logger;
    private readonly TokenService _tokenService;
    private readonly UserManager<AppUser> _userManager;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService, ILogger<AccountController> logger)
    {
      _userManager = userManager;
      _tokenService = tokenService;
      _logger = logger;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

      return CreateUserObject(user);
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {

      var user = await _userManager.FindByEmailAsync(loginDto.Email);
      if (user == null)
        return Unauthorized(new { error = "Invalid email or password" });

      var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

      if (result)
      {
        return CreateUserObject(user);
      }

      return Unauthorized(new { error = "Invalid email or password" });
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      var validationProblem = false;

      if (CheckIfExists(registerDto, "username", "Username is taken", (x) => x.UserName == registerDto.UserName))
        validationProblem = true;
      if (CheckIfExists(registerDto, "email", "Email is taken", (x) => x.Email == registerDto.Email))
        validationProblem = true;

      if (validationProblem) return ValidationProblem(ModelState);

      var user = CreateAppUser(registerDto);

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (result.Succeeded)
      {
        return CreateUserObject(user);
      }

      return BadRequest("Registration failed");
    }

    private UserDto CreateUserObject(AppUser user)
    {
      return new UserDto
      {
        DisplayName = user.DisplayName,
        Token = _tokenService.CreateToken(user),
        UserName = user.UserName
      };
    }

    private AppUser CreateAppUser(RegisterDto registerDto)
    {
      return new AppUser
      {
        DisplayName = registerDto.DisplayName,
        Email = registerDto.Email,
        UserName = registerDto.UserName
      };
    }

    private bool CheckIfExists(RegisterDto registerDto, string error, string errorMessage, Func<AppUser, Boolean> query)
    {
      if (_userManager.Users.Any(query))
      {
        ModelState.AddModelError(error, errorMessage);
        return true;
      }
      return false;
    }

  }
}