import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Movie } from "../interfaces/movieInterface";
import { Rating } from "../interfaces/ratingInterface";

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

  setMovieRating = async (rating: Rating) => {
    try {
      console.log(rating);
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
