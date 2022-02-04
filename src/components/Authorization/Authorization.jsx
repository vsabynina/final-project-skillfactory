import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import css from "./Authorization.module.css";
import { connect } from "react-redux";
import { auth, signIn } from "../../store/reducers/authorizationReducer";

const Authorization = (props) => {
  const { signIn, auth, error, setToken, token } = props;
  return (
    <Formik
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
        auth();
        // setToken(token);
      }}
    >
      {(formik) => {
        return (
          <div className={css.wrapper}>
            <Form className="needs-validation">
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
                  className={css.invalidMessage}
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
                  autoComplete="current-password"
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name={"password"}
                  className={css.invalidMessage}
                  component="div"
                />
                <div className={css.invalidMessage}>{error}</div>
              </div>

              <button
                type="submit"
                className={`btn btn-primary ${css.button}`}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Войти
              </button>
              <Link to="/auth/sign_up" className={`nav-link ${css.a}`}>
                У вас нет аккаунта?
              </Link>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default connect(
  (state) => {
    return {
      error: state.casesReducer.error,
      token: state.authorizationReducer.token,
    };
  },
  (dispatch) => {
    return {
      signIn: (values) => dispatch(signIn(values)),
      auth: () => dispatch(auth()),
    };
  }
)(Authorization);
