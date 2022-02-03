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
import FormSpan from "../../FormSpan";
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
        firstName: Yup.string().max(15, "Must be 15 characters or less"),
        lastName: Yup.string().max(20, "Must be 20 characters or less"),
        oldPassword: Yup.string(),
        newPassword: Yup.string().when((isClickedPassword, schema) => {
          if (isClickedPassword)
            return schema
              .min(3, "Password must be longer than 3 characters")
              .max(12, "Password must be shorter than 12 characters")
              .required("Required");
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
                    <td className={css.cell1}>First Name</td>
                    <td className={css.cell2}>
                      {!isClickedFirstName ? (
                        values.firstName
                      ) : (
                        <Field
                          type="text"
                          name="firstName"
                          className="form-control"
                          placeholder={"Please write first name"}
                          onKeyPress={handleKeyPress}
                        />
                      )}
                      <ErrorMessage
                        component="div"
                        name="firstName"
                        className={css.invalidMessage}
                      />
                    </td>
                    <td className={css.cellIcon}>
                      <button type="button" className={css.btnEdit}>
                        <img src={editIcon} onClick={handleClickFirstName} />
                      </button>
                    </td>
                  </tr>

                  <tr className={css.row}>
                    <td className={css.cell1}>Last Name</td>
                    <td className={css.cell2}>
                      {!isClickedLastName ? (
                        values.lastName
                      ) : (
                        <Field
                          type="text"
                          name="lastName"
                          className="form-control"
                          placeholder={"Please write last name"}
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
                      <td className={css.cell1}>Old password</td>
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
                      <td className={css.cell1}>New password</td>
                      <td className={css.cell2}>
                        <Field
                          type="password"
                          name={"newPassword"}
                          className="form-control"
                          placeholder={"Please write new password"}
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
                      <td className={css.cell1}>Confirm new password</td>
                      <td className={css.cell2}>
                        <Field
                          type="password"
                          name={"passwordConfirmation"}
                          className="form-control"
                          placeholder={"Please repeat new password"}
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
                    <td className={css.cell1}>Client ID</td>
                    <td className={css.cell2}>{someOfficer.clientId}</td>
                    <td></td>
                  </tr>

                  <tr className={css.row}>
                    <td className={css.cell1}>Approved</td>
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
                  Save changes
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
