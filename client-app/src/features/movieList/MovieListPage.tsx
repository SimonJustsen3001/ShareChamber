import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import "./MovieListPage.Module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import UserMovieListsOverview from "./UserMovieListsOverview";
import SelectedMovieList from "./SelectedMovieList";
import Unauthenticated from "../unauthenticated/Unauthenticated";

const MovieListPage = observer(() => {
  return (
    <>
      {/* {userStore.isLoggedIn ? ( */}
      <div className="movielist-container">
        <div className="list-setup">
          <SelectedMovieList />
          <UserMovieListsOverview />
        </div>
      </div>
      {/* ) : (
        <Unauthenticated
          message="An account is required to create movie lists"
          loginRequired={true}
        />
      )} */}
    </>
  );
});

export default MovieListPage;
