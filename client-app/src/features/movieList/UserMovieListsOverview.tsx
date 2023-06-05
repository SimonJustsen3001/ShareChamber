import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import CreateListForm from "../form/CreateListForm";
import "./UserMovieListsOverview.Module.css";

const UserMovieListsOverview = observer(() => {
  const { modalStore, movieListStore } = useStore();

  return (
    <div className="usermovielist-wrapper">
      <div className="usermovielist-header-wrapper">
        <h2 className="usermovielist-header-text">Movie lists</h2>
        <button
          onClick={() => modalStore.openModal(<CreateListForm />)}
          className="usermovielist-new-list-button"
        >
          New
          <img src="addList.svg" />
        </button>
      </div>
      <div className="usermovielist-all-list-wrapper">
        {movieListStore.movieLists.map((movieList) => (
          <div
            className="usermovielist-list-wrapper"
            onClick={() => movieListStore.setSelectedMovieList(movieList)}
          >
            <div className="usermovielist-image-wrapper">
              {movieList.movieMovieLists[0] ? (
                <img
                  className="usermovielist-image"
                  src={movieList.movieMovieLists[0].movie.imageUrl}
                />
              ) : (
                <div className="usermovielist-image"></div>
              )}
            </div>
            <div className="usermovielist-text-wrapper">
              <h4 className="usermovielist-title">{movieList.name}</h4>
              <div className="usermovielist-list-info-wrapper">
                <p className="usermovielist-movie-number">
                  {movieList.movieMovieLists.length}
                  {movieList.movieMovieLists.length === 1
                    ? " title"
                    : " titles"}
                </p>
                <p className="usermovielist-owner">
                  {movieList.ownerName}'s list
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default UserMovieListsOverview;
