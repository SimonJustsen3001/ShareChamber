import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import "./MovieListPage.Module.css";

export default observer(function MovieListPage() {
  const { movieListStore } = useStore();

  useEffect(() => {
    movieListStore.loadMovieLists();
  }, [movieListStore]);

  return (
    <>
      <div className="movieList-grid">
        {movieListStore.movieLists.map((movieList) => (
          <div className="movieList-container">
            <div className="movieList-name">{movieList.name}</div>
          </div>
        ))}
      </div>
    </>
  );
});
