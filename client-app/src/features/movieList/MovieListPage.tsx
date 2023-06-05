import { observer } from "mobx-react-lite";
import "./MovieListPage.Module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import UserMovieListsOverview from "./UserMovieListsOverview";
import SelectedMovieList from "./SelectedMovieList";
import Unauthenticated from "../unauthenticated/Unauthenticated";

const MovieListPage = observer(() => {
  return (
    <>
      {/* {userStore.isLoggedIn ? ( */}
      <div className="movielistpage-wrapper">
        <div className="movielistpage-content">
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
