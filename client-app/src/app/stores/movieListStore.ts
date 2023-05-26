import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import {
  MovieList,
  MovieListIds,
  MovieListCreateFormValues,
} from "../interfaces/movieListInterface";
import { store } from "./store";

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
      this.movieLists = [];
      movieLists.forEach((movieList) => {
        this.movieLists = [...this.movieLists, movieList];
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
  };

  addMovieToList = async (addMovieListIds: MovieListIds, movieId: string) => {
    await agent.MovieLists.addMovieToLists(addMovieListIds, movieId);
  };

  removeMovieFromList = async (
    removeMovieListIds: MovieListIds,
    movieId: string
  ) => {
    await agent.MovieLists.removeMovieFromList(removeMovieListIds, movieId);
  };

  updateMovieList = async (
    addMovieListIds: MovieListIds,
    removeMovieListIds: MovieListIds,
    movieId: string
  ) => {
    if (addMovieListIds.movieLists.length > 0)
      await this.addMovieToList(addMovieListIds, movieId);
    if (removeMovieListIds.movieLists.length > 0)
      await this.removeMovieFromList(removeMovieListIds, movieId);
    await this.loadMovieLists();
    store.modalStore.closeModal();
  };

  addCollaborator = async (listId: string, displayName: string) => {
    await agent.MovieLists.addCollaborator(listId, displayName);
    store.modalStore.closeModal();
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
  };

  getCurrentMovieList = (listId: string): MovieList => {
    return this.movieLists.find((list) => list.id === listId)!;
  };
}
