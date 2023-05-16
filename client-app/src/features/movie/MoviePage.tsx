import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "./MoviePage.Module.css";
import { gsap } from "gsap";

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

  useEffect(() => {
    // if (userStore.searchAnonymous) movieStore.loadMovies("spider");
    movieStore.loadMovies("spider");
    if (userStore.user) movieListStore.loadMovieLists();

    let ctx = gsap.context(() => {
      let movieImages = gsap.utils.toArray(".moviepage-background-image");
      movieImages.forEach((movieImage, index) => {
        if (movieBannerIndex === index) {
          gsap.to(movieImage!, { opacity: 1 });
        }
        switch (index) {
          case 0:
            break;
          case 1:
            gsap.to(movieBannerImageRef.current, { y: -800 });
            break;
          case 2:
            gsap.to(movieBannerImageRef.current, { y: -800 });
            break;
          case 3:
            gsap.to(movieBannerImageRef.current, { y: -400 });
        }
      });
    }, component);
    return () => ctx.revert();
  }, [movieStore, movieListStore, movieBannerIndex]);

  const handleClickMovieBanner = (index: number) => {
    setMovieBannerImage(index);
  };

  return (
    <>
      <div ref={component} className="moviepage-wrapper">
        {movieBackgroundImages.map((backgroundImage) => (
          <img className="moviepage-background-image" src={backgroundImage} />
        ))}
        <div className="moviepage-content-wrapper">
          {movieStore.movies.length > 0 ? (
            <>
              {movieBanner.map((movie, index) => (
                <div className="movie-banner">
                  <img
                    ref={movieBannerImageRef}
                    className="movie-banner-image"
                    src={movie}
                  ></img>
                  <div className="movie-banner-control-panel">
                    <button
                      className={
                        movieBannerIndex === index
                          ? "movie-banner-selected-button"
                          : "movie-banner-not-selected-button"
                      }
                      onClick={() => handleClickMovieBanner(index)}
                    ></button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
});

export default MoviePage;
