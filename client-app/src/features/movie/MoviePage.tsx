import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import "./MoviePage.Module.css";

export default observer(function MoviePage() {
  const { movieStore } = useStore();

  useEffect(() => {
    movieStore.loadMovies("Spirited%20Away");
  }, [movieStore]);

  return (
    <>
      <div className="movie-grid">
        {movieStore.movies.map((movie) => (
          <div className="movie-container">
            {movie.imageUrl ? (
              <img className="movie-image" src={movie.imageUrl} />
            ) : (
              <div className="not-found">No Image</div>
            )}

            <div>{movie.title}</div>
          </div>
        ))}
      </div>
    </>
  );
});
