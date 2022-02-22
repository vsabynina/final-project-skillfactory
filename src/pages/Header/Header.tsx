import React from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./Header.module.css";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActionsAuth } from "src/hooks/useActions";
import Russian from "src/assets/icons/russian.svg";
import English from "src/assets/icons/english.svg";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

const Header: React.VFC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const { isAuthorized } = useTypedSelector(
    (state) => state.authorizationReducer
  );

  const classes = classNames("btnBackground", css.a);

  const { logOut } = useActionsAuth();

  const navigate = useNavigate();

  const handleClickButtonLogOut = () => {
    logOut();
    navigate("/");
  };

  const handleClickButtonLogIn = () => {
    navigate("/auth/sign_in");
  };

  return (
    <header>
      <nav className={"navbar navbar-expand-lg navbar-light background"}>
        <div className={"container-fluid navContainer"}>
          <Link to="/" className="navbar-brand">
            {t("header.title")}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className={"navbar-nav me-auto mb-2 mb-lg-0"}>
              {isAuthorized && (
                <li className="nav-item">
                  <Link to="/cases" className="nav-link">
                    {t("header.navLinks.thefts")}
                  </Link>
                </li>
              )}

              <li className="nav-item">
                {isAuthorized ? (
                  <Link to="/cases/create_case" className="nav-link">
                    {t("header.navLinks.theftReport")}
                  </Link>
                ) : (
                  <Link to="/cases/create_case_public" className="nav-link">
                    {t("header.navLinks.theftReport")}
                  </Link>
                )}
              </li>

              {isAuthorized && (
                <li className="nav-item">
                  <Link to="/officers" className="nav-link">
                    {t("header.navLinks.officers")}
                  </Link>
                </li>
              )}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("header.navLinks.lang")}
                </a>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className={css.li} onClick={(e) => changeLanguage("ru")}>
                    <a className="dropdown-item" href="#">
                      <img src={Russian} className={css.img} />
                      {t("header.navLinks.ru")}
                    </a>
                  </li>

                  <li className={css.li} onClick={(e) => changeLanguage("eng")}>
                    <a className="dropdown-item" href="#">
                      <img src={English} className={css.img} />
                      {t("header.navLinks.eng")}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <div>
              <a
                className={classes}
                type="button"
                onClick={
                  isAuthorized
                    ? handleClickButtonLogOut
                    : handleClickButtonLogIn
                }
              >
                {isAuthorized ? t("header.logOut") : t("header.logIn")}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
