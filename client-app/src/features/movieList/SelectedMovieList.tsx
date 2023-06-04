import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import AddCollaboratorForm from "../form/AddCollaboratorForm";
import "./SelectedMovieList.Module.css";
import DeleteForm from "../form/DeleteForm";
import RateForm from "../form/RateForm";
import { useEffect } from "react";
import Cookies from "js-cookie";

const SelectedMovieList = observer(() => {
  const { modalStore, movieListStore, userStore } = useStore();

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
              <button className="selectedmovielist-button-add-collab">
                Add
              </button>
              <button className="selectedmovelist-button-remove-list">
                Remove
              </button>
            </div>
          </div>
          <div className="selectedmovielist-movielist-wrapper">
            {movieListStore.selectedMovieList.movieMovieLists.map((movie) => (
              <div className="selectedmovielist-movie-wrapper">
                <div className="selectedmovielist-image-wrapper">
                  <img
                    className="selectedmovielist-image"
                    src={movie.movie.imageUrl}
                  />
                </div>
                <div className="selectedmovielist-movie-info-wrapper">
                  <div className="selectedmovielist-movie-title-wrapper">
                    <h4 className="selectedmovielist-movie-title">
                      {movie.movie.title}
                    </h4>
                    <button className="selectedmovielist-button-remove-movie">
                      Remove
                    </button>
                  </div>
                  <p className="selectedmovielist-movie-description">
                    {movie.movie.description}
                  </p>
                  <p className="selectedmovielist-movie-director">
                    {movie.movie.director}
                  </p>
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
