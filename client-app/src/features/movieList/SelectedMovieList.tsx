import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import AddCollaboratorForm from "../form/AddCollaboratorForm";
import "./SelectedMovieList.Module.css";
import DeleteForm from "../form/DeleteForm";
import RateForm from "../form/RateForm";
import { useEffect } from "react";
import Cookies from "js-cookie";

const SelectedMovieList = observer(() => {
  const { modalStore, movieStore, movieListStore, userStore } = useStore();

  const handleRemove = async (listId: string, movieId: string) => {
    // await movieListStore.removeMovieFromList(listId, movieId);
    await movieListStore.loadMovieLists();
    movieListStore.setSelectedMovieList(
      movieListStore.getCurrentMovieList(listId)
    );
  };

  useEffect(() => {
    const selectedListId: string = Cookies.get("selectedList")!;
    const selectedList = movieListStore.getCurrentMovieList(selectedListId);
    movieListStore.loadSelectedMovieList(selectedList);
  }, [movieListStore.movieLists.length]);

  return (
    <div className="selectedmovielist-wrapper">
      {movieListStore.selectedMovieList ? (
        <div>
          <div className="selectedmovielist-header-wrapper">
            <h2 className="selectedmovielist-header-text">
              {movieListStore.selectedMovieList.name}
            </h2>
            <div className="selectedmovielist-buttons-wrapper">
              <button
                className="selectedmovielist-button-add-collab"
                onClick={() => modalStore.openModal(<AddCollaboratorForm />)}
              >
                <span className="selectedmovielist-button-text">Add</span>
                <img src="addUser.svg" />
              </button>
              <button
                className="selectedmovielist-button-remove-list"
                onClick={() => modalStore.openModal(<DeleteForm />)}
              >
                <span className="selectedmovielist-button-text">Delete</span>
                <img src="deleteList.svg" />
              </button>
            </div>
          </div>
          <p className="selectedmovielist-collaborators">
            <span className="selectedmovielist-owner">
              {movieListStore.selectedMovieList.ownerName} &#124;
            </span>
            {movieListStore.selectedMovieList.collaboratorNames}
          </p>
          <div className="selectedmovielist-movielist-wrapper">
            {movieListStore.selectedMovieList.movieMovieLists.map((movie) => (
              <div className="selectedmovielist-movie-wrapper">
                <div className="selectedmovielist-image-wrapper">
                  <img
                    className="selectedmovielist-image"
                    src={movie.movie.imageUrl}
                  />
                  <div className="selectedmovielist-all-rating-wrapper">
                    <div className="selectedmovielist-rating-wrapper">
                      <img className="rating-star" src="star.svg" />
                      <p className="selectedmovielist-rating">
                        {movie.movie.rating}
                      </p>
                    </div>
                    <div
                      className="selectedmovielist-personal-rating-wrapper"
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
                      <img className="rating-star" src="starBlue.svg" />
                      <p className="selectedmovielist-personal-rating">
                        {movie.movie.personalRating
                          ? movie.movie.personalRating
                          : "Rate"}
                      </p>
                    </div>
                  </div>
                  <p className="selectedmovielist-movie-year">
                    {movie.movie.year}
                  </p>
                </div>
                <div className="selectedmovielist-movie-info-wrapper">
                  <div className="selectedmovielist-movie-title-wrapper">
                    <div className="selectedmovielist-title-genre">
                      <h4 className="selectedmovielist-movie-title">
                        {movie.movie.title}
                      </h4>
                      <p className="selectedmovielist-genres">
                        {movieStore.formatGenres(movie.movie)}
                      </p>
                    </div>
                    <button className="selectedmovielist-button-remove-movie">
                      <span className="selectedmovielist-button-text">
                        Delete
                      </span>
                      <img
                        className="remove-movie-icon"
                        src="removeMovie.svg"
                      />
                    </button>
                  </div>
                  <p className="selectedmovielist-movie-description">
                    {movie.movie.description}
                  </p>
                  <div className="selectedmovielist-movie-crew-wrapper">
                    <p className="selectedmovielist-movie-featured-actors">
                      Starring:{" "}
                      {movieStore.formatActors(movie.movie.featuredActors)}
                    </p>
                    <p className="selectedmovielist-movie-director">
                      Director: {movie.movie.director}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});

export default SelectedMovieList;
