using Microsoft.AspNetCore.Identity;

namespace Domain
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }
    public ICollection<AppUserMovieList> AppUserMovieLists { get; set; }

  }
}