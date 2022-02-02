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
      setIsClickedPassword(false);
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
            firstName: someOfficer.firstName,
            lastName: someOfficer.lastName,
            password: someOfficer.password,
            approved: someOfficer.approved,
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().max(15, "Must be 15 characters or less"),
            lastName: Yup.string().max(20, "Must be 20 characters or less"),
            password: Yup.string()
                .min(3, "Password must be longer than 3 characters")
                .max(12, "Password must be shorter than 12 characters")
                .required("Required"),
            approved: Yup.boolean(),
          })}
          onSubmit={(values) => {
            editOfficer(someOfficer._id, values);
          }}
      >
        {(formik) => {
          return (
              <div className={css.wrapper}>
                <img src={officer} className={css.img} />
                <Form>
                  <table className={`table table-hover ${css.table}`}>
                    <tbody>
                    <tr>
                      <td className={css.cell1}>First Name</td>
                      <td className={css.cell2}>
                        {!isClickedFirstName ? (
                            <FormSpan name="firstName" />
                        ) : (
                            <Field
                                type="text"
                                name="firstName"
                                className="form-control"
                                // id="editFirstName"
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

                    <tr>
                      <td className={css.cell1}>Last Name</td>
                      <td className={css.cell2}>
                        {!isClickedLastName ? (
                            <FormSpan name="lastName" />
                        ) : (
                            <Field
                                type="text"
                                name="lastName"
                                className="form-control"
                                id="editLastName"
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

                    <tr>
                      <td className={css.cell1}>E-mail</td>
                      <td className={css.cell2}>
                        {someOfficer && someOfficer.email}
                      </td>
                      <td></td>
                    </tr>

                    <tr>
                      <td className={css.cell1}>Password</td>
                      <td className={css.cell2}>
                        {!isClickedPassword ? (
                            <FormSpan name="password" />
                        ) : (
                            <Field
                                type="text"
                                name={"password"}
                                className="form-control"
                                id="editPassword"
                                placeholder={"Please write password"}
                                onKeyPress={handleKeyPress}
                            />
                        )}
                        <ErrorMessage
                            component="div"
                            name="password"
                            className={css.invalidMessage}
                        />
                      </td>
                      <td className={css.cellIcon}>
                        <button type="button" className={css.btnEdit}>
                          <img src={editIcon} onClick={handleClickPassword} />
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className={css.cell1}>Client ID</td>
                      <td className={css.cell2}>
                        {someOfficer && someOfficer.clientId}
                      </td>
                      <td></td>
                    </tr>

                    <tr>
                      <td className={css.cell1}>Approved</td>
                      <td className={css.cell2}>
                        <div className="form-check form-switch">
                          <Field
                              className="form-check-input"
                              type="checkbox"
                              name={"approved"}
                              id="flexSwitchCheckChecked"
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
