using Newtonsoft.Json;

namespace Application.JsonDTOs
{
  public class MovieSearchDTO
  {
    public string Id { get; set; }
    [JsonProperty("S")]
    public string Actors { get; set; }
  }

  public class MovieSearchResponse
  {
    [JsonProperty("D")]
    public List<MovieSearchDTO> movieSearchDTO { get; set; }
  }
}