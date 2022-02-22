import React from "react";
import css from "./HomePage.module.css";
import background from "src/assets/images/backgroundImage.jpg";
import { Trans, useTranslation } from "react-i18next";
import classNames from "classnames";

const HomePage: React.VFC = () => {
  const { t } = useTranslation();

  const classes = classNames("wrapper", css.wrapper);

  return (
    <div className={classes}>
      <div className={css.text}>
        <h1 className="h1">
          <Trans i18nKey="homePage.title">
            Потеряли
            <br />
            велосипед?
          </Trans>
        </h1>
        <p className={`lead ${css.paragraph}`}>{t("homePage.paragraph")}</p>
      </div>
      <img src={background} className={css.img} alt={"People on bicycles"} />
    </div>
  );
};

export default HomePage;
