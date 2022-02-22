import React from "react";
import classNames from "classnames";

const LoadingSpinner = () => {
  const classes = classNames("spinner-border", "text-primary");

  return <div className={classes} role="status"></div>;
};

export default LoadingSpinner;
