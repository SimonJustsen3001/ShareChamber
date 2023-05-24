import { Movie } from "./movieInterface";

interface MovieMovieList {
  movieid: string;
  movie: Movie;
  movieListId: string;
}

export interface MovieList {
  id: string;
  name: string;
  movieMovieLists: MovieMovieList[];
  ownerName: string;
  collaboratorNames: string[];
}

export interface MovieListIds {
  movieLists: string[];
}

export interface MovieListCreateFormValues {
  name: string;
}

export interface MovieListAddValues {
  movieId: string;
  listId: string;
}
