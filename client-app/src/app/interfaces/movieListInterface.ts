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
}

export interface MovieListCreateFormValues {
  name: string;
}

export interface MovieListAddValues {
  movieId: string;
  listId: string;
}
