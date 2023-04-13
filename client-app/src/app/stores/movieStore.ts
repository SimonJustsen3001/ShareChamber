import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Movie } from "../interfaces/movieInterface";

export default class MovieStore {
  movies: Movie[] = [];
  moviesWithoutPoster: Movie[] = [];
  loadingInitial = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadMovies = async (query: string) => {
    this.setLoadingInitial(true);
    try {
      const movies = await agent.Movies.list(query);
      console.log(movies);

      this.movies = [];
      this.moviesWithoutPoster = [];

      movies.forEach((movie) => {
        if (movie.imageUrl) this.movies = [...this.movies, movie];
        else this.moviesWithoutPoster = [...this.moviesWithoutPoster, movie];
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
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
