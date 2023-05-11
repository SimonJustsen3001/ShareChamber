import { observer } from "mobx-react-lite";
import "./HomePage.Module.css";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../app/stores/store";

const HomePage = observer(() => {
  const { userStore } = useStore();
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [pictureIndex, setPictureIndex] = useState(1);
  const prevPictureIndex = useRef(pictureIndex);
  const [pictures, setPictures] = useState([
    "",
    "https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BNzc0OTRmYWUtNjJiYS00MTdkLWJiYTUtY2I5NjMxMjFjYTI3XkEyXkFqcGdeQXVyMzUzMzgxNA@@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BNzc0OTRmYWUtNjJiYS00MTdkLWJiYTUtY2I5NjMxMjFjYTI3XkEyXkFqcGdeQXVyMzUzMzgxNA@@._V1_.jpg",
    "",
  ]);

  useLayoutEffect(() => {
    //setPictureIndex(Math.floor(pictures.length / 2));
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        yPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: true,
          snap: 1 / (panels.length - 1),
        },
      });
      if (userStore.isSmallScreen) {
        gsap
          .timeline({ repeat: -1, repeatDelay: 2 })
          .to(".arrow-animation", {
            duration: 1,
            y: 150,
            ease: "slow(0.5, 0.8, false)",
          })
          .to(".arrow-animation", {
            duration: 1,
            y: 0,
            ease: "slow(0.5, 0.8, false)",
          });
      }
      console.log(pictureIndex);
      let slidePictures = gsap.utils.toArray(".scrollable-image");
      slidePictures.forEach((picture, index) => {
        gsap.to(picture!, { x: (index - 1) * 200 });
        if (index === pictureIndex) gsap.to(picture!, { scale: 1 });
        if (index === 0 || index === pictures.length - 1)
          gsap.to(picture!, { duration: 0, opacity: 0 });
      });
    }, component);

    return () => ctx.revert();
  }, [userStore.isSmallScreen]);

  useEffect(() => {
    const clickedRight = pictureIndex > prevPictureIndex.current;
    const clickedLeft = pictureIndex < prevPictureIndex.current;

    let slidePictures = gsap.utils.toArray(".scrollable-image");
    let ctx = gsap.context(() => {
      if (clickedRight) {
        slidePictures.forEach((picture, index) => {
          gsap.to(picture!, { x: "-=200" });
          if (index === pictureIndex - 1) gsap.to(picture!, { scale: 0.8 });
          if (index === pictureIndex) gsap.to(picture!, { scale: 1 });
        });
      } else if (clickedLeft) {
        slidePictures.forEach((picture, index) => {
          gsap.to(picture!, { x: "+=200" });
          if (index === pictureIndex + 1) gsap.to(picture!, { scale: 0.8 });
          if (index === pictureIndex) gsap.to(picture!, { scale: 1 });
        });
      }
      return () => ctx.revert();
    }, component);

    prevPictureIndex.current = pictureIndex;
  }, [pictureIndex]);

  const handleRightClick = () => {
    if (pictureIndex === pictures.length - 2) return;
    setPictureIndex(pictureIndex + 1);
  };

  const handleLeftClick = () => {
    if (pictureIndex === 1) return;
    setPictureIndex(pictureIndex - 1);
  };

  return (
    <div ref={component}>
      <div ref={slider} className="container">
        <div className="panel panel-1">
          <div className="information-container">
            <div className="about-container">
              <div className="about-text">
                Manage your watchlists with others!
              </div>
              <i className="fa fa-users about-icon"></i>
            </div>
            <div className="info-text">
              Effortlessly co-manage movie lists with friends using
              ShareChamber, now with shared curation
            </div>
            {!userStore.isSmallScreen ? (
              <>
                <div className="scrollable-container">
                  <button
                    className="scroll-left-button"
                    onClick={handleLeftClick}
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </button>
                  {pictures.map((picture) => (
                    <img className="scrollable-image" src={picture}></img>
                  ))}
                  <button
                    className="scroll-right-button"
                    onClick={handleRightClick}
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                </div>
                <div className="scroll-down-container">
                  <p>Scroll down for more information!</p>
                  <div className=""></div>
                </div>
              </>
            ) : (
              <>
                <div className="text-for-replacement">
                  Scroll down to see how!
                </div>
                <i className="fa-solid fa-arrow-right fa-rotate-90 arrow-animation"></i>
              </>
            )}
          </div>
        </div>
        <div className="panel panel-2">ONE</div>
        <div className="panel panel-3">TWO</div>
      </div>
    </div>
  );
});

export default HomePage;
