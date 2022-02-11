import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Registration.module.css";
import {
  handleClickMessageButton,
  signUp,
} from "../../store/reducers/authorizationReducer";
import { connect } from "react-redux";
import {
  createOfficer,
  getAllOfficers,
  handleClickModalButton,
} from "../../store/reducers/officersReducer";
import MainButton from "../../components/MainButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

const Registration = (props) => {
  const navigate = useNavigate();

  const {
    signUp,
    createOfficer,
    isLoading,
    isRegistered,
    messageAuthorization,
    messageOfficers,
    handleClickMessageButton,
    handleClickModalButton,
    officerIsCreated,
  } = props;

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
    <Formik
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
          .email("Пожалуйста введите верный e-mail адрес")
          .required("Это поле обязательно для заполнения"),
        password: Yup.string()
          .min(3, "Пароль должен содержать менее 12 символов")
          .max(12, "Пароль должен содержать менее 12 символов")
          .required("Это поле обязательно для заполнения"),
        clientId: Yup.string().required("Это поле обязательно для заполнения"),
        firstName: Yup.string().max(
          15,
          "Это поле может содержать менее 15 символов"
        ),
        lastName: Yup.string().max(
          20,
          "Это поле может содержать менее 20 символов"
        ),
        agreement: Yup.boolean().oneOf(
          [true],
          "Вы должны согласиться перед регистрацией"
        ),
      })}
      onSubmit={(values) => {
        signUp(values);
        createOfficer(values);
      }}
    >
      {(formik) => {
        return (
          <div className={css.wrapper}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {messageAuthorization || messageOfficers ? (
                  <Message
                    message={messageAuthorization || messageOfficers}
                    onClick={handleClickMessage}
                  />
                ) : (
                  <Form className={`row g-3 needs-validation ${css.form}`}>
                    <div className="col-md-4">
                      <label className="form-label" htmlFor="email">
                        E-mail
                      </label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name={"email"}
                        placeholder="name@example.com"
                      />
                      <ErrorMessage
                        name={"email"}
                        className={css.invalidMessage}
                        component="div"
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="password" className="form-label">
                        Пароль
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name={"password"}
                        placeholder="Пароль"
                        autoComplete="on"
                      />
                      <ErrorMessage
                        name={"password"}
                        className={css.invalidMessage}
                        component="div"
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="clientId" className="form-label">
                        ID
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="clientId"
                        name={"clientId"}
                        placeholder="ID клиента"
                      />
                      <ErrorMessage
                        name={"clientId"}
                        className={css.invalidMessage}
                        component="div"
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="firstName" className="form-label">
                        Ваше имя
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="firstName"
                        name={"firstName"}
                        placeholder="Имя"
                      />
                    </div>

                    <div className="col-md-5">
                      <label htmlFor="lastName" className="form-label">
                        Ваша фамилия
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="lastName"
                        name={"lastName"}
                        placeholder="Фамилия"
                      />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="approved" className="form-label">
                        Одобрен
                      </label>
                      <Field
                        as={"select"}
                        className="form-select"
                        id="approved"
                        name={"approved"}
                        disabled
                      >
                        <option value={"false"}>Не одобрен</option>
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
                        <label className="form-check-label" htmlFor="agreement">
                          Согласиться с условиями и правилами
                        </label>
                      </div>
                      <ErrorMessage
                        name={"agreement"}
                        className={css.invalidMessage}
                        component="div"
                      />
                    </div>
                    <div className="col-12">
                      <MainButton
                        title={"Зарегистрироваться"}
                        type={"submit"}
                        disabled={!(formik.isValid && formik.dirty)}
                      />
                    </div>
                  </Form>
                )}
              </>
            )}

            {officerIsCreated && isRegistered && (
              <Modal
                title={"Пользователь создан"}
                paragraph={"Регистрация успешно пройдена"}
                titleSecondaryButton={"Главная страница"}
                titleMainButton={"Войти"}
                onClickSecondaryButton={handleCLickModalSecondaryButton}
                onClickMainButton={handleCLickModalMainButton}
                isSecondaryButtonShown={true}
              />
            )}
          </div>
        );
      }}
    </Formik>
  );
};

export default connect(
  (state) => {
    return {
      messageAuthorization: state.authorizationReducer.message,
      messageOfficers: state.officersReducer.message,
      isLoading: state.authorizationReducer.isLoading,
      isRegistered: state.authorizationReducer.isRegistered,
      officerIsCreated: state.officersReducer.officerIsCreated,
    };
  },
  (dispatch) => {
    return {
      signUp: (values) => dispatch(signUp(values)),
      getAllOfficers: () => dispatch(getAllOfficers()),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
      handleClickModalButton: () => dispatch(handleClickModalButton()),
    };
  }
)(Registration);
