namespace Domain
{
  public class Genre
  {
    public string Id { get; set; }

    public ICollection<MovieGenre> MovieGenres { get; set; }
  }
}