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
          <div className="movie-container" key={movie.id}>
            <div className="movie-title">{movie.title}</div>
            <div className="image-container">
              <img
                className="movie-image"
                src={movie.imageUrl}
                alt="Movie Poster"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
});
