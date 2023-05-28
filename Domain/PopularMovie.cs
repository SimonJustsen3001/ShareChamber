namespace Domain
{
  public class PopularMovie
  {
    public Guid Id { get; set; }
    public string MovieId { get; set; }
    public Movie Movie { get; set; }
  }
}