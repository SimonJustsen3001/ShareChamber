import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { MovieList } from "../interfaces/movieListInterface";
import { store } from "./store";

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

      this.movieLists = [];

      movieLists.forEach((movieList) => {
        this.movieLists = [...this.movieLists, movieList];
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
  };

  createMovieList = async (creds: MovieList) => {
    await agent.MovieLists.createList(creds);
    store.modalStore.closeModal();
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setSelectedMovieList = (movieList: MovieList) => {
    this.selectedMovieList = movieList;
    console.log(movieList);
  };
}
