import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { MovieList } from "../interfaces/movieListInterface";

export default class MovieListStore {
  movieLists: MovieList[] = [];
  selectedMovieList: MovieList | null = null;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadMovieLists = async () => {
    this.setLoadingInitial(true);
    try {
      const movieLists = await agent.MovieLists.list();
      console.log(movieLists);
      movieLists.forEach((movieList) => {
        this.movieLists.push(movieList);
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
