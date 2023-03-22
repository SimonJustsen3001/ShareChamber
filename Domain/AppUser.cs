using Microsoft.AspNetCore.Identity;

namespace Domain
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }

    public ICollection<Product> Products { get; set; } = new List<Product>();

  }
}