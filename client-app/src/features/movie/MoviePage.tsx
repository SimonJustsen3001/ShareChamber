import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import styles from "./MoviePage.Module.css";

export default observer(function MoviePage() {
  const { movieStore } = useStore();

  useEffect(() => {
    movieStore.loadMovies("Spirited%20Away");
    console.log("actually reading here");
  }, [movieStore]);

  return (
    <>
      <div>hey</div>
      {movieStore.movies.map((movie) => (
        <div>{movie.title}</div>
      ))}
    </>
  );
});
