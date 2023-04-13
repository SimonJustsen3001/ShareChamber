using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.JsonDTOs
{
  public class MovieSearchDTO
  {
    public string Id { get; set; }
    public string S { get; set; }
  }

  public class MovieSearchResponse
  {
    public List<MovieSearchDTO> D { get; set; }
  }
}