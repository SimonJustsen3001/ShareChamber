using System.Text.RegularExpressions;
using Application.JsonDTOs;
using Domain;
using Newtonsoft.Json;

namespace API.Services
{
  public class APIHelper
  {
    public HttpClient Client { get; set; }
    public Dictionary<string, string> TitleFeaturedActors { get; set; }
    public Dictionary<string, string> TitleDirector { get; set; }
    public APIHelper(Dictionary<string, string> titleFeaturedActors, Dictionary<string, string> titleDirector)
    {
      Client = new HttpClient();
      TitleFeaturedActors = titleFeaturedActors;
      TitleDirector = titleDirector;
    }
    public string GetIdsFromAPI(string query)
    {
      var requestUri = $"https://imdb8.p.rapidapi.com/auto-complete?q={query}";
      var movieIds = "";
      var movieIdRequest = new HttpRequestMessage
      {
        Method = HttpMethod.Get,
        RequestUri = new Uri(requestUri),
        Headers =
          {
            { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
            { "X-RapidAPI-Host", "imdb8.p.rapidapi.com" },
          },
      };
      using (var response = Client.Send(movieIdRequest))
      {
        response.EnsureSuccessStatusCode();
        var body = response.Content.ReadAsStringAsync().Result;
        var movieObject = JsonConvert.DeserializeObject<MovieSearchResponse>(body);

        if (movieObject.movieSearchDTO.Count == 0)
          return movieIds;

        foreach (var movie in movieObject.movieSearchDTO)
        {
          TitleFeaturedActors[movie.Id] = movie.Actors;
          if (movieIds == "")
          {
            movieIds = movie.Id;
            continue;
          }
          movieIds = $"{movieIds}%2C{movie.Id}";
        }
      }
      return movieIds;
    }

    public List<string> GetPopularIdsFromAPI()
    {
      List<string> movieIds = new List<string>();
      var request = new HttpRequestMessage
      {
        Method = HttpMethod.Get,
        RequestUri = new Uri("https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US"),
        Headers =
        {
          { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
          { "X-RapidAPI-Host", "imdb8.p.rapidapi.com" },
        },
      };
      using (var response = Client.Send(request))
      {
        response.EnsureSuccessStatusCode();
        var body = response.Content.ReadAsStringAsync().Result;
        var regex = "t{2}\\d*";
        MatchCollection matches = Regex.Matches(body, regex);
        // movieIds = string.Concat(matches.Cast<Match>().Select(match => match.Value));
        movieIds = matches.Cast<Match>()
          .Select(match => match.Value)
          .ToList();
      }
      return movieIds;
    }

    public void PopulateActorField(string movieIds)
    {
      var actorName = "";
      var actorRequest = new HttpRequestMessage
      {
        Method = HttpMethod.Get,
        RequestUri = new Uri($"https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList={movieIds}&info=extendedCast"),
        Headers =
  {
    { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
    { "X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com" },
  },
      };
      using (var response = Client.Send(actorRequest))
      {
        response.EnsureSuccessStatusCode();
        var body = response.Content.ReadAsStringAsync().Result;
        var actorObject = JsonConvert.DeserializeObject<ActorResponse>(body);
        foreach (var movie in actorObject.Movies)
        {
          var actors = "";
          if (movie.Cast.Edges != null && movie.Cast.Edges.Count > 0)
          {
            foreach (var actor in movie.Cast.Edges)
            {
              actorName = actor.Node.Actor.Name.text;
              if (actors == "")
              {
                actors = actorName;
                continue;
              }
              actors = $"{actors}, {actorName}";
            }
          }
          TitleFeaturedActors[movie.id] = actors;
        }
      }
    }

    public void PopulateDirectorField(string movieIds)
    {
      var directorRequest = new HttpRequestMessage
      {
        Method = HttpMethod.Get,
        RequestUri = new Uri($"https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList={movieIds}&info=creators_directors_writers"),
        Headers =
          {
            { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
            { "X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com" },
          },
      };
      using (var response = Client.Send(directorRequest))
      {
        response.EnsureSuccessStatusCode();
        var body = response.Content.ReadAsStringAsync().Result;
        var movieObject = JsonConvert.DeserializeObject<DirectorResponse>(body);
        foreach (var movieResult in movieObject.Results)
        {
          if (movieResult.Directors != null && movieResult.Directors.Count > 0)
          {
            var firstDirector = movieResult.Directors[0];
            if (firstDirector.Credits != null && firstDirector.Credits.Count > 0)
            {
              string directorName = firstDirector.Credits[0].Name.Nametext.Text;
              TitleDirector[movieResult.Id] = directorName;
            }
          }
        }
      }
    }

    public MovieResponse GetMoviesFromAPI(string movieIds)
    {
      var getMoviesUri = new Uri($"https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList={movieIds}&info=base_info");

      var movieRequest = new HttpRequestMessage
      {
        Method = HttpMethod.Get,
        RequestUri = getMoviesUri,
        Headers =
          {
            { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
            { "X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com" },
          },
      };
      using (var response = Client.Send(movieRequest))
      {
        response.EnsureSuccessStatusCode();
        var body = response.Content.ReadAsStringAsync().Result;
        var movieObject = JsonConvert.DeserializeObject<MovieResponse>(body);
        return movieObject;
      }
    }
  }
}