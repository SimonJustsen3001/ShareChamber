using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace Application.JsonDTOs
{
  public class ResultDTO
  {
    public string Id { get; set; }
    [JsonConverter(typeof(DirectorListConverter))]
    public List<Director> Directors { get; set; }
  }

  public class Director
  {
    public List<Credit> Credits { get; set; }
  }

  public class Credit
  {
    public Name Name { get; set; }
  }

  public class Name
  {
    public NameText Nametext { get; set; }
  }

  public class NameText
  {
    public string Text { get; set; }
  }

  public class DirectorResponse
  {
    public List<ResultDTO> Results { get; set; }
  }

  public class DirectorListConverter : JsonConverter<List<Director>>
  {
    public override List<Director> ReadJson(JsonReader reader, Type objectType, List<Director> existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
      var token = JToken.Load(reader);
      if (token.Type == JTokenType.Null || token.Type == JTokenType.Undefined)
      {
        return null;
      }

      return token.ToObject<List<Director>>(serializer);
    }

    public override void WriteJson(JsonWriter writer, List<Director> value, JsonSerializer serializer)
    {
      serializer.Serialize(writer, value);
    }
  }

  // public class CreditNameConverter : JsonConverter<string>
  // {
  //   public override string ReadJson(JsonReader reader, Type objectType, string existingValue, bool hasExistingValue, JsonSerializer serializer)
  //   {
  //     var token = JToken.Load(reader);
  //     if (token.Type == JTokenType.Null || token.Type == JTokenType.Undefined)
  //     {
  //       return null;
  //     }

  //     var nameObject = token.ToObject<Dictionary<string, object>>(serializer);
  //     if (nameObject.TryGetValue("text", out object nameText))
  //     {
  //       return nameText.ToString();
  //     }

  //     return null;
  //   }

  //   public override void WriteJson(JsonWriter writer, string value, JsonSerializer serializer)
  //   {
  //     serializer.Serialize(writer, value);
  //   }
  // }
}