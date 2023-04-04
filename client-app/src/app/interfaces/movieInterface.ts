import { Genre } from "./genreInterface";

export interface Movie {
  title: string;
  titleType: string;
  description: string;
  rating: number;
  voters: number;
  year: number;
  runTime: number;
  author: string;
  id: string;
  imageUrl: string;
  movieGenres: Genre[];
}
