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
          <div className="list-selected-info">
            <div className="selected-name">List 1</div>
            <div className="selected-author">
              owned by <span className="author">miav123</span>{" "}
              <span className="other-collaborators">
                | no other collaborators
              </span>
            </div>
            <div className="selected-list-overview">
              <div className="selected-list-container">
                <img
                  className="movie-image"
                  src="https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
                />
                <div className="movie-info">
                  <div className="movie-title">Spirited Away</div>
                  <div className="movie-metadata">
                    PG &#124; 125 min &#124; Animation, Adventure, Family
                  </div>
                  <div className="movie-description">
                    During her family's move to the suburbs, a sullen
                    10-year-old girl wanders into a world ruled by gods, witches
                    and spirits, a world where humans are changed into beasts.
                  </div>
                  <div className="movie-director">
                    Directed by Hayao Miyazaki
                  </div>
                  <div className="movie-actors">
                    Features Rumi Hiiragi, Mity Irino
                  </div>
                </div>
                <div className="movie-ratings">
                  <div className="imdb-rating">
                    <i className="fa fa-star " /> 8.6
                  </div>
                  <div className="personal-rating">
                    <i className="fa fa-star" />
                    10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="list-overview">
          <button className="create-list-button">Create New List</button>
          <div className="movie-lists">
            <p>Lists you own</p>
            <div className="movie-list-container">
              <img
                className="favorite-movie-image"
                src="https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
              />
              <div className="movie-lists-info">
                <div className="list-name">List 1</div>
                <div className="list-movie-count">5 titles</div>
              </div>
            </div>
            <div className="movie-list-container">
              <img
                className="favorite-movie-image"
                src="https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
              />
              <div className="movie-lists-info">
                <div className="list-name">List 2</div>
                <div className="list-movie-count">5 titles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

// {movieListStore.movieLists.map((movieList) => (
//   <div className="movieList-lists">
//     <div className="movieList-name">{movieList.name}</div>
//   </div>
// ))}
