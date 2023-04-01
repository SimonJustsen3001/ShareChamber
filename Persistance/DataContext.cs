using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace Persistance
{
  public class DataContext : IdentityDbContext<AppUser>
  {
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Movie> Movies { get; set; }
    public DbSet<MovieList> MovieList { get; set; }
    public DbSet<MovieMovieList> MovieMovieList { get; set; }
    public DbSet<AppUserMovieList> AppUserMovieList { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<MovieGenre> MovieGenres { get; set; }

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
        .HasForeignKey(x => x.MovieListId);

      builder.Entity<MovieMovieList>()
        .HasKey(x => new { x.MovieId, x.MovieListId });

      builder.Entity<MovieMovieList>()
        .HasOne(x => x.Movie)
        .WithMany(x => x.MovieMovieLists)
        .HasForeignKey(x => x.MovieId);

      builder.Entity<MovieMovieList>()
        .HasOne(x => x.MovieList)
        .WithMany(x => x.MovieMovieLists)
        .HasForeignKey(x => x.MovieListId);

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


    }

  }
}