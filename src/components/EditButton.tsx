import React from "react";

type PropsType = {
  type?: "submit" | "reset" | "button";
  src?: string;
  className?: string;
  disabled?: boolean;
  onClick?(): void;
};

const EditButton: React.FC<PropsType> = (props) => {
  const { onClick, type, src, className, disabled } = props;
  return (
    <button
      className={`btnBackground ${className}`}
      type={type}
      disabled={disabled}
    >
      <img src={src} onClick={onClick} alt={"Edit button icon"} />
    </button>
  );
};

export default EditButton;
