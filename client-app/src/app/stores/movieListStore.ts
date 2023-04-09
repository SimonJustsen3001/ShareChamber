import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import {
  MovieList,
  MovieListCreateFormValues,
} from "../interfaces/movieListInterface";
import { store } from "./store";
import { MovieId } from "../interfaces/movieInterface";

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

  addMovieToList = async (listId: string, movieId: string) => {
    const creds: MovieId = { movieId };
    console.log(creds);
    await agent.MovieLists.addMovieToList(listId, creds);
  };

  createMovieList = async (creds: MovieListCreateFormValues) => {
    await agent.MovieLists.createList(creds);
    store.modalStore.closeModal();
  };

  deleteList = async (listId: string) => {
    await agent.MovieLists.deleteList(listId);
    this.selectedMovieList = null;
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
