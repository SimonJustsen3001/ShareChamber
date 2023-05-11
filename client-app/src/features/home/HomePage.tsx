import { observer } from "mobx-react-lite";
import "./HomePage.Module.css";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../app/stores/store";

const HomePage = observer(() => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let bannerScroll = gsap.timeline({
        scrollTrigger: {
          trigger: ".banner-wrapper",
          scrub: 1,
          start: "top 200",
          end: "bottom 400",
        },
      });
      bannerScroll.to(".banner-image", { objectPosition: "0px +=20%" });
    }, component);
  }, []);

  const component = useRef<HTMLDivElement>(null);
  return (
    <div className="main-wrapper" ref={component}>
      <div className="banner-wrapper">
        <img
          className="banner-image"
          src="/felix-mooneeram-evlkOfkQ5rE-unsplash.webp"
        />
        <div className="banner-text-wrapper">
          <h1 className="banner-title">Curate movies together!</h1>
          <h2 className="banner-subtitle">
            Share lists with eachother with the click of a button.
          </h2>
          <button className="banner-button">Get Started</button>
        </div>
      </div>
      <div className="about-wrapper">
        <div className="about-text-wrapper">
          <h2 className="about-title">How ShareChamber Works</h2>
          <img className="about-divider" src="/2461548.svg" alt="divider" />
          <p className="about-text">
            ShareChamber is a simple website designed to help you and your
            friends organize your movielists. Our platform let's you create,
            share and collaboratively curate your own personalized movielist.
          </p>
        </div>
      </div>
    </div>
  );
});

export default HomePage;
