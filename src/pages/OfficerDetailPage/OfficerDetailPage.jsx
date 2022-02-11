import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import css from "./OfficerDetailPage.module.css";
import officerImage from "../../assets/images/officerImage.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  editOfficer,
  getOneOfficer,
} from "../../store/reducers/officersReducer";
import SecondaryButton from "../../components/SecondaryButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";
import { handleClickMessageButton } from "../../store/reducers/officersReducer";

const OfficerDetailPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    editOfficer,
    isLoading,
    message,
    getOneOfficer,
    officer,
    handleClickMessageButton,
  } = props;

  const [isClickedFirstName, setIsClickedFirstName] = useState(false);
  const [isClickedLastName, setIsClickedLastName] = useState(false);
  const [isClickedPassword, setIsClickedPassword] = useState(false);

  const handleClickFirstName = () => {
    setIsClickedFirstName(!isClickedFirstName);
  };
  const handleClickLastName = () => {
    setIsClickedLastName(!isClickedLastName);
  };
  const handleClickPassword = () => {
    setIsClickedPassword(!isClickedPassword);
  };

  const handleKeyPress = (e) => {
    e = e || window.event;
    if (e.which === 13 || e.keyCode === 13) {
      setIsClickedFirstName(false);
      setIsClickedLastName(false);
    }
  };

  useEffect(() => {
    getOneOfficer(id);
  }, [dispatch, id]);

  const handleClickMessage = () => {
    navigate(`/officers`);
    handleClickMessageButton();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: officer.firstName || "",
        lastName: officer.lastName || "",
        oldPassword: officer.password || "",
        newPassword: "",
        passwordConfirmation: "",
        approved: officer.approved || "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(
          15,
          "Это поле может содержать менее 15 символов"
        ),
        lastName: Yup.string().max(
          20,
          "Это поле может содержать менее 20 символов"
        ),
        oldPassword: Yup.string(),
        newPassword: Yup.string().when((isClickedPassword, schema) => {
          if (isClickedPassword)
            return schema
              .min(3, "Пароль должен содержать больше 3 символов")
              .max(12, "Пароль должен содержать меньше 12 символов")
              .required("Это поле обязательно для заполнения");
        }),
        passwordConfirmation: Yup.string()
          .when("password", (isClickedPassword, schema) => {
            if (isClickedPassword)
              return schema.required("Подтверждение нового пароля обязательно");
          })
          .oneOf([Yup.ref(" newPassword")], "Пароли должны быть одинаковыми"),
        approved: Yup.boolean(),
      })}
      onSubmit={(values) => {
        editOfficer(officer._id, values);
        setIsClickedFirstName(false);
        setIsClickedLastName(false);
        setIsClickedPassword(false);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <div className={css.wrapper}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {message ? (
                  <Message message={message} onClick={handleClickMessage} />
                ) : (
                  <>
                    <img
                      src={officerImage}
                      className={css.img}
                      alt={"Officer"}
                    />
                    <Form>
                      <table className={`table table-hover ${css.table}`}>
                        <tbody>
                          <tr
                            className={`${css.row} ${css.cursor}`}
                            onClick={handleClickFirstName}
                          >
                            <td className={css.cell1}>Имя</td>
                            <td className={css.cell2}>
                              {!isClickedFirstName ? (
                                values.firstName
                              ) : (
                                <Field
                                  type="text"
                                  name="firstName"
                                  className="form-control"
                                  placeholder={"Ваше имя"}
                                  onKeyPress={handleKeyPress}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                className={css.invalidMessage}
                                component="div"
                                name="firstName"
                              />
                            </td>
                          </tr>

                          <tr
                            className={`${css.row} ${css.cursor}`}
                            onClick={handleClickLastName}
                          >
                            <td className={css.cell1}>Фамилия</td>
                            <td className={css.cell2}>
                              {!isClickedLastName ? (
                                values.lastName
                              ) : (
                                <Field
                                  type="text"
                                  name="lastName"
                                  className="form-control"
                                  placeholder={"Ваша фамилия"}
                                  onKeyPress={handleKeyPress}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                component="div"
                                name="lastName"
                                className={css.invalidMessage}
                              />
                            </td>
                          </tr>

                          <tr className={css.row}>
                            <td className={css.cell1}>E-mail</td>
                            <td className={css.cell2}>{officer.email}</td>
                          </tr>

                          {!isClickedPassword && (
                            <tr
                              className={`${css.row} ${css.cursor}`}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>Пароль</td>
                              <td className={css.cell2}>
                                {!values.passwordConfirmation
                                  ? values.oldPassword
                                  : values.passwordConfirmation}
                              </td>
                            </tr>
                          )}

                          {isClickedPassword && (
                            <tr
                              className={`${css.row} ${css.cursor}`}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>Новый пароль</td>
                              <td className={css.cell2}>
                                <Field
                                  type="password"
                                  name={"newPassword"}
                                  className="form-control"
                                  placeholder={"Введите новый пароль"}
                                  onKeyPress={handleKeyPress}
                                  autoComplete="on"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="newPassword"
                                  className={css.invalidMessage}
                                />
                              </td>
                            </tr>
                          )}

                          {isClickedPassword && (
                            <tr
                              className={`${css.row} ${css.cursor}`}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>
                                Подтвердите новый пароль
                              </td>
                              <td className={css.cell2}>
                                <Field
                                  type="password"
                                  name={"passwordConfirmation"}
                                  className="form-control"
                                  placeholder={"Повторно введите новый пароль"}
                                  onKeyPress={handleKeyPress}
                                  autoComplete="on"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="passwordConfirmation"
                                  className={css.invalidMessage}
                                />
                              </td>
                            </tr>
                          )}

                          <tr className={css.row}>
                            <td className={css.cell1}>ID</td>
                            <td className={css.cell2}>{officer.clientId}</td>
                          </tr>

                          <tr className={`${css.row} ${css.cursor}`}>
                            <td className={css.cell1}>Одобрен</td>
                            <td className={css.cell2}>
                              <div className="form-check form-switch">
                                <Field
                                  className={`form-check-input ${css.cursor}`}
                                  type="checkbox"
                                  name={"approved"}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={css.btnWrapper}>
                        <SecondaryButton
                          title={"Сохранить изменения"}
                          type="submit"
                          disabled={!(formik.isValid && formik.dirty)}
                        />
                      </div>
                    </Form>
                  </>
                )}
              </>
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
      officer: state.officersReducer.officer,
      isLoading: state.officersReducer.isLoading,
      message: state.officersReducer.message,
    };
  },
  (dispatch) => {
    return {
      editOfficer: (id, values) => dispatch(editOfficer(id, values)),
      getOneOfficer: (id) => dispatch(getOneOfficer(id)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(OfficerDetailPage);