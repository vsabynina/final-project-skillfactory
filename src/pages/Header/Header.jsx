import React from "react";
import { Link } from "react-router-dom";
import user from "../../assets/icons/userIcon.svg";
import css from "./Header.module.css";
import { connect } from "react-redux";
import { logOut } from "../../store/reducers/authorizationReducer";

const Header = (props) => {
  const { logOut, isAuthorized } = props;
  return (
    <header>
      <nav className={`navbar navbar-expand-lg navbar-light ${css.background}`}>
        <div className={`container-fluid ${css.container}`}>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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

            <div className="dropdown">
              <button
                className={`dropdown-toggle ${css.icon}`}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={user} icon={"User"} />
              </button>
              <ul
                className={`dropdown-menu ${css.dropdown}`}
                aria-labelledby="dropdownMenuButton1"
              >
                {isAuthorized ? (
                  <li>
                    <Link to="/" className="dropdown-item" onClick={logOut}>
                      Выйти
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/auth/sign_in" className="dropdown-item">
                      Войти
                    </Link>
                  </li>
                )}
              </ul>
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
