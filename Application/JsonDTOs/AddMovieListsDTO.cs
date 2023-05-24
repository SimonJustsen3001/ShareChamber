namespace API.DTOs
{
  public class AddMovieListsDTO
  {
    public ICollection<Guid> MovieLists { get; set; }
  }
}