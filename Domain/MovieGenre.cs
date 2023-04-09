namespace Domain
{
  public class MovieGenre
  {
    public string MovieId { get; set; }
    public Movie Movie { get; set; }
    public string GenreId { get; set; }
    public Genre Genre { get; set; }
  }
}