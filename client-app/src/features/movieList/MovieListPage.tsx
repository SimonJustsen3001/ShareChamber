import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import "./MovieListPage.Module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import MovieListOverview from "./MovieListOverview";
import MovieList from "./MovieList";
import Unauthenticated from "../unauthenticated/Unauthenticated";

export default observer(function MovieListPage() {
  const { movieListStore, userStore } = useStore();

  useEffect(() => {
    movieListStore.loadMovieLists();
  }, [movieListStore, userStore]);

  return (
    <>
      {userStore.isLoggedIn ? (
        <div className="list-setup">
          <MovieList />
          <MovieListOverview />
        </div>
      ) : (
        <Unauthenticated
          message="An account is required to create movie lists"
          loginRequired={true}
        />
      )}
    </>
  );
});
