using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
  public class MovieController : ApiBaseController
  {
    [HttpGet]
    public async void Get()
    {
      var client = new HttpClient();
      var request = new HttpRequestMessage
      {
        Method = HttpMethod.Get,
        RequestUri = new Uri("https://imdb8.p.rapidapi.com/title/v2/find?title=Howl's%20moving%20castle&limit=1&sortArg=moviemeter%2Casc"),
        Headers =
  {
    { "X-RapidAPI-Key", "20fa404be5msh445f68288872167p1a35a9jsn7bc985aea709" },
    { "X-RapidAPI-Host", "imdb8.p.rapidapi.com" },
  },
      };
      using (var response = await client.SendAsync(request))
      {
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();

        dynamic dynamicObject = JsonConvert.DeserializeObject(body);


        Console.WriteLine(Convert.ToString(dynamicObject.results));
      }
    }
  }
}
