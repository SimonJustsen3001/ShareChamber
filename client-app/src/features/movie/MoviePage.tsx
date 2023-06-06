import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "./MoviePage.Module.css";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import SearchBar from "./SearchBar";
import AddMovieForm from "../form/AddMovieForm";
import MovieBanner from "./MovieBanner";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const MoviePage = observer(() => {
  const { movieStore, movieListStore, userStore, modalStore } = useStore();

  const [movieBackgroundImages, setMovieBackgroundImages] = useState([
    "/cheng-feng-psdV2Rl-GvU-unsplash.jpg",
    "/pexels-guillaume-meurice-2873671.jpg",
  ]);
  const [isTouch, setIsTouch] = useState(false);

  const component = useRef<HTMLDivElement>(null);
  const movieGridRef = useRef<HTMLImageElement>(null);
  const canHover: boolean = window.matchMedia("(hover: hover)").matches;

  useEffect(() => {
    movieStore.loadMovies("");
    if (userStore.user) movieListStore.loadMovieLists();
  }, [movieStore, movieListStore]);

  return (
    <>
      <div ref={component} className="moviepage-wrapper">
        {movieBackgroundImages.map((backgroundImage) => (
          <img className="moviepage-background-image" src={backgroundImage} />
        ))}
        <div className="moviepage-content-wrapper">
          <>
            <MovieBanner />
            <SearchBar />
            {movieStore.movies.length > 0 ? (
              <div className="movie-grid-wrapper">
                <div ref={movieGridRef} className="movie-grid">
                  {movieStore.movies.map((movie, index) => (
                    <div className="movie-card-container">
                      <div
                        className={
                          movie.isFlipped
                            ? "movie-flip-card flipped"
                            : "movie-flip-card"
                        }
                      >
                        <div
                          className="movie-card-front"
                          onClick={() => movieStore.setFlip(index)}
                        >
                          <img
                            className="movie-card-image"
                            src={movie.imageUrl}
                            alt="Missing image"
                          />
                          {movie.rating != 0 ? (
                            <div className="movie-card-rating-container">
                              {movie.rating}
                            </div>
                          ) : (
                            <></>
                          )}
                          {movie.year ? (
                            <div className="movie-card-year-container">
                              {movie.year}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div
                          className="movie-card-back"
                          onClick={() => movieStore.setFlip(index)}
                        >
                          <div className="movie-card-description-wrapper">
                            <p className="movie-card-description-text">
                              {movie.description}
                            </p>
                          </div>
                          <div className="movie-card-buttons-wrapper">
                            <button
                              className="movie-card-back-button"
                              onClick={() =>
                                modalStore.openModal(
                                  <AddMovieForm
                                    movieId={movie.id}
                                    movieTitle={movie.title}
                                  />
                                )
                              }
                            >
                              <i className="fa-solid fa-plus" />
                              &nbsp; Add
                            </button>
                          </div>
                          <img
                            className="movie-card-back-image"
                            src={movie.imageUrl}
                            alt=""
                          />
                        </div>
                      </div>
                      <p className="movie-card-title">{movie.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="nothing-found-wrapper">
                <p>No movies found</p>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
});

export default MoviePage;
