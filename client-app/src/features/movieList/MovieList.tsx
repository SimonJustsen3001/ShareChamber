import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import DeleteForm from "../form/DeleteForm";
import "./MovieList.Module.css";

export default observer(function MovieList() {
  const { modalStore, movieListStore } = useStore();

  return (
    <div className="list-selected">
      {movieListStore.selectedMovieList ? (
        <>
          <div className="list-selected-info">
            <div className="list-title-container">
              <div className="selected-name">
                {movieListStore.selectedMovieList.name}
              </div>
              <button
                className="delete-list-button"
                onClick={() => modalStore.openModal(<DeleteForm />)}
              >
                Delete List
              </button>
            </div>
            <div className="selected-author">
              owned by <span className="author">{}</span>{" "}
              <span className="other-collaborators">
                | no other collaborators
              </span>
            </div>
            <div className="selected-list-overview">
              {movieListStore.selectedMovieList.movieMovieLists.map((movie) => (
                <div className="selected-list-container">
                  <img
                    className="movie-list-image"
                    src={movie.movie.imageUrl}
                  />
                  <div className="movie-list-info">
                    <div className="movie-list-title">{movie.movie.title}</div>
                    <div className="movie-list-metadata">
                      {movie.movie.runTime / 60} min &#124;
                      {movie.movie.movieGenres.map((movieGenre) => (
                        <> {movieGenre.id}, </>
                      ))}
                    </div>
                    <div className="movie-description">
                      {movie.movie.description}
                    </div>
                    <div className="movie-list-director">
                      Directed by {movie.movie.director}
                    </div>
                    <div className="movie-list-actors">
                      Features {movie.movie.featuredActors}
                    </div>
                  </div>
                  <div className="movie-list-ratings">
                    <div className="imdb-rating">
                      <i className="fa fa-star " /> {movie.movie.rating}
                    </div>
                    <div className="personal-rating">
                      <i className="fa fa-star" />?
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});
