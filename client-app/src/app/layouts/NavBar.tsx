import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LoginForm from "../../features/form/LoginForm";
import RegisterForm from "../../features/form/RegisterForm";
import { useStore } from "../stores/store";
import styles from "./NavBar.module.css";

export default observer(function NavBar() {
  const { userStore, modalStore } = useStore();
  return (
    <div className={styles.navbar}>
      <div className={styles.leftNavbarMenu}>
        <Link to={"/"} className={styles.menuElement}>
          Home
        </Link>
      </div>
      {userStore.isLoggedIn ? (
        <>
          <div className={styles.middleNavbarMenu}>
            <Link to={"/movie"} className={styles.menuElement}>
              Movies
            </Link>
            <Link to={"/list"} className={styles.menuElement}>
              Movie Lists
            </Link>
          </div>
          <div className={styles.rightNavbarMenu}>
            <div className={styles.profileElement}>
              {userStore.user?.displayName}
              <div className={styles.dropdownMenu}>
                <Link to="/settings" className={styles.dropdownLink}>
                  Settings
                </Link>
                <Link to="/profile" className={styles.dropdownLink}>
                  Profile
                </Link>
                <div
                  onClick={() => userStore.logout()}
                  className={styles.dropdownLink}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.middleNavbarMenu}>
            <Link to={"/movie"} className={styles.menuElement}>
              Movies
            </Link>
            <Link to={"/list"} className={styles.menuElement}>
              Movie Lists
            </Link>
          </div>
          <div className={styles.rightNavbarMenu}>
            <div
              onClick={() => modalStore.openModal(<LoginForm />)}
              className={styles.menuElement}
            >
              Login
            </div>
            <div
              onClick={() => modalStore.openModal(<RegisterForm />)}
              className={styles.menuElement}
            >
              Register
            </div>
          </div>
        </>
      )}
    </div>
  );
});
