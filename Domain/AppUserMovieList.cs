using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
  public class AppUserMovieList
  {
    public Boolean isOwner { get; set; }
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public Guid MovieListId { get; set; }
    public MovieList MovieList { get; set; }
  }
}