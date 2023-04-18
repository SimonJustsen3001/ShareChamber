namespace Domain
{
  public class MovieRating
  {
    public int Id { get; set; }
    public string AppUserId { get; set; }
    public string MovieId { get; set; }
    public int Rating { get; set; }
    public AppUser AppUser { get; set; }
    public Movie Movie { get; set; }
  }
}