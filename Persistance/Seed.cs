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
            DisplayName = "test",
            Email = "test@hotmail.com",
            UserName = "test"
          },
          new AppUser
          {
            DisplayName = "test2",
            Email = "test2@hotmail.com",
            UserName = "test2"
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