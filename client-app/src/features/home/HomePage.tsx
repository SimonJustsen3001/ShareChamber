import { observer } from "mobx-react-lite";
import "./HomePage.Module.css";

export default observer(function HomePage() {
  return (
    <div className="overview">
      <div className="info-container">
        <div className="welcome-message">Welcome to Movie List</div>
        <div className="info-message">
          In order to enjoy full usage of the website, please register or login
        </div>
      </div>
    </div>
  );
});
