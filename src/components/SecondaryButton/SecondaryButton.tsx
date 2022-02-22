import React from "react";
import classNames from "classnames";

interface PropsType {
  title?: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  disabled?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

const SecondaryButton: React.FC<PropsType> = (props) => {
  const { title, type, className, onClick, disabled } = props;

  const classes = classNames("btn", "btn-outline-primary", className);

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default SecondaryButton;
