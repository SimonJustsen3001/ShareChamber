namespace Domain
{
  public class MovieTranslation
  {
    public int Id { get; set; }
    public string Language { get; set; }
    public string Title { get; set; }
    public string MovieId { get; set; }
    public Movie Movie { get; set; }
  }
}