import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "@fortawesome/fontawesome-free/css/all.css";
import "./MoviePage.Module.css";
import Unauthenticated from "../unauthenticated/Unauthenticated";

export default observer(function MoviePage() {
  const { movieStore, movieListStore, userStore } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedLoadMovies = useDebounced(
    (term: string) => movieStore.loadMovies(term),
    1000
  );

  useEffect(() => {
    movieStore.loadMovies("spirited");
    movieListStore.loadMovieLists();
  }, [movieStore, movieListStore]);

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

  const submitSearch = async (query: string) => {
    await movieStore.submitMovies(query);
    movieStore.loadMovies(query);
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

  return userStore.isLoggedIn || userStore.searchAnonymous ? (
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
                  <svg
                    className="movie-add-to-list-svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      className="movie-add-to-list-polygon"
                      points="0,0 0,101 101,101 101,0 50,20"
                    ></polygon>
                    <foreignObject x="30" y="40" width="40" height="40">
                      <i className="fa fa-plus movie-add-to-list-icon" />
                    </foreignObject>
                  </svg>
                  <div className="dropdown-menu-lists">
                    {movieListStore.movieLists.map((list) => (
                      <div
                        className="list-item"
                        onClick={() =>
                          movieListStore.toggleMovieInList(list.id, movie.id)
                        }
                      >
                        {!movieListStore.loadingToggle ||
                        movieListStore.loadingMovieId !== movie.id ||
                        movieListStore.loadingListId !== list.id ? (
                          <>
                            {movieListStore.doesListHaveMovie(
                              list.id,
                              movie.id
                            ) ? (
                              <i className="fa fa-check" />
                            ) : (
                              <i className="fa fa-x" />
                            )}
                          </>
                        ) : (
                          <i className="fa fa-spinner fa-spin" />
                        )}

                        {list.name}
                      </div>
                    ))}
                  </div>
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
  ) : (
    <Unauthenticated
      message="Please login to enjoy a better search experience"
      loginRequired={false}
    />
  );
});
