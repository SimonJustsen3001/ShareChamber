using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
  public class Genre
  {
    public string Id { get; set; }

    public ICollection<MovieGenre> MovieGenres { get; set; }
  }
}