namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen();

      services.AddCors(opt =>
      {
        opt.AddPolicy(name: "CorsPolicy", policy =>
        {
          policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
        });
      });

      services.AddAutoMapper(typeof(Program).Assembly);

      return services;
    }
  }
}