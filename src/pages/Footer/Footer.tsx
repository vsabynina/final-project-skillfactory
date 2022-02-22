import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: React.VFC = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <nav className={"navbar navbar-expand-lg navbar-light background"}>
        <div className={"container-fluid navContainer"}>
          <Link to="/" className="navbar-brand">
            {t("footer.title")}
          </Link>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                {t("footer.navLinks.email")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="tel:+7 777 777 77"
              >
                {t("footer.navLinks.phone")}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
