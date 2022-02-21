import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import MainButton from "../../components/MainButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import Message from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActionsAuth, useActionsOfficer } from "../../hooks/useActions";
import css from "./Registration.module.css";
import { SignUp } from "../../store/types/authorization";
import { OfficerCreate } from "../../store/types/officers";

const Registration: React.FC = () => {
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
                          className="invalidMessage"
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
                          className="invalidMessage"
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
                          className="invalidMessage"
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
                          <label
                            className="form-check-label"
                            htmlFor="agreement"
                          >
                            Согласиться с условиями и правилами
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
                          title={"Зарегистрироваться"}
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
                title={"Пользователь создан"}
                paragraph={"Регистрация успешно пройдена"}
                titleSecondaryButton={"Главная страница"}
                titleMainButton={"Войти"}
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
