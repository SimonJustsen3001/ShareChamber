import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import AddCollaboratorForm from "../form/AddCollaboratorForm";
import "./SelectedMovieList.Module.css";
import DeleteForm from "../form/DeleteForm";

const SelectedMovieList = observer(() => {
  const { modalStore, movieListStore } = useStore();

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
                <button
                  className="add-collab-button"
                  onClick={() => modalStore.openModal(<AddCollaboratorForm />)}
                >
                  Add Collaborator
                </button>
                <button
                  className="delete-list-button"
                  onClick={() => modalStore.openModal(<DeleteForm />)}
                >
                  Delete List
                </button>
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
                    <div className="movie-title-genre-container">
                      <div className="movie-list-title">
                        {movie.movie.title}
                      </div>
                      <div className="movie-list-metadata">
                        {movie.movie.runTime / 60} min &#124;
                        {movie.movie.movieGenres.map((movieGenre) => (
                          <> {movieGenre.id}, </>
                        ))}
                      </div>
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
                    <div className="personal-rating">
                      <i className="fa fa-star" />?
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
