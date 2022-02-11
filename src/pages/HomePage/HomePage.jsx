import React from "react";
import css from "./HomePage.module.css";
import background from "../../assets/images/backgroundImage.jpg";

const HomePage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.text}>
        <h1 className="h1">Find bicycle</h1>
        <p className={`lead ${css.paragraph}`}>
          This service helps to find
          <br /> lost bicycles
        </p>
      </div>
      <img src={background} className={css.img} alt={"People on bicycles"} />
    </div>
  );
};

export default HomePage;
