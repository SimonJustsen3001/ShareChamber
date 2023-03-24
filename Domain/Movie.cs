namespace Domain
{
  public class Movie
  {
    public string Title { get; set; }
    public string TitleType { get; set; }
    public int Year { get; set; }
    public string Author { get; set; }
    public string Id { get; set; }
    public string ImageUrl { get; set; }

    public ICollection<MovieMovieList> MovieMovieLists { get; set; }
  }
}