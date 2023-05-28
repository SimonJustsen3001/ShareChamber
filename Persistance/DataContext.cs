using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Persistance
{
  public class DataContext : IdentityDbContext<AppUser>
  {
    private readonly IConfiguration _config;
    private readonly DbContextOptions _options;

    public DataContext(DbContextOptions options, IConfiguration config) : base(options)
    {
      _options = options;
      _config = config;
    }

    public DbSet<Movie> Movies { get; set; }
    public DbSet<MovieList> MovieList { get; set; }
    public DbSet<MovieMovieList> MovieMovieList { get; set; }
    public DbSet<AppUserMovieList> AppUserMovieList { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<MovieGenre> MovieGenres { get; set; }
    public DbSet<MovieRating> MovieRatings { get; set; }
    public DbSet<PopularMovie> PopularMovies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      // Configure your database provider and connection string
      optionsBuilder.UseNpgsql(_config.GetConnectionString("DefaultConnection"));

      // Enable sensitive data logging
      optionsBuilder.EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {



      base.OnModelCreating(builder);

      builder.Entity<AppUserMovieList>()
        .HasKey(x => new { x.AppUserId, x.MovieListId });

      builder.Entity<AppUserMovieList>()
        .HasOne(x => x.AppUser)
        .WithMany(x => x.AppUserMovieLists)
        .HasForeignKey(x => x.AppUserId);

      builder.Entity<AppUserMovieList>()
        .HasOne(x => x.MovieList)
        .WithMany(x => x.AppUserMovieLists)
        .HasForeignKey(x => x.MovieListId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<MovieMovieList>()
        .HasKey(x => new { x.MovieId, x.MovieListId });

      builder.Entity<MovieMovieList>()
        .HasOne(x => x.Movie)
        .WithMany(x => x.MovieMovieLists)
        .HasForeignKey(x => x.MovieId);

      builder.Entity<MovieMovieList>()
        .HasOne(x => x.MovieList)
        .WithMany(x => x.MovieMovieLists)
        .HasForeignKey(x => x.MovieListId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<MovieGenre>()
        .HasKey(x => new { x.MovieId, x.GenreId });

      builder.Entity<MovieGenre>()
        .HasOne(x => x.Movie)
        .WithMany(x => x.MovieGenres)
        .HasForeignKey(x => x.MovieId);

      builder.Entity<MovieGenre>()
        .HasOne(x => x.Genre)
        .WithMany(x => x.MovieGenres)
        .HasForeignKey(x => x.GenreId);

      builder.Entity<MovieRating>()
        .HasOne(mr => mr.AppUser)
        .WithMany(au => au.MovieRatings)
        .HasForeignKey(mr => mr.AppUserId);

      builder.Entity<MovieRating>()
        .HasOne(mr => mr.Movie)
        .WithMany(m => m.MovieRatings)
        .HasForeignKey(mr => mr.MovieId);

      builder.Entity<Movie>()
        .HasOne(m => m.Popular)
        .WithOne(pm => pm.Movie)
        .HasForeignKey<PopularMovie>(pm => pm.MovieId);

      builder.Entity<MovieTranslation>()
        .HasOne(mt => mt.Movie)
        .WithMany(m => m.Translations)
        .HasForeignKey(mt => mt.MovieId);
    }
  }
}