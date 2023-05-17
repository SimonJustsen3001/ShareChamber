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

  setMovieRating = async (rating: Rating) => {
    try {
      await agent.Movies.updateMovieRating(rating);
    } catch (error) {}
  };

  submitMovies = async (query: string): Promise<Boolean> => {
    this.setLoadingInitial(true);
    try {
      const response = await agent.Movies.createMovie(
        query.replace(" ", "%20")
      );
      this.setLoadingInitial(false);
      return response.status === 200;
    } catch (error) {
      this.setLoadingInitial(false);
      return false;
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };
}
