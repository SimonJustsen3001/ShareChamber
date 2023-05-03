import { observer } from "mobx-react-lite";
import "./HomePage.Module.css";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HomePage = observer(() => {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: true,
          snap: 1 / (panels.length - 1),
          end: () => `+=${slider.current!.offsetWidth / 4}`,
          markers: true,
        },
      });
    }, component);
    return () => ctx.revert();
  });

  return (
    <div ref={component}>
      <div ref={slider} className="container">
        <div className="panel panel-1">
          <div className="information-container">
            <div className="about-container">
              <div className="about-name">Sharechamber</div>
              <div className="about-text">Make movie lists together</div>
            </div>
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
