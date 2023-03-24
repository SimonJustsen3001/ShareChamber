namespace Domain
{
  public class MovieMovieList
  {
    public string MovieId { get; set; }
    public Movie Movie { get; set; }
    public Guid MovieListId { get; set; }
    public MovieList MovieList { get; set; }
  }
}