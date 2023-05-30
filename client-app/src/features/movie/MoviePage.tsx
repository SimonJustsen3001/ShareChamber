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
    "/juskteez-vu-TIrXot28Znc-unsplash.jpg",
  ]);
  const [movieNavigators, setMovieNavigators] = useState([]);

  const component = useRef<HTMLDivElement>(null);
  const movieGridRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // if (userStore.searchAnonymous) movieStore.loadMovies("spider");
    movieStore.loadMovies("");
    if (userStore.user) movieListStore.loadMovieLists();
  }, [movieStore, movieListStore]);

  useEffect(() => {
    const pageNumber = Math.ceil(movieStore.movies.length / 10);
    generateMovieNavigation(pageNumber);
  }, [movieStore.movies.length]);

  useEffect(() => {
    let movies = gsap.utils.toArray(".movie-card-container") as Element[];
    let navigators = gsap.utils.toArray(".movie-scroll-button") as Element[];
    navigators.forEach((navigator, index) => {
      gsap.to(navigator, {
        scrollTrigger: {
          trigger: movies[index * 10],
          start: "top 600",
          end: "bottom top",
          onEnter: () =>
            gsap.to(navigator, {
              backgroundColor: "var(--color-2)",
              duration: 0.25,
            }),
          onEnterBack: () =>
            gsap.to(navigator, {
              backgroundColor: "var(--color-2)",
              duration: 0.25,
            }),
          onLeaveBack: () =>
            gsap.to(navigator, {
              backgroundColor: "transparent",
              duration: 0.25,
            }),
          onLeave: () =>
            gsap.to(navigator, {
              backgroundColor: "transparent",
              duration: 0.25,
            }),
          scroller: movieGridRef.current,
        },
      });
    });
  }, [movieNavigators.length, movieStore.movies.length]);

  const generateMovieNavigation = (pageNumber: number) => {
    setMovieNavigators(Array.from({ length: pageNumber }));
  };

  const handleClickMovieNavigation = (index: number) => {
    let movies = gsap.utils.toArray(".movie-card-container");
    let accurateIndex = index * 10;
    if (movieGridRef.current) {
      gsap.to(movieGridRef.current, {
        duration: 1,
        scrollTo: movies[accurateIndex]!,
      });
    }
  };

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
                  {movieStore.movies.map((movie) => (
                    <div className="movie-card-container">
                      <div className="movie-flip-card">
                        <div className="movie-card-front">
                          <img
                            className="movie-card-image"
                            src={movie.imageUrl}
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
                        <div className="movie-card-back">
                          <div className="movie-card-description-wrapper">
                            <p className="movie-card-description-text">{movie.description}</p>
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
                          />
                        </div>
                      </div>
                      <p className="movie-card-title">{movie.title}</p>
                    </div>
                  ))}
                </div>
                <div className="movie-scroll-visualizer">
                  {movieNavigators.map((movie, index) => (
                    <button
                      className="movie-scroll-button"
                      onClick={() => handleClickMovieNavigation(index)}
                    ></button>
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
