using Newtonsoft.Json;

namespace Application.JsonDTOs
{

  public class RatingsSummary
  {
    [JsonProperty("aggregateRating")]
    public double? AggregateRating { get; set; }

    [JsonProperty("voteCount")]
    public int VoteCount { get; set; }
  }

  public class PrimaryImage
  {
    [JsonProperty("url")]
    public string Url { get; set; }
  }

  public class TitleType
  {
    [JsonProperty("text")]
    public string Text { get; set; }
  }

  public class GenreDTO
  {
    [JsonProperty("id")]
    public string Id { get; set; }
  }

  public class Genres
  {
    [JsonProperty("genres")]
    public List<GenreDTO> GenreList { get; set; }
  }

  public class Title
  {
    [JsonProperty("text")]
    public string Text { get; set; }
  }

  public class ReleaseDate
  {
    [JsonProperty("day")]
    public int? Day { get; set; }

    [JsonProperty("month")]
    public int? Month { get; set; }

    [JsonProperty("year")]
    public int? Year { get; set; }
  }

  public class Runtime
  {
    [JsonProperty("seconds")]
    public int Seconds { get; set; }
  }

  public class PlotText
  {
    [JsonProperty("plainText")]
    public string PlainText { get; set; }
  }

  public class Plot
  {
    [JsonProperty("plotText")]
    public PlotText PlotTextObj { get; set; }
  }

  public class MovieDTO
  {
    [JsonProperty("id")]
    public string Id { get; set; }

    [JsonProperty("ratingsSummary")]
    public RatingsSummary RatingsSummary { get; set; }

    [JsonProperty("primaryImage")]
    public PrimaryImage PrimaryImage { get; set; }

    [JsonProperty("titleType")]
    public TitleType TitleType { get; set; }

    [JsonProperty("genres")]
    public Genres Genres { get; set; }

    [JsonProperty("titleText")]
    public Title Title { get; set; }

    [JsonProperty("releaseDate")]
    public ReleaseDate ReleaseDate { get; set; }

    [JsonProperty("runtime")]
    public Runtime Runtime { get; set; }

    [JsonProperty("plot")]
    public Plot Plot { get; set; }
  }

  public class MovieResponse
  {
    [JsonProperty("results")]
    public List<MovieDTO> Movies { get; set; }
  }
}