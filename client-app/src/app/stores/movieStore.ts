import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Movie } from "../interfaces/movieInterface";

export default class MovieStore {
  movies: Movie[] = [];
  moviesWithoutPoster: Movie[] = [];
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadMovies = async (query: string) => {
    this.setLoadingInitial(true);
    try {
      const movies = await agent.Movies.list(query);
      console.log(movies);
      movies.forEach((movie) => {
        if (movie.imageUrl) this.movies.push(movie);
        else this.moviesWithoutPoster.push(movie);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}