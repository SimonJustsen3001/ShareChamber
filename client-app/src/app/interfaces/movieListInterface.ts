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
