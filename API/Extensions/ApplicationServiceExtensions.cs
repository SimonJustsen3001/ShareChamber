using Application.Handlers;
using Application.Interfaces;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen();
      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseNpgsql(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"));
      });

      services.AddCors(opt =>
      {
        opt.AddPolicy(name: "CorsPolicy", policy =>
        {
          policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("https://sharechamber.com", "http://localhost:3000");
        });
      });

      services.AddMediatR(typeof(CreateMovie.Handler));
      services.AddAutoMapper(typeof(Program).Assembly);
      services.AddHttpContextAccessor();
      services.AddScoped<IUserAccessor, UserAccessor>();


      return services;
    }
  }
}