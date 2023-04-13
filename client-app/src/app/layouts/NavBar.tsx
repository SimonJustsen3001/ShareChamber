import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LoginForm from "../../features/form/LoginForm";
import RegisterForm from "../../features/form/RegisterForm";
import { useStore } from "../stores/store";
import "./NavBar.Module.css";

export default observer(function NavBar() {
  const { userStore, modalStore } = useStore();
  return (
    <div className="navbar">
      <div className="left-navbar-menu">
        <Link to={"/"} className="menu-element">
          Home
        </Link>
      </div>
      {userStore.isLoggedIn ? (
        <>
          <div className="middle-navbar-menu">
            <Link to={"/movie"} className="menu-element">
              Movies
            </Link>
            <Link to={"/list"} className="menu-element">
              Movie Lists
            </Link>
          </div>
          <div className="right-navbar-menu">
            <div className="profile-element">
              {userStore.user?.displayName}
              <div className="dropdown-menu">
                <Link to="/settings" className="dropdown-link">
                  Settings
                </Link>
                <Link to="/profile" className="dropdown-link">
                  Profile
                </Link>
                <div
                  onClick={() => userStore.logout()}
                  className="dropdown-link"
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="middle-navbar-menu">
            <Link to={"/movie"} className="menu-element">
              Movies
            </Link>
            <Link to={"/list"} className="menu-element">
              Movie Lists
            </Link>
          </div>
          <div className="right-navbar-menu">
            <div
              onClick={() => modalStore.openModal(<LoginForm />)}
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
        </>
      )}
    </div>
  );
});
