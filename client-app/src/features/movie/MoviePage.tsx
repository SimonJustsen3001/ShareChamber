import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "@fortawesome/fontawesome-free/css/all.css";
import Unauthenticated from "../unauthenticated/Unauthenticated";
import SearchBar from "./SearchBar";
import MovieGrid from "./MovieGrid";

const MoviePage = observer(() => {
  const { movieStore, movieListStore, userStore } = useStore();

  useEffect(() => {
    if (userStore.searchAnonymous) movieStore.loadMovies("");
    if (userStore.user) movieListStore.loadMovieLists();
  }, [movieStore, movieListStore]);

  return userStore.isLoggedIn || userStore.searchAnonymous ? (
    <>
      <SearchBar />
      <MovieGrid />
    </>
  ) : (
    <Unauthenticated
      message="Please login to enjoy a better search experience"
      loginRequired={false}
    />
  );
});

export default MoviePage;
