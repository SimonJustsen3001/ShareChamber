import { Movie } from "./movieInterface";

export interface MovieList {
  id: string;
  name: string;
  movies: Movie[];
}
