using Domain;

namespace Application.JsonDTOs
{
  public class MovieWithoutMovieMovieListsDTO
  {
    public string Id { get; set; }
    public string Title { get; set; }
    public string TitleType { get; set; }
    public string Description { get; set; }
    public decimal Rating { get; set; }
    public int PersonalRating { get; set; }
    public int Voters { get; set; }
    public int Year { get; set; }
    public int RunTime { get; set; }
    public string FeaturedActors { get; set; }
    public string Director { get; set; }
    public string ImageUrl { get; set; }
    public ICollection<GenreListDTO> MovieGenres { get; set; }
  }

  public class MovieMovieListDTO
  {
    public string MovieId { get; set; }
    public MovieWithoutMovieMovieListsDTO Movie { get; set; }
    public Guid MovieListId { get; set; }
  }

  public class MovieListDTO
  {
    public string OwnerName { get; set; }
    public List<string> CollaboratorNames { get; set; }
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ICollection<MovieMovieListDTO> MovieMovieLists { get; set; }
  }

  public class GenreListDTO
  {
    public string Id { get; set; }
  }
}