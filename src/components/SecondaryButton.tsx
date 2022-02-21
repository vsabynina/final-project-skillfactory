import React from "react";

interface PropsType {
  title?: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  disabled?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

const SecondaryButton: React.FC<PropsType> = (props) => {
  const { title, type, className, onClick, disabled } = props;
  return (
    <button
      type={type}
      className={`btn btn-outline-primary ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default SecondaryButton;
