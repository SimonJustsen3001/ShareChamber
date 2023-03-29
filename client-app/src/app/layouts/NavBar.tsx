import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LoginForm from "../../features/form/LoginForm";
import { useStore } from "../stores/store";
import styles from "./NavBar.module.css";

export default observer(function NavBar() {
  const { userStore, modalStore } = useStore();
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarmenu}>
        <Link to={"/"} className={styles.menuelement}>
          Home
        </Link>
        <Link to={"/movie"} className={styles.menuelement}>
          Movies
        </Link>
        <div
          onClick={() => modalStore.openModal(<LoginForm />)}
          className={styles.menuelement}
        >
          Login
        </div>
        <Link to={"/"} className={styles.menuelement}>
          Register
        </Link>
      </div>
    </div>
  );
});
