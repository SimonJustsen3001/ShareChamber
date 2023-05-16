import { observer } from "mobx-react-lite";
import "./MovieGrid.Module.css";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";

const MovieGrid = observer(() => {
  const { movieStore, movieListStore } = useStore();

  return (
    <div className="movie-grid-container">
      {!movieStore.loadingInitial && !movieStore.loading ? (
        <div>
          
        </div>
      ) : (
        <div className="loading-container">
          <i className="fa fa-spinner fa-spin loading-icon" />
        </div>
      )}
    </div>
  );
});

export default MovieGrid;
