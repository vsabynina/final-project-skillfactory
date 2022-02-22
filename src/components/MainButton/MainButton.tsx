import React from "react";

interface PropsType {
  title?: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  disabled?: boolean;
  onClick?(): void;
}

const MainButton: React.FC<PropsType> = (props) => {
  const { title, type, className, disabled, onClick } = props;
  return (
    <button
      className={`btn btn-primary ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default MainButton;
