import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export default observer(function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarmenu}>
        <Link to={"/"} className={styles.menuelement}>
          Home
        </Link>
        <Link to={"/movie"} className={styles.menuelement}>
          Movies
        </Link>
        <Link to={"/"} className={styles.menuelement}>
          Login
        </Link>
        <Link to={"/"} className={styles.menuelement}>
          Register
        </Link>
      </div>
    </div>
  );
});
