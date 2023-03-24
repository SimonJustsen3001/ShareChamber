namespace Domain
{
  public class MovieList
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ICollection<AppUserMovieList> AppUserMovieLists { get; set; }
    public ICollection<MovieMovieList> MovieMovieLists { get; set; }
  }
}