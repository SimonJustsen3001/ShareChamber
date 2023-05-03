import { observer } from "mobx-react-lite";
import "./MovieGrid.Module.css";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";

const MovieGrid = observer(() => {
  const { movieStore, movieListStore } = useStore();

  return (
    <div className="movie-grid-container">
      {!movieStore.loadingInitial && !movieStore.loading ? (
        <div className="movie-grid">
          {movieStore.movies.map((movie) => (
            <Link
              className="movie-container"
              key={movie.id}
              to={`/details?id=${movie.id}`}
            >
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
            </Link>
          ))}
        </div>
      ) : (
        <div className="loading-container">
          <i className="fa fa-spinner fa-spin loading-icon" />
        </div>
      )}
    </div>
  );
});

export default MovieGrid;
