import { observer } from "mobx-react-lite";
import "./HomePage.Module.css";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HomePage = observer(() => {
  const tutorialImageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    const rect = tutorialImageRef.current!.getBoundingClientRect();
    const y = ((event.clientY - rect!.top) / rect!.height) * 100;
    console.log("test");
    gsap.to(tutorialImageRef.current, {
      duration: 1.5,
      objectPosition: `0 ${y}%`,
    });
  };

  useEffect(() => {
    if (tutorialImageRef.current) {
      gsap.to(tutorialImageRef.current, {
        duration: 0,
        objectPosition: `0 50%`,
      });
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let bannerScroll = gsap.timeline({
        scrollTrigger: {
          trigger: ".banner-wrapper",
          scrub: 1,
          start: "top 180",
          end: "bottom 400",
        },
      });
      bannerScroll.to(".banner-image", {
        delay: 0,
        yPercent: "-=20",
      });
    }, component);

    return () => {
      if (tutorialImageRef.current)
        tutorialImageRef.current!.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      ctx.revert();
    };
  }, []);

  useEffect(() => {}, []);

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
          <h2 className="about-title">About ShareChamber</h2>
          <img className="about-divider" src="/2461548.svg" alt="divider" />
          <p className="about-text">
            ShareChamber is a simple website designed to help you and your
            friends organize your movielists. ShareChamber let's you create,
            share and collaboratively curate your own personalized movielist.
          </p>
        </div>
      </div>
      <div className="tutorial-wrapper">
        <div className="tutorial-panel-1">
          <img
            ref={tutorialImageRef}
            className="tutorial-image"
            src="samuel-regan-asante-wMkaMXTJjlQ-unsplash.webp"
            onLoad={() => {
              tutorialImageRef.current!.addEventListener(
                "mousemove",
                handleMouseMove
              );
            }}
          />
        </div>
        <div className="tutorial-panel-2">
          <div className="tutorial-guide-wrapper">
            <h3 className="tutorial-title">Get Started in 4 steps!</h3>
            <ol className="tutorial-list">
              <li>Register/Login</li>
              <li>Create a new movielist</li>
              <li>Add your friends to the movielist</li>
              <li>Enjoy!</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-links-wrapper">
            <div className="footer-links">
              <h4>ShareChamber</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/movie">Movies</Link>
              <Link to="/about">Movie Lists</Link>
            </div>
          </div>
          <div className="contact-wrapper">
            <h4>Contact me</h4>
            <div className="contact-links">
              <a href="https://github.com/SimonJustsen3001" target="_blank">
                <i className="fa-brands fa-github" />
              </a>
              <a
                href="https://www.linkedin.com/in/simon-justsen-19b3951b6/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin" />
              </a>
              <a href="mailto:justsensimon@hotmail.com">
                <i className="fa-solid fa-envelope" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomePage;
