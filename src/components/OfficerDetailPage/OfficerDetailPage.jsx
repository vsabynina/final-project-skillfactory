import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import css from "./OfficerDetailPage.module.css";
import officer from "../../assets/images/officer.jpeg";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { failure, request, success } from "../../store/actions";
import axios from "axios";
import editIcon from "../../assets/icons/editIcon.svg";
import cancelIcon from "../../assets/icons/cancelIcon.svg";
import {
  editOfficer,
  getAllOfficers,
} from "../../store/reducers/officersReducer";

const OfficerDetailPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { editOfficer } = props;
  const [someOfficer, setSomeOfficer] = useState({});

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
    dispatch(request());
    axios
      .get(`https://sf-final-project.herokuapp.com/api/officers/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setSomeOfficer(data.data.data);
        dispatch(success());
      })
      .catch((error) => dispatch(failure(error)));
  }, [dispatch, id]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: someOfficer.firstName || "",
        lastName: someOfficer.lastName || "",
        oldPassword: someOfficer.password || "",
        newPassword: "",
        passwordConfirmation: "",
        approved: someOfficer.approved || "",
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
              .max(12, "Password must be shorter than 12 characters")
              .required("Это поле обязательно для заполнения");
        }),
        passwordConfirmation: Yup.string()
          .when("password", (isClickedPassword, schema) => {
            if (isClickedPassword)
              return schema.required(
                "Confirm password is required when setting new password"
              );
          })
          .oneOf([Yup.ref(" newPassword")], "Passwords must match"),
        approved: Yup.boolean(),
      })}
      onSubmit={(values) => {
        editOfficer(someOfficer._id, values);
        setIsClickedFirstName(false);
        setIsClickedLastName(false);
        setIsClickedPassword(false);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <div className={css.wrapper}>
            <img src={officer} className={css.img} />
            <Form>
              <table className={`table table-hover ${css.table}`}>
                <tbody>
                  <tr className={css.row}>
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
                        />
                      )}
                      <ErrorMessage
                        className={css.invalidMessage}
                        component="div"
                        name="firstName"
                      />
                    </td>
                    <td className={css.cellIcon}>
                      <button type="button" className={css.btnEdit}>
                        <img src={editIcon} onClick={handleClickFirstName} />
                      </button>
                    </td>
                  </tr>

                  <tr className={css.row}>
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
                        />
                      )}
                      <ErrorMessage
                        component="div"
                        name="lastName"
                        className={css.invalidMessage}
                      />
                    </td>
                    <td className={css.cellIcon}>
                      <button type="button" className={css.btnEdit}>
                        <img src={editIcon} onClick={handleClickLastName} />
                      </button>
                    </td>
                  </tr>

                  <tr className={css.row}>
                    <td className={css.cell1}>E-mail</td>
                    <td className={css.cell2}>{someOfficer.email}</td>
                    <td></td>
                  </tr>

                  {!isClickedPassword && (
                    <tr className={css.row}>
                      <td className={css.cell1}>Старый пароль</td>
                      <td className={css.cell2}>
                        <Field
                          as={"textarea"}
                          type="text"
                          name={"oldPassword"}
                          className={css.oldPasswordTextarea}
                          onKeyPress={handleKeyPress}
                          disabled={true}
                          readOnly={true}
                        />
                      </td>
                      <td className={css.cellIcon}>
                        <button type="button" className={css.btnEdit}>
                          <img src={editIcon} onClick={handleClickPassword} />
                        </button>
                      </td>
                    </tr>
                  )}

                  {isClickedPassword && (
                    <tr className={css.row}>
                      <td className={css.cell1}>Новый пароль</td>
                      <td className={css.cell2}>
                        <Field
                          type="password"
                          name={"newPassword"}
                          className="form-control"
                          placeholder={"Введите новый пароль"}
                          onKeyPress={handleKeyPress}
                        />
                        <ErrorMessage
                          component="div"
                          name="newPassword"
                          className={css.invalidMessage}
                        />
                      </td>
                      <td className={css.cellIcon}>
                        <button type="button" className={css.btnEdit}>
                          <img src={cancelIcon} onClick={handleClickPassword} />
                        </button>
                      </td>
                    </tr>
                  )}

                  {isClickedPassword && (
                    <tr className={css.row}>
                      <td className={css.cell1}>Подтвердите новый пароль</td>
                      <td className={css.cell2}>
                        <Field
                          type="password"
                          name={"passwordConfirmation"}
                          className="form-control"
                          placeholder={"Повторно введите новый пароль"}
                          onKeyPress={handleKeyPress}
                        />
                        <ErrorMessage
                          component="div"
                          name="passwordConfirmation"
                          className={css.invalidMessage}
                        />
                      </td>
                      <td className={css.cellIcon}></td>
                    </tr>
                  )}

                  <tr className={css.row}>
                    <td className={css.cell1}>ID</td>
                    <td className={css.cell2}>{someOfficer.clientId}</td>
                    <td></td>
                  </tr>

                  <tr className={css.row}>
                    <td className={css.cell1}>Одобрен</td>
                    <td className={css.cell2}>
                      <div className="form-check form-switch">
                        <Field
                          className="form-check-input"
                          type="checkbox"
                          name={"approved"}
                        />
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className={css.btnWrapper}>
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Сохранить изменения
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
export default connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return {
      editOfficer: (id, values) => dispatch(editOfficer(id, values)),
    };
  }
)(OfficerDetailPage);
