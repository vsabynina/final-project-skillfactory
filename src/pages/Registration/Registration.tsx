import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import css from "./Registration.module.css";
import LoadingSpinner from "src/components/LoadingSpinner";
import { useActionsAuth, useActionsOfficer } from "src/hooks/useActions";
import { SignUp } from "src/store/types/authorization";
import Message from "src/components/Message";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import Modal from "src/components/Modal";
import MainButton from "src/components/MainButton";
import { useTranslation } from "react-i18next";

const Registration: React.VFC = () => {
  const { t } = useTranslation();

  const { isRegistered, isLoading, messageAuth } = useTypedSelector(
    (state) => state.authorizationReducer
  );

  const { messageOfficer, officerIsCreated } = useTypedSelector(
    (state) => state.officersReducer
  );

  const { signUp, handleClickMessageButton } = useActionsAuth();
  const { createOfficer, handleClickModalButton } = useActionsOfficer();

  const navigate = useNavigate();

  const handleClickMessage = () => {
    navigate(`/auth/sign_in`);
    handleClickMessageButton();
  };
  const handleCLickModalSecondaryButton = () => {
    navigate(`/`);
    handleClickModalButton();
  };

  const handleCLickModalMainButton = () => {
    navigate(`/auth/sign_in`);
    handleClickModalButton();
  };

  return (
    <Formik<SignUp>
      initialValues={{
        email: "",
        password: "",
        clientId: "",
        firstName: "",
        lastName: "",
        approved: false,
        agreement: false,
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email(t("errors.email"))
          .required(t("errors.required")),
        password: Yup.string()
          .min(3, t("errors.passwordMin"))
          .max(12, t("errors.passwordMax"))
          .required(t("errors.required")),
        clientId: Yup.string().required(t("errors.required")),
        firstName: Yup.string().max(15, t("errors.firstName")),
        lastName: Yup.string().max(20, t("errors.lastName")),
        agreement: Yup.boolean().oneOf([true], t("errors.registration")),
      })}
      onSubmit={(values) => {
        signUp(values);
        createOfficer(values);
      }}
    >
      {(formik) => {
        return (
          <>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {messageAuth || messageOfficer ? (
                  <Message
                    message={messageOfficer || messageOfficer}
                    onClick={handleClickMessage}
                  />
                ) : (
                  <div className="wrapper">
                    <Form className={`row g-3 needs-validation ${css.form}`}>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="email">
                          {t("user.email")}
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name={"email"}
                          placeholder={t("placeholder.email")}
                        />
                        <ErrorMessage
                          name={"email"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="password" className="form-label">
                          {t("user.password")}
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          id="password"
                          name={"password"}
                          placeholder={t("placeholder.password")}
                          autoComplete="on"
                        />
                        <ErrorMessage
                          name={"password"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="clientId" className="form-label">
                          {t("case.clientId")}
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="clientId"
                          name={"clientId"}
                          placeholder={t("placeholder.clientId")}
                        />
                        <ErrorMessage
                          name={"clientId"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="firstName" className="form-label">
                          {t("user.firstName")}
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="firstName"
                          name={"firstName"}
                          placeholder={t("placeholder.firstName")}
                        />
                      </div>

                      <div className="col-md-5">
                        <label htmlFor="lastName" className="form-label">
                          {t("user.lastName")}
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="lastName"
                          name={"lastName"}
                          placeholder={t("placeholder.lastName")}
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="approved" className="form-label">
                          {t("user.approved")}
                        </label>
                        <Field
                          as={"select"}
                          className="form-select"
                          id="approved"
                          name={"approved"}
                          disabled
                        >
                          <option value={"false"}>
                            {t("registration.notApproved")}
                          </option>
                        </Field>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <Field
                            className="form-check-input"
                            type={"checkbox"}
                            name={"agreement"}
                            id="agreement"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="agreement"
                          >
                            {t("form.agreement")}
                          </label>
                        </div>
                        <ErrorMessage
                          name={"agreement"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>
                      <div className="col-12">
                        <MainButton
                          title={t("registration.mainButton.title")}
                          type={"submit"}
                          disabled={!(formik.isValid && formik.dirty)}
                        />
                      </div>
                    </Form>
                  </div>
                )}
              </>
            )}

            {officerIsCreated && isRegistered && (
              <Modal
                title={t("registration.modal.title")}
                paragraph={t("registration.modal.paragraph")}
                titleSecondaryButton={t(
                  "registration.modal.titleSecondaryButton"
                )}
                titleMainButton={t("registration.modal.titleMainButton")}
                onClickSecondaryButton={handleCLickModalSecondaryButton}
                onClickMainButton={handleCLickModalMainButton}
                isSecondaryButtonShown={true}
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default Registration;
