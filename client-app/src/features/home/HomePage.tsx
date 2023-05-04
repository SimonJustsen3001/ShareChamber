import { observer } from "mobx-react-lite";
import "./HomePage.Module.css";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = observer(() => {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
          end: () => `+=${slider.current!.offsetHeight / 2}`,
          markers: true,
        },
      });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.5 })
        .to(".arrow-animation", { duration: 1, y: 150 })
        .to(".arrow-animation", { duration: 1, y: 0 });
    }, component);
    return () => ctx.revert();
  });

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
            <div className="text-for-replacement">Scroll down to see how!</div>
            <i className="fa-solid fa-arrow-right fa-rotate-90 arrow-animation"></i>
            <div className="scrollable-container">
              <img
                className="scrollable-image"
                src="https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
              />
              <img
                className="scrollable-image"
                src="https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
              />
            </div>
          </div>
        </div>
        <div className="panel panel-2">ONE</div>
        <div className="panel panel-3">TWO</div>
      </div>
    </div>
  );
});

export default HomePage;
