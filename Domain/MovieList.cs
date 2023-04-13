using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
  public class MovieList
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ICollection<AppUserMovieList> AppUserMovieLists { get; set; }
    public ICollection<MovieMovieList> MovieMovieLists { get; set; }
  }
}