import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "./MoviePage.Module.css";
import { gsap } from "gsap";
import SearchBar from "./SearchBar";

const MoviePage = observer(() => {
  const { movieStore, movieListStore, userStore } = useStore();
  const [movieBanner, setMovieBanner] = useState([
    "//wsrv.nl/?url=https://m.media-amazon.com/images/M/MV5BNjk5YTU0OTAtMTM1NC00Zjc1LWEzZjAtOWJkYzcxOGRhNWNhXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg&w=1920",
    "//wsrv.nl/?url=https://m.media-amazon.com/images/M/MV5BODhhY2M5NjEtZTc0OC00MDE5LWJiMWQtYTZkMTMwMTA0NmZjXkEyXkFqcGdeQXVyMTEwMjgyMzIz._V1_.jpg&w=1920",
    "//wsrv.nl/?url=https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg&w=1920",
    "//wsrv.nl/?url=https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg&w=1920",
  ]);
  const [movieBackgroundImages, setMovieBackgroundImages] = useState([
    "/cheng-feng-psdV2Rl-GvU-unsplash.jpg",
    "/juskteez-vu-TIrXot28Znc-unsplash.jpg",
    "/braden-jarvis-ih5Kq0XowwY-unsplash.jpg",
    "/imleedh-ali-Uf-_p8zZiT8-unsplash.jpg",
  ]);
  const [movieBannerIndex, setMovieBannerImage] = useState(0);
  const component = useRef<HTMLDivElement>(null);
  const movieBannerImageRef = useRef<HTMLImageElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  useEffect(() => {
    let movieImages = gsap.utils.toArray(".moviepage-background-image");
    let bannerImages = gsap.utils.toArray(".movie-banner-image");
    // if (userStore.searchAnonymous) movieStore.loadMovies("spider");
    movieStore.loadMovies("spider");
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
              case 2:
                gsap.set(bannerImage!, { y: -820 });
                break;
              case 3:
                gsap.set(bannerImage!, { y: -350 });
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
                <div className="movie-grid">
                  {movieStore.movies.map((movie) => (
                    <div className="movie-card-container">
                      <img
                        className="movie-card-image"
                        src={movie.imageUrl}
                      ></img>
                      {movie.rating != 0 ? (
                        <div className="movie-card-rating-container">
                          {movie.rating}
                        </div>
                      ) : (
                        <></>
                      )}

                      <h4>{movie.title}</h4>
                    </div>
                  ))}
                </div>
                <div className="movie-scroll-visualizer">
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
