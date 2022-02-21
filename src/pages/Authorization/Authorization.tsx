import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import css from "./Authorization.module.css";
import MainButton from "../../components/MainButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import Message from "../../components/Message/Message";
import Modal from "../../components/Modal";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActionsAuth } from "../../hooks/useActions";
import { SignIn } from "../../store/types/authorization";

const Authorization: React.FC = () => {
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
          .email("Пожалуйста введите верный e-mail адрес")
          .required("Это поле обязательно для заполнения"),
        password: Yup.string()
          .min(3, "Пароль должен содержать больше 3 символов")
          .max(12, "Пароль должен содержать менее 12 символов")
          .required("Это поле обязательно для заполнения"),
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
                          E-mail
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name={"email"}
                          autoComplete="e-mail"
                          placeholder="name@example.com"
                        />
                        <ErrorMessage
                          name={"email"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                          Пароль
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          id="password"
                          name={"password"}
                          autoComplete="on"
                          placeholder="Пароль"
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
                        У вас нет аккаунта?
                      </Link>
                    </Form>
                  </div>
                )}
              </>
            )}

            {isAuthorized ? (
              <Modal
                title={"Выполнен вход в аккаунт"}
                paragraph={"Авторизация успешно пройдена"}
                titleMainButton={"Главная страница"}
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
