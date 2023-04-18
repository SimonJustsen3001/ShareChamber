import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import CreateListForm from "../form/CreateListForm";
import "./UserMovieListsOverview.Module.css";

const UserMovieListsOverview = observer(() => {
  const { modalStore, movieListStore } = useStore();

  return (
    <div className="list-overview">
      <button
        className="create-list-button"
        onClick={() => modalStore.openModal(<CreateListForm />)}
      >
        Create New List
      </button>
      <div className="movie-lists">
        <p>Lists you own</p>
        {movieListStore.movieLists.map((movieList) => (
          <div
            className="movie-list-container"
            onClick={() => {
              movieListStore.setSelectedMovieList(movieList);
            }}
            key={movieList.id}
          >
            {movieList.movieMovieLists &&
            movieList.movieMovieLists.length > 0 ? (
              <>
                <img
                  className="favorite-movie-image"
                  src={movieList.movieMovieLists[0].movie.imageUrl}
                />
                <div className="movie-lists-info">
                  <div className="list-name">{movieList.name}</div>
                  <div className="list-movie-count">
                    {movieList.movieMovieLists.length} titles
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="no-movie-image">No Image</div>
                <div className="movie-lists-info">
                  <div className="list-name">{movieList.name}</div>
                  <div className="list-movie-count">0 titles</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default UserMovieListsOverview;
