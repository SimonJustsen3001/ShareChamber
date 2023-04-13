namespace Domain
{
  public class Movie
  {
    public string Title { get; set; }
    public string TitleType { get; set; }
    public string Description { get; set; }
    public decimal Rating { get; set; }
    public int Voters { get; set; }
    public int Year { get; set; }
    public int RunTime { get; set; }
    public string FeaturedActors { get; set; }
    public string Director { get; set; }
    public string Id { get; set; }
    public string ImageUrl { get; set; }
    public ICollection<MovieGenre> MovieGenres { get; set; }
    public ICollection<MovieMovieList> MovieMovieLists { get; set; }
  }
}