import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LoginForm from "../../features/form/LoginForm";
import RegisterForm from "../../features/form/RegisterForm";
import { useStore } from "../stores/store";
import "./NavBar.Module.css";
import { useEffect, useState } from "react";

export default observer(function NavBar() {
  const { userStore, modalStore, movieListStore } = useStore();
  const [currentPath, setCurrentPath] = useState("");
  const [dropDownVisible, setDropDownVisible] = useState(false);
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    console.log(currentPath);
  }, []);

  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  return (
    <div className="navbar">
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
