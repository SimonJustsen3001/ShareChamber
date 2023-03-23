using API.DTOs;
using AutoMapper;
using Domain;

namespace API.test
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<AppUser, LoginDto>();
    }
  }
}