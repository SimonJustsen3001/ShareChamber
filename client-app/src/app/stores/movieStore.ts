import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Movie } from "../interfaces/movieInterface";
import { Rating } from "../interfaces/ratingInterface";

export default class MovieStore {
  movies: Movie[] = [];
  moviesWithoutPoster: Movie[] = [];
  selectedMovie: Movie | null = null;
  loadingInitial = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadMovieDetails = async (movieId: string) => {
    this.setLoading(true);
    try {
      const movie = await agent.Movies.single(movieId);
      movie.isFlipped = false;
      this.selectedMovie = movie;
      this.setLoading(false);
    } catch {
      this.setLoading(false);
    }
  };

  loadMovies = async (query: string) => {
    this.setLoadingInitial(true);
    try {
      const movies = await agent.Movies.list(query);
      this.setMovies(movies);
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
  };

  setMovies = (movies: Movie[]) => {
    this.movies = [];
    this.moviesWithoutPoster = [];

    movies.forEach((movie) => {
      if (movie.imageUrl) this.movies = [...this.movies, movie];
      else this.moviesWithoutPoster = [...this.moviesWithoutPoster, movie];
    });
  };

  formatGenres = (movie: Movie) => {
    const genreNames = movie.movieGenres.map((genre) => genre.id);
    return genreNames.join(", ");
  };

  formatActors = (actors: string) => {
    const actorArray = actors.split(",");
    if (actorArray.length > 2) return actorArray.splice(0, 3).join(", ");
    else return actorArray.join(", ");
  };

  setMovieRating = async (rating: Rating) => {
    try {
      await agent.Movies.updateMovieRating(rating);
    } catch (error) {}
  };

  submitMovies = async (query: string): Promise<Boolean> => {
    this.setLoading(true);
    try {
      const response = await agent.Movies.createMovie(
        query.replace(" ", "%20")
      );
      this.setLoading(false);
      return response.status === 200;
    } catch (error) {
      this.setLoading(false);
      return false;
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setFlip = (index: number) => {
    this.movies[index].isFlipped = !this.movies[index].isFlipped;
  };
}
