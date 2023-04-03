import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import "./MoviePage.Module.css";

const debounce = (func: (...args: any[]) => any, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default observer(function MoviePage() {
  const { movieStore } = useStore();

  const [searchTerm, setSearchTerm] = useState("");

  // Debounced function to load movies
  const debouncedLoadMovies = debounce((term: string) => {
    movieStore.loadMovies(term);
  }, 1000);

  // Effect to load default movies on mount
  useEffect(() => {
    movieStore.loadMovies("Spirited%20Away");
  }, [movieStore]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedLoadMovies(e.target.value);
  };

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <div className="movie-grid-container">
        <div className="movie-grid">
          {movieStore.movies.map((movie) => (
            <div className="movie-container" key={movie.id}>
              <div className="movie-title">{movie.title}</div>
              <div className="image-container">
                <img
                  className="movie-image"
                  src={movie.imageUrl}
                  alt="Movie Poster"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
