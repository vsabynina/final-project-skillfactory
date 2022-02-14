import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../store/reducers/authorizationReducer";
import css from "./Header.module.css";

const Header = (props) => {
  const { logOut, isAuthorized } = props;
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
      <nav className={`navbar navbar-expand-lg navbar-light background`}>
        <div className={`container-fluid navContainer`}>
          <Link to="/" className="navbar-brand">
            Find bicycle
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
                    Кражи
                  </Link>
                </li>
              )}

              <li className="nav-item">
                {isAuthorized ? (
                  <Link to="/cases/create_case" className="nav-link">
                    Сообщить о краже
                  </Link>
                ) : (
                  <Link to="/cases/create_case_public" className="nav-link">
                    Сообщить о краже
                  </Link>
                )}
              </li>

              {isAuthorized && (
                <li className="nav-item">
                  <Link to="/officers" className="nav-link">
                    Ответственные сотрудники
                  </Link>
                </li>
              )}
            </ul>

            <div>
              <a
                className={`btnBackground ${css.a}`}
                type="button"
                onClick={
                  isAuthorized
                    ? handleClickButtonLogOut
                    : handleClickButtonLogIn
                }
              >
                {isAuthorized ? "Выйти" : "Войти"}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default connect(
  (state) => {
    return {
      isAuthorized: state.authorizationReducer.isAuthorized,
    };
  },
  (dispatch) => {
    return {
      logOut: () => dispatch(logOut()),
    };
  }
)(Header);
