import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <nav className={`navbar navbar-expand-lg navbar-light background`}>
        <div className={`container-fluid navContainer`}>
          <Link to="/" className="navbar-brand">
            Find bicycle
          </Link>

          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link" href="/">
                find.bike@gmail.com
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="tel:+7 777 777 77"
              >
                +7 777 777 77
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
