import React from "react";
import css from "../EditButton/EditButton.module.css";

const EditButton = (props) => {
  const { onClick, type, src, className, disabled } = props;
  return (
    <button
      className={`${css.btnEdit} ${className}`}
      type={type}
      disabled={disabled}
    >
      <img src={src} onClick={onClick} alt={"Edit button icon"} />
    </button>
  );
};

export default EditButton;
