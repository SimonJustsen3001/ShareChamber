import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../app/stores/store";
import "./MovieBanner.Module.css";
import { gsap } from "gsap";

const MovieBanner = observer(() => {
  const [movieBannerIndex, setMovieBannerImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const { userStore } = useStore();

  const [movieBanner, setMovieBanner] = useState([
    "//wsrv.nl/?url=https://m.media-amazon.com/images/M/MV5BNjk5YTU0OTAtMTM1NC00Zjc1LWEzZjAtOWJkYzcxOGRhNWNhXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg&w=1920",
    "//wsrv.nl/?url=https://m.media-amazon.com/images/M/MV5BODhhY2M5NjEtZTc0OC00MDE5LWJiMWQtYTZkMTMwMTA0NmZjXkEyXkFqcGdeQXVyMTEwMjgyMzIz._V1_.jpg&w=1920",
  ]);
  const bannerRef = useRef(null);
  const imageRef = useRef(null);

  const handleClickMovieBanner = (index: number) => {
    setMovieBannerImage(index);
  };

  const handleImageLoad = () => {
    if (loadedImagesCount === movieBanner.length)
      setLoadedImagesCount((prev) => prev + 1);
    else setImagesLoaded(true);
  };

  useEffect(() => {
    if (imageRef.current) {
      let movieImages = gsap.utils.toArray(".moviepage-background-image");
      let bannerImages = gsap.utils.toArray(".movie-banner-image");
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
          });
        }
      }, bannerRef);
      return () => ctx.revert();
    }
  }, [imagesLoaded, movieBannerIndex, userStore.isSmallScreen, imageRef]);

  return (
    <div ref={bannerRef} className="movie-banner">
      {movieBanner.map((movie, index) => (
        <img
          ref={imageRef}
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
  );
});

export default MovieBanner;
