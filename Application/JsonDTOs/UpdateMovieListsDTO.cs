namespace API.DTOs
{
  public class UpdateMovieListsDTO
  {
    public ICollection<Guid> MovieLists { get; set; }
  }
}