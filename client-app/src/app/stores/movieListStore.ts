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
  loadingMovieId: string | null = null;
  loadingListId: string | null = null;
  loadingInitial = false;
  loadingToggle = false;

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
    await agent.MovieLists.addMovieToList(listId, creds);
  };

  addCollaborator = async (listId: string, displayName: string) => {
    await agent.MovieLists.addCollaborator(listId, displayName);
    store.modalStore.closeModal();
  };

  createMovieList = async (creds: MovieListCreateFormValues) => {
    await agent.MovieLists.createList(creds);
    store.modalStore.closeModal();
  };

  removeMovieFromList = async (listId: string, movieId: string) => {
    await agent.MovieLists.removeMovieFromList(listId, movieId);
  };

  deleteList = async (listId: string) => {
    await agent.MovieLists.deleteList(listId);
    this.selectedMovieList = null;
    store.modalStore.closeModal();
  };

  toggleMovieInList = async (listId: string, movieId: string) => {
    const isMovieInList = this.doesListHaveMovie(listId, movieId);
    this.setLoadingToggle(true, movieId, listId);

    if (isMovieInList) {
      await agent.MovieLists.removeMovieFromList(listId, movieId);
    } else {
      const creds: MovieId = { movieId };
      await agent.MovieLists.addMovieToList(listId, creds);
    }
    this.setLoadingToggle(false, null, null);

    this.loadMovieLists();
  };

  doesListHaveMovie = (movieListId: string, movieId: string): boolean => {
    const movieList = this.movieLists.find((x) => x.id == movieListId);

    if (!movieList || !movieList.movieMovieLists) return false;

    return movieList.movieMovieLists.some((movie) => movie.movie.id == movieId);
  };

  getCollaboratorNames = (collaboratorNames: string[]) => {
    var names = "";
    collaboratorNames.forEach((name) => {
      if (names == "") names = name;
      else names = `${names}, ${name}`;
    });
    return names;
  };

  setLoadingToggle = (
    state: boolean,
    movieId: string | null = null,
    listId: string | null = null
  ) => {
    this.loadingToggle = state;
    this.loadingMovieId = movieId;
    this.loadingListId = listId;
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setSelectedMovieList = (movieList: MovieList | null) => {
    this.selectedMovieList = movieList;
    console.log(movieList);
  };

  getCurrentMovieList = (listId: string): MovieList => {
    return this.movieLists.find((list) => list.id === listId)!;
  };
}
