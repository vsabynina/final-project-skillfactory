import React from "react";

const EditButton = (props) => {
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
