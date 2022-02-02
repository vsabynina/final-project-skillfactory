import React from "react";
import { Link } from "react-router-dom";
import css from "./Authorization.module.css";

const Authorization = () => {
  return (
    <div className={css.wrapper}>
      <form className="needs-validation" novalidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="authorizationEmail">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="authorizationEmail"
            autoComplete="e-mail"
            placeholder="name@example.com"
            required
          />
          {/*valid*/}
          {/*<div className="valid-feedback">Looks good!</div>*/}

          {/*invalid*/}
          {/*<div className="invalid-feedback">Please provide a valid city.</div>*/}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="authorizationPassword">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="authorizationPassword"
            autoComplete="current-password"
            placeholder="Password"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <button type="submit" className={`btn btn-primary ${css.button}`}>
          Log in
        </button>
        <Link to="/api/auth/sign_up" className={`nav-link ${css.a}`}>
          Don't have an account?
        </Link>
      </form>
    </div>
  );
};
export default Authorization;
