import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LoginForm from "../../features/form/LoginForm";
import RegisterForm from "../../features/form/RegisterForm";
import { useStore } from "../stores/store";
import "./NavBar.Module.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default observer(function NavBar() {
  const { userStore, modalStore, movieListStore } = useStore();
  const [currentPath, setCurrentPath] = useState("");
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const navbarRef = useRef(null);
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    gsap.to(navbarRef.current, {
      maxHeight: 0,
      duration: 0.3,
      scrollTrigger: {
        trigger: "",
        scrub: 1,
        start: "10 top",
        end: "50 50",
      },
    });
    console.log("test");
  }, [userStore.isSmallScreen]);

  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  return (
    <div className="navbar" ref={navbarRef}>
      <div className="left-navbar-menu">
        <Link to={"/"} className="menu-element">
          Home
        </Link>
      </div>
      <>
        <div className="middle-navbar-menu">
          <Link to={"/movie"} className="menu-element">
            Movies
          </Link>
          <Link to={"/list"} className="menu-element">
            Movie Lists
          </Link>
        </div>
        {userStore.isLoggedIn ? (
          <div className="right-navbar-menu">
            <div
              className={`profile-element ${dropDownVisible ? "clicked" : ""}`}
              onClick={toggleDropDown}
            >
              {userStore.user?.displayName}
              <div
                className={`dropdown-menu ${dropDownVisible ? "visible" : ""}`}
              >
                <Link to="/settings" className="dropdown-link">
                  Settings
                </Link>
                <Link to="/profile" className="dropdown-link">
                  Profile
                </Link>
                <Link
                  to={currentPath}
                  onClick={() => {
                    userStore.logout();
                    movieListStore.setSelectedMovieList(null);
                  }}
                  className="dropdown-link"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="right-navbar-menu">
            <div
              onClick={() => {
                modalStore.openModal(<LoginForm />);
              }}
              className="menu-element"
            >
              Login
            </div>
            <div
              onClick={() => modalStore.openModal(<RegisterForm />)}
              className="menu-element"
            >
              Register
            </div>
          </div>
        )}
      </>
    </div>
  );
});
