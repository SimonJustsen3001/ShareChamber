import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import "./MovieListPage.Module.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default observer(function MovieListPage() {
  const { movieListStore } = useStore();

  useEffect(() => {
    movieListStore.loadMovieLists();
  }, [movieListStore]);

  return (
    <>
      <div className="list-setup">
        <div className="list-selected">
          {movieListStore.selectedMovieList ? (
            <>
              <div className="list-selected-info">
                <div className="selected-name">
                  {movieListStore.selectedMovieList.name}
                </div>
                <div className="selected-author">
                  owned by <span className="author">{}</span>{" "}
                  <span className="other-collaborators">
                    | no other collaborators
                  </span>
                </div>
                <div className="selected-list-overview">
                  {movieListStore.selectedMovieList.movieMovieLists.map(
                    (movie) => (
                      <div className="selected-list-container">
                        <img
                          className="movie-list-image"
                          src={movie.movie.imageUrl}
                        />
                        <div className="movie-list-info">
                          <div className="movie-list-title">
                            {movie.movie.title}
                          </div>
                          <div className="movie-list-metadata">
                            PG &#124; 125 min &#124; Animation, Adventure,
                            Family
                          </div>
                          <div className="movie-description">
                            {movie.movie.description}
                          </div>
                          <div className="movie-list-director">
                            Directed by Hayao Miyazaki
                          </div>
                          <div className="movie-list-actors">
                            Features Rumi Hiiragi, Mity Irino
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
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="list-overview">
          <button className="create-list-button">Create New List</button>
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
      </div>
    </>
  );
});
