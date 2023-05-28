using Newtonsoft.Json;

namespace Application.JsonDTOs
{
  public class ActorResponse
  {
    [JsonProperty("Results")]
    public List<MovieActorDTO> Movies { get; set; }
  }

  public class MovieActorDTO
  {
    public string _id { get; set; }
    public string id { get; set; }
    public Cast Cast { get; set; }
  }

  public class Cast
  {
    public List<CreditEdge> Edges { get; set; }
  }

  public class CreditEdge
  {
    public CreditNode Node { get; set; }
  }

  public class CreditNode
  {
    [JsonProperty("Name")]
    public Actor Actor { get; set; }
  }

  public class Actor
  {
    public string id { get; set; }
    [JsonProperty("NameText")]
    public ActorName Name { get; set; }
  }

  public class ActorName
  {
    public string text { get; set; }
  }
}