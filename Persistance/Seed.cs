using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistance
{
  public class Seed
  {
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
      if (!userManager.Users.Any())
      {
        var users = new List<AppUser>{
          new AppUser
          {
            DisplayName = "Bob",
            Email = "Bob@hotmail.com",
            UserName = "Bob"
          },
          new AppUser
          {
            DisplayName = "Tom",
            Email = "Tom@hotmail.com",
            UserName = "Tom"
          }
        };

        foreach (var user in users)
        {
          await userManager.CreateAsync(user, "Pa$$w0rd");
        }
      }

      await context.SaveChangesAsync();
    }
  }
}