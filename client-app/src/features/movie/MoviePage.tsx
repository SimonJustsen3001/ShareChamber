import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "@fortawesome/fontawesome-free/css/all.css";
import "./MoviePage.Module.css";
import MovieStore from "../../app/stores/movieStore";

const debounce = (func: (...args: any[]) => any, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default observer(function MoviePage() {
  const { movieStore } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedLoadMovies = useDebounced(
    (term: string) => movieStore.loadMovies(term),
    1000
  );

  useEffect(() => {
    movieStore.loadMovies("spirited");
  }, [movieStore]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    movieStore.setLoading(true);
    setSearchTerm(e.target.value);
    debouncedLoadMovies(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitSearch(searchTerm);
    }
  };

  const submitSearch = (query: string) => {
    movieStore.submitMovies(query);
    setTimeout(() => {
      movieStore.loadMovies(query);
    }, 2000);
  };

  function useDebounced(callback: (...args: any[]) => any, delay: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        movieStore.setLoading(false);
      }, delay);
    };
  }

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          className="search-bar"
        />
        <div className="search-bar-tooltip">
          Can't find what your looking for?
          <br />
          Try pressing enter
        </div>
      </div>

      <div className="movie-grid-container">
        {!movieStore.loadingInitial && !movieStore.loading ? (
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
        ) : (
          <div className="loading-container">
            <i className="fa fa-spinner fa-spin loading-icon" />
          </div>
        )}
      </div>
    </>
  );
});
