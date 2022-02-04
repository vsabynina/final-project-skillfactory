import React from "react";
import { Link } from "react-router-dom";
import css from "./SuccessfulRegistration.module.css";

const SuccessfulRegistration = () => {
  return (
    <div className={`modal ${css.display}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Пользователь создан</h5>
          </div>
          <div className="modal-body">
            <p>Регистрация успешно пройдена</p>
          </div>
          <div className="modal-footer">
            <Link to="/">
              <button type="button" className="btn btn-outline-primary">
                Главная страница
              </button>
            </Link>
            <Link to="/auth/sign_in">
              <button type="button" className="btn btn-primary">
                Войти
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessfulRegistration;
