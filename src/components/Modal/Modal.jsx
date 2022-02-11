import React from "react";
import { Link } from "react-router-dom";
import css from "./Modal.module.css";
import MainButton from "../../components/MainButton";
import SecondaryButton from "../../components/SecondaryButton";

const Modal = (props) => {
  const {
    title,
    paragraph,
    titleSecondaryButton,
    titleMainButton,
    onClickSecondaryButton,
    onClickMainButton,
    isSecondaryButtonShown,
  } = props;
  return (
    <div className={`modal ${css.display}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <p>{paragraph}</p>
          </div>
          <div className="modal-footer">
            {isSecondaryButtonShown && (
              <SecondaryButton
                title={titleSecondaryButton}
                type={"button"}
                onClick={onClickSecondaryButton}
              />
            )}
            <MainButton
              title={titleMainButton}
              type={"button"}
              onClick={onClickMainButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
