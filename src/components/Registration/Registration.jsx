import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Registration.module.css";
import SuccessfulRegistration from "../SuccessfulAuthorization/SuccessfulRegistration";
import { signUp } from "../../store/reducers/authorizationReducer";
import { connect } from "react-redux";
import {
  createOfficer,
  getAllOfficers,
} from "../../store/reducers/officersReducer";

const Registration = (props) => {
  const [isCompleted, setIsCompleted] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsCompleted(!isCompleted);
  // };

  const { signUp, createOfficer, error, getAllOfficers } = props;

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
          "You must agree before submitting"
        ),
      })}
      onSubmit={(values) => {
        signUp(values);
        createOfficer(values);
        // getAllOfficers();
        // !error ? setIsCompleted(true) : setIsCompleted(false);
      }}
    >
      {(formik) => {
        return (
          <div className={css.wrapper}>
            <Form className="row g-3 needs-validation">
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
              <div>{error}</div>

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
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Зарегистрироваться
                </button>
              </div>
            </Form>

            {isCompleted ? <SuccessfulRegistration /> : null}
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
    };
  },
  (dispatch) => {
    return {
      signUp: (values) => dispatch(signUp(values)),
      createOfficer: (values) => dispatch(createOfficer(values)),
      getAllOfficers: () => dispatch(getAllOfficers()),
    };
  }
)(Registration);
