using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistance
{
  public class Seed
  {
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
      if (!context.Users.Any())
      {
        context.Users.Add(
                  new AppUser
                  {
                    DisplayName = "Simon",
                    Email = "justsensimon@hotmail.com",
                  }
              );
      }

      if (!context.Movies.Any())
      {
        context.Movies.AddRange(
                new Movie
                {
                  Id = new Guid("0e72553d-b3b7-4563-8a90-eccf49d78633"),
                  Name = "Hoodie"
                },
                new Movie
                {
                  Id = new Guid("8df2cd65-aadc-4d73-9c32-1a6d7e0de9fe"),
                  Name = "T-shirt"
                }
              );
      }



      await context.SaveChangesAsync();
    }
  }
}