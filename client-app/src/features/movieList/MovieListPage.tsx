import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import "./MovieListPage.Module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import MovieListOverview from "./MovieListOverview";
import MovieList from "./MovieList";

export default observer(function MovieListPage() {
  const { movieListStore } = useStore();

  useEffect(() => {
    movieListStore.loadMovieLists();
  }, [movieListStore]);

  return (
    <>
      <div className="list-setup">
        <MovieList />
        <MovieListOverview />
      </div>
    </>
  );
});
