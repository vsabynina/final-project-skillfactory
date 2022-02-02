import React from "react";
import { Link } from "react-router-dom";
import css from "./SuccessfulRegistration.module.css";

const SuccessfulRegistration = ({ isCompleted, setIsCompleted }) => {
  const handleClick = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={`modal ${css.display}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User was created</h5>
          </div>
          <div className="modal-body">
            <p>Registration completed successfully</p>
          </div>
          <div className="modal-footer">
            <Link to="/">
              <button type="button" className="btn btn-primary">
                Go to Home page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessfulRegistration;
