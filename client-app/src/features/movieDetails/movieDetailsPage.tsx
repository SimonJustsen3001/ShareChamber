import { observer } from "mobx-react-lite";
import "./movieDetailsPage.Module.css";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";

const MovieDetailsPage = observer(() => {
  const { movieStore } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const movieId = searchParams.get("id");
    if (movieId) movieStore.loadMovieDetails(movieId);
  }, [movieStore]);

  return (
    <div className="movie-details-container">
      <div className="movie-details-content"></div>
    </div>
  );
});

export default MovieDetailsPage;
