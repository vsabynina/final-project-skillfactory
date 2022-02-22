import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import css from "./Authorization.module.css";
import LoadingSpinner from "src/components/LoadingSpinner";
import Message from "src/components/Message";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SignIn } from "src/store/types/authorization";
import Modal from "src/components/Modal";
import MainButton from "src/components/MainButton";
import { useActionsAuth } from "src/hooks/useActions";
import { useTranslation } from "react-i18next";

const Authorization: React.VFC = () => {
  const { t } = useTranslation();

  const { messageAuth, isLoading, isAuthorized } = useTypedSelector(
    (state) => state.authorizationReducer
  );

  const { signIn, handleClickMessageButton } = useActionsAuth();

  const navigate = useNavigate();

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  const handleCLickModalMainButton = () => {
    navigate(`/`);
  };

  return (
    <Formik<SignIn>
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email(t("errors.email"))
          .required(t("errors.required")),
        password: Yup.string()
          .min(3, t("errors.passwordMin"))
          .max(12, t("errors.passwordMax"))
          .required(t("errors.required")),
      })}
      onSubmit={(values) => {
        signIn(values);
      }}
    >
      {(formik) => {
        return (
          <>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {messageAuth ? (
                  <Message message={messageAuth} onClick={handleClickMessage} />
                ) : (
                  <div className={"wrapper"}>
                    <Form className={css.form}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                          {t("user.email")}
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name={"email"}
                          autoComplete="e-mail"
                          placeholder={t("placeholder.email")}
                        />
                        <ErrorMessage
                          name={"email"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                          {t("user.password")}
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          id="password"
                          name={"password"}
                          autoComplete="on"
                          placeholder={t("placeholder.password")}
                        />
                        <ErrorMessage
                          name={"password"}
                          className="invalidMessage"
                          component="div"
                        />
                        <div className="invalidMessage">{messageAuth}</div>
                      </div>

                      <MainButton
                        title={"Войти"}
                        className={css.button}
                        type={"submit"}
                        disabled={!(formik.isValid && formik.dirty)}
                      />
                      <Link to="/auth/sign_up" className={`nav-link ${css.a}`}>
                        {t("authorization.noAccount")}
                      </Link>
                    </Form>
                  </div>
                )}
              </>
            )}

            {isAuthorized ? (
              <Modal
                title={t("authorization.modal.title")}
                paragraph={t("authorization.modal.paragraph")}
                titleMainButton={t("authorization.modal.titleMainButton")}
                onClickMainButton={handleCLickModalMainButton}
                isSecondaryButtonShown={false}
              />
            ) : null}
          </>
        );
      }}
    </Formik>
  );
};

export default Authorization;
