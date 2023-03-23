using Microsoft.AspNetCore.Identity;

namespace Domain
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }

    public ICollection<Movie> Movies { get; set; } = new List<Movie>();

  }
}