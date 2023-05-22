import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "./MoviePage.Module.css";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import SearchBar from "./SearchBar";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const MoviePage = observer(() => {
  const { movieStore, movieListStore, userStore } = useStore();
  const [movieBanner, setMovieBanner] = useState([
    "//wsrv.nl/?url=https://m.media-amazon.com/images/M/MV5BNjk5YTU0OTAtMTM1NC00Zjc1LWEzZjAtOWJkYzcxOGRhNWNhXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg&w=1920",
    "//wsrv.nl/?url=https://m.media-amazon.com/images/M/MV5BODhhY2M5NjEtZTc0OC00MDE5LWJiMWQtYTZkMTMwMTA0NmZjXkEyXkFqcGdeQXVyMTEwMjgyMzIz._V1_.jpg&w=1920",
  ]);
  const [movieBackgroundImages, setMovieBackgroundImages] = useState([
    "/cheng-feng-psdV2Rl-GvU-unsplash.jpg",
    "/juskteez-vu-TIrXot28Znc-unsplash.jpg",
  ]);
  const [movieNavigators, setMovieNavigators] = useState([]);
  const [movieBannerIndex, setMovieBannerImage] = useState(0);
  const component = useRef<HTMLDivElement>(null);
  const movieGridRef = useRef<HTMLImageElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  useEffect(() => {
    let movieImages = gsap.utils.toArray(".moviepage-background-image");
    let bannerImages = gsap.utils.toArray(".movie-banner-image");
    // if (userStore.searchAnonymous) movieStore.loadMovies("spider");
    movieStore.loadMovies("pi");
    if (userStore.user) movieListStore.loadMovieLists();
    let ctx = gsap.context(() => {
      movieImages.forEach((movieImage, index) => {
        if (movieBannerIndex === index) {
          gsap.to(movieImage!, { opacity: 1 });
        }
      });
      if (imagesLoaded) {
        bannerImages.forEach((bannerImage, index) => {
          if (movieBannerIndex === index) {
            gsap.to(bannerImage!, { opacity: 1 });
          }
          if (!userStore.isSmallScreen) {
            switch (index) {
              case 0:
                gsap.set(bannerImage!, { y: -850 });
                break;
              case 1:
                gsap.set(bannerImage!, { y: -800 });
                break;
            }
          }
        });
      }
    }, component);
    return () => ctx.revert();
  }, [
    imagesLoaded,
    movieStore,
    movieListStore,
    movieBannerIndex,
    userStore.isSmallScreen,
  ]);

  useEffect(() => {
    const pageNumber = Math.ceil(movieStore.movies.length / 10);
    generateMovieNavigation(pageNumber);
  }, [movieStore.movies.length]);

  useEffect(() => {
    let movies = gsap.utils.toArray(".movie-card-container") as Element[];
    let navigators = gsap.utils.toArray(".movie-scroll-button") as Element[];
    navigators.forEach((navigator, index) => {
      console.log(
        "Movie at index " + index * 10 + ": ",
        movies[index * 10],
        " and navigator: ",
        navigator
      );
      gsap.to(navigator, {
        scrollTrigger: {
          trigger: movies[index * 10],
          start: "top bottom",
          end: "top bottom",
          onEnter: () =>
            gsap.to(navigator, {
              backgroundColor: "var(--color-2)",
              duration: 0.3,
            }),
          onLeaveBack: () =>
            gsap.to(navigator, {
              backgroundColor: "transparent",
              duration: 0.3,
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

  const handleClickMovieBanner = (index: number) => {
    setMovieBannerImage(index);
  };

  const handleImageLoad = () => {
    if (loadedImagesCount === movieBanner.length)
      setLoadedImagesCount((prev) => prev + 1);
    else setImagesLoaded(true);
  };

  return (
    <>
      <div ref={component} className="moviepage-wrapper">
        {movieBackgroundImages.map((backgroundImage) => (
          <img className="moviepage-background-image" src={backgroundImage} />
        ))}
        <div className="moviepage-content-wrapper">
          <>
            <div className="movie-banner">
              {movieBanner.map((movie, index) => (
                <img
                  onLoad={handleImageLoad}
                  className="movie-banner-image"
                  src={movie}
                ></img>
              ))}
              <div className="movie-banner-control-panel">
                {movieBanner.map((movie, index) => (
                  <button
                    className={
                      movieBannerIndex === index
                        ? "movie-banner-selected-button"
                        : "movie-banner-not-selected-button"
                    }
                    onClick={() => handleClickMovieBanner(index)}
                  ></button>
                ))}
              </div>
            </div>
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
                        </div>
                        <div className="movie-card-back">
                          <div className="movie-card-buttons-wrapper">
                            <button className="movie-card-back-button">
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
                      <h4>{movie.title}</h4>
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
