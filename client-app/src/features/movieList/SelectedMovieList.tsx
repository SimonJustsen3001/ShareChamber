import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import AddCollaboratorForm from "../form/AddCollaboratorForm";
import "./SelectedMovieList.Module.css";
import DeleteForm from "../form/DeleteForm";
import RateForm from "../form/RateForm";

const SelectedMovieList = observer(() => {
  const { modalStore, movieListStore, userStore } = useStore();

  const handleRemove = async (listId: string, movieId: string) => {
    await movieListStore.removeMovieFromList(listId, movieId);
    await movieListStore.loadMovieLists();
    movieListStore.setSelectedMovieList(
      movieListStore.getCurrentMovieList(listId)
    );
  };

  return (
    <div className="list-selected">
      {movieListStore.selectedMovieList ? (
        <>
          <div className="list-selected-info">
            <div className="list-title-container">
              <div className="selected-name">
                {movieListStore.selectedMovieList.name}
              </div>
              <div className="selected-button-container">
                {userStore.isSmallScreen ? (
                  <>
                    <button
                      className="add-collab-button"
                      onClick={() =>
                        modalStore.openModal(<AddCollaboratorForm />)
                      }
                    >
                      <i className="fa-solid fa-user-plus"></i>
                    </button>
                    <button
                      className="delete-list-button"
                      onClick={() => modalStore.openModal(<DeleteForm />)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="add-collab-button"
                      onClick={() =>
                        modalStore.openModal(<AddCollaboratorForm />)
                      }
                    >
                      Add Collaborator
                    </button>
                    <button
                      className="delete-list-button"
                      onClick={() => modalStore.openModal(<DeleteForm />)}
                    >
                      Delete List
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="selected-author">
              owned by{" "}
              <span className="author">
                {movieListStore.selectedMovieList.ownerName}
              </span>{" "}
              {movieListStore.selectedMovieList.collaboratorNames.length > 0 ? (
                <span className="other-collaborators">
                  |{" "}
                  {movieListStore.getCollaboratorNames(
                    movieListStore.selectedMovieList.collaboratorNames
                  )}
                </span>
              ) : (
                <span className="other-collaborators">
                  | no other collaborators
                </span>
              )}
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
                      Directed by{" "}
                      {movie.movie.director ? movie.movie.director : "unknown"}
                    </div>
                    <div className="movie-list-actors">
                      Features {movie.movie.featuredActors}
                    </div>
                  </div>
                  <div className="movie-list-ratings">
                    <div className="imdb-rating">
                      <i className="fa fa-star " /> {movie.movie.rating}
                    </div>
                    <div
                      className="personal-rating"
                      onClick={() =>
                        modalStore.openModal(
                          <RateForm
                            listId={movie.movieListId}
                            movieId={movie.movie.id}
                            movieTitle={movie.movie.title}
                          />
                        )
                      }
                    >
                      <i className="fa fa-star" />
                      {movie.movie.personalRating != 0
                        ? movie.movie.personalRating
                        : "Rate"}
                    </div>
                  </div>
                  <button
                    className="remove-movie-button"
                    onClick={() =>
                      handleRemove(movie.movieListId, movie.movie.id)
                    }
                  >
                    Remove
                  </button>
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

export default SelectedMovieList;
