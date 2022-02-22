import React from "react";
import classNames from "classnames";

interface PropsType {
  title?: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  disabled?: boolean;
  onClick?(): void;
}

const MainButton: React.FC<PropsType> = (props) => {
  const { title, type, className, disabled, onClick } = props;

  const classes = classNames("btn", "btn-primary", className);

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default MainButton;
