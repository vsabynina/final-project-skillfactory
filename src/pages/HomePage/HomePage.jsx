import React from "react";
import css from "./HomePage.module.css";
import background from "../../assets/images/backgroundImage.jpg";

const HomePage = () => {
  return (
    <div className={`wrapper ${css.wrapper}`}>
      <div className={css.text}>
        <h1 className="h1">
          Потеряли
          <br />
          велосипед?
        </h1>
        <p className={`lead ${css.paragraph}`}>Мы поможем его найти</p>
      </div>
      <img src={background} className={css.img} alt={"People on bicycles"} />
    </div>
  );
};

export default HomePage;
