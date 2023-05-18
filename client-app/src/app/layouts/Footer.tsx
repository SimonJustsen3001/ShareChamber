import { Link } from "react-router-dom";
import "./Footer.Module.css";
import { observer } from "mobx-react-lite";

const Footer = observer(() => {
  return (
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
  );
});

export default Footer;
