import React from "react";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";

interface PropsType {
  title?: string;
  paragraph?: string;
  titleSecondaryButton?: string;
  titleMainButton?: string;
  isSecondaryButtonShown?: boolean;
  onClickSecondaryButton?(): void;
  onClickMainButton?(): void;
}

const Modal: React.FC<PropsType> = (props) => {
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
    <div className="modal modalShown" tabIndex={-1}>
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
