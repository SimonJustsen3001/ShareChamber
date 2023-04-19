export interface Movie {
  title: string;
  titleType: string;
  description: string;
  rating: number;
  personalRating: number;
  voters: number;
  year: number;
  runTime: number;
  featuredActors: string;
  director: string;
  id: string;
  imageUrl: string;
  movieGenres: Genre[];
}

export interface MovieId {
  movieId: string;
}

interface Genre {
  id: string;
}
