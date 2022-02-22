import React from "react";
import css from "./Message.module.css";
import SecondaryButton from "src/components/SecondaryButton";

interface PropsType {
  message?: string | null;
  onClick?(): void;
}

const Message: React.FC<PropsType> = (props) => {
  const { message, onClick } = props;

  return (
    <div className={css.message}>
      <h4 className={css.h4}>{message}</h4>
      <SecondaryButton
        title="Назад"
        type="button"
        onClick={onClick}
        className={css.button}
      />
    </div>
  );
};

export default Message;
