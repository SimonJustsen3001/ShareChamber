import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import "./MovieListPage.Module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import UserMovieListsOverview from "./UserMovieListsOverview";
import SelectedMovieList from "./SelectedMovieList";
import Unauthenticated from "../unauthenticated/Unauthenticated";

const MovieListPage = observer(() => {
  const { movieListStore, userStore } = useStore();

  useEffect(() => {
    if (userStore.user) movieListStore.loadMovieLists();
  }, [movieListStore, userStore]);

  return (
    <>
      {userStore.isLoggedIn ? (
        <div className="list-setup">
          <SelectedMovieList />
          <UserMovieListsOverview />
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

export default MovieListPage;
