import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./CaseDetailPage.module.css";
import bicycle from "../../assets/icons/bicycle.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import { success, failure, request } from "../../store/actions";
import { getAllOfficers } from "../../store/reducers/officersReducer";
import { editCase } from "../../store/reducers/casesReducer";
import FormSpan from "../../FormSpan";

const CaseDetailPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { officers, getAllOfficers, editCase, cases } = props;
  const [someCase, setSomeCase] = useState({});

  const [isClickedStatus, setIsClickedStatus] = useState(false);
  const [isClickedLicenseNumber, setIsClickedLicenseNumber] = useState(false);
  const [isClickedOwnerFullName, setIsClickedOwnerFullName] = useState(false);
  const [isClickedType, setIsClickedType] = useState(false);
  const [isClickedColor, setIsClickedColor] = useState(false);
  const [isClickedOfficer, setIsClickedOfficer] = useState(false);
  const [isClickedDescription, setIsClickedDescription] = useState(false);
  const [isClickedResolution, setIsClickedResolution] = useState(false);

  const handleClickStatus = () => {
    setIsClickedStatus(!isClickedStatus);
  };
  const handleClickLicenseNumber = () => {
    setIsClickedLicenseNumber(!isClickedLicenseNumber);
  };
  const handleClickOwnerFullName = () => {
    setIsClickedOwnerFullName(!isClickedOwnerFullName);
  };
  const handleClickType = () => {
    setIsClickedType(!isClickedType);
  };
  const handleClickColor = () => {
    setIsClickedColor(!isClickedColor);
  };
  const handleClickOfficer = () => {
    setIsClickedOfficer(!isClickedOfficer);
  };
  const handleClickDescription = () => {
    setIsClickedDescription(!isClickedDescription);
  };
  const handleClickResolution = () => {
    setIsClickedResolution(!isClickedResolution);
  };

  // const handleChange = (e) => {
  //   const fieldName = e.target.name;
  //   setSomeCase({ ...someCase, [fieldName]: e.target.value });
  //   setIsClickedStatus(false);
  //   setIsClickedType(false);
  //   setIsClickedOfficer(false);
  // };

  // const handleSave = (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     editCase(someCase._id, someCase);
  // };

  const handleKeyPress = (e) => {
    e = e || window.event;
    if (e.which === 13 || e.keyCode === 13) {
      setIsClickedLicenseNumber(false);
      setIsClickedOwnerFullName(false);
      setIsClickedColor(false);
      setIsClickedDescription(false);
      setIsClickedResolution(false);
    }
  };

  useEffect(() => {
    dispatch(request());
    axios
        .get(`https://sf-final-project.herokuapp.com/api/cases/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((data) => {
          setSomeCase(data.data.data);
          dispatch(success());
        })
        .catch((error) => dispatch(failure(error)));
  }, [dispatch, id, cases]);

  useEffect(() => {
    getAllOfficers();
  }, []);

  return (
      <Formik
          enableReinitialize={true}
          initialValues={{
            status: someCase.status,
            licenseNumber: someCase.licenseNumber,
            ownerFullName: someCase.ownerFullName,
            type: someCase.type,
            color: someCase.color,
            officer: someCase.officer,
            description: someCase.description,
            resolution: someCase.resolution,
          }}
          validationSchema={Yup.object({
            status: Yup.string(),
            licenseNumber: Yup.string(),
            ownerFullName: Yup.string(),
            type: Yup.string(),
            color: Yup.string(),
            officer: Yup.string(),
            description: Yup.string(),
            resolution: Yup.string().required("This field must be filled"),
          })}
          onSubmit={({ values }) => {
            editCase(someCase._id, values);
          }}
      >
        {(formik) => {
          return (
              <div className={css.wrapper}>
                <Form className={css.form}>
                  <table className="table table-hover">
                    <thead>
                    <tr>
                      <th scope="col">
                        <img src={bicycle} />
                      </th>
                      <th colSpan="2" className={css.thTextAlign}>
                        {someCase && (
                            <p className={css.p}>
                              Message was created on{" "}
                              {new Date(someCase.createdAt).toLocaleDateString()} at{" "}
                              {new Date(someCase.createdAt).toLocaleTimeString()}
                            </p>
                        )}
                        {someCase && (
                            <p>
                              {!someCase.updatedAt
                                  ? "Message was not edited"
                                  : `Message was edited on ${new Date(
                                      someCase.updatedAt
                                  ).toLocaleDateString()} at ${new Date(
                                      someCase.updatedAt
                                  ).toLocaleTimeString()}`}
                            </p>
                        )}
                      </th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                      <td className={css.cell1}>Status</td>
                      <td className={css.cell2}>
                        {!isClickedStatus ? (
                            <FormSpan name={"status"} />
                        ) : (
                            <Field
                                as="select"
                                className="form-select"
                                id="editStatus"
                                name="status"
                            >
                              <option value="DEFAULT" disabled>
                                Choose...
                              </option>
                              <option value={"new"}>New</option>
                              <option value={"in_progress"}>In progress</option>
                              <option value={"done"}>Done</option>
                            </Field>
                        )}
                        <ErrorMessage name={"status"} />
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img src={editIcon} onClick={handleClickStatus} />
                        </button>
                      </td>
                    </tr>

                    {someCase && someCase.status === "done" ? (
                        <tr>
                          <td className={css.cell1}>Resolution</td>
                          <td className={css.cell2}>
                            {!isClickedResolution &&
                            someCase &&
                            !someCase.resolution ? (
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    name={"resolution"}
                                    id="editResolution"
                                    placeholder="Please describe how case was solved"
                                />
                            ) : (
                                <FormSpan name={"resolution"} />
                            )}
                            <ErrorMessage name={"resolution"} />
                          </td>
                          <td className={css.cellIcon}>
                            <button
                                className={css.btnEdit}
                                onClick={handleClickResolution}
                                type={"button"}
                            >
                              <img src={editIcon} />
                            </button>
                          </td>
                        </tr>
                    ) : null}

                    <tr>
                      <td className={css.cell1}>License number</td>
                      <td className={css.cell2}>
                        {!isClickedLicenseNumber ? (
                            <FormSpan name={"licenseNumber"} />
                        ) : (
                            <Field
                                type="text"
                                name={"licenseNumber"}
                                className="form-control"
                                id="editLicenseNumber"
                                placeholder={"Please write license number"}
                                onKeyPress={handleKeyPress}
                            />
                        )}
                        <ErrorMessage name={"licenseNumber"} />
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img
                              src={editIcon}
                              onClick={handleClickLicenseNumber}
                          />
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className={css.cell1}>Owner full name</td>
                      <td className={css.cell2}>
                        {!isClickedOwnerFullName ? (
                            <FormSpan name={"ownerFullName"} />
                        ) : (
                            <Field
                                type="text"
                                name={"ownerFullName"}
                                className="form-control"
                                placeholder={"Please write owner full name"}
                                id="editOwnerFullName"
                            />
                        )}
                        <ErrorMessage name={"ownerFullName"} />
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img
                              src={editIcon}
                              onClick={handleClickOwnerFullName}
                          />
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className={css.cell1}>Type</td>
                      <td className={css.cell2}>
                        {!isClickedType ? (
                            <FormSpan name={"type"} />
                        ) : (
                            <Field
                                as="select"
                                className="form-select"
                                id="editType"
                                name="type"
                                value={""}
                            >
                              <option value="DEFAULT" disabled>
                                Choose...
                              </option>
                              <option value={"general"}>General</option>
                              <option value={"sport"}>Sport</option>
                            </Field>
                        )}
                        <ErrorMessage name={"type"} />
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img src={editIcon} onClick={handleClickType} />
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className={css.cell1}>Color</td>
                      <td className={css.cell2}>
                        {!isClickedColor ? (
                            <FormSpan name={"color"} />
                        ) : (
                            <Field
                                type="text"
                                name={"color"}
                                className="form-control"
                                placeholder={"Please write bicycle color"}
                                id="editColor"
                            />
                        )}
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img src={editIcon} onClick={handleClickColor} />
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className={css.cell1}>Officer</td>
                      <td className={css.cell2}>
                        {!isClickedOfficer ? (
                            <FormSpan name={"officer"} />
                        ) : (
                            // someCase.officer
                            <Field
                                as="select"
                                className="form-select"
                                id="editOfficers"
                                name="officer"
                                value={""}
                            >
                              <option value="DEFAULT" disabled>
                                Choose...
                              </option>
                              {officers
                                  .filter((officer) => officer.approved)
                                  .map((officer, index) => {
                                    return (
                                        <option
                                            key={officer._id}
                                            value={
                                              !officer.firstName || !officer.lastName
                                                  ? `Officer ${index + 1}`
                                                  : `${officer.firstName} ${officer.lastName}`
                                            }
                                        >
                                          {!officer.firstName || !officer.lastName
                                              ? `Officer ${index + 1}`
                                              : `${officer.firstName} ${officer.lastName}`}
                                        </option>
                                    );
                                  })}
                            </Field>
                        )}
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img src={editIcon} onClick={handleClickOfficer} />
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td className={css.cell1}>Description</td>
                      <td className={css.cell2}>
                        {!isClickedDescription ? (
                            <FormSpan name={"description"} />
                        ) : (
                            <Field
                                as="textarea"
                                className="form-control"
                                name={"description"}
                                id="editDescription"
                                placeholder="Please describe the case"
                            />
                        )}
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img src={editIcon} onClick={handleClickDescription} />
                        </button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div className={css.btnWrapper}>
                    <button
                        type="submit"
                        className={`btn btn-outline-primary ${css.btnSave}`}
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
      return {
        officers: state.officersReducer.officers,
        cases: state.casesReducer.cases,
      };
    },
    (dispatch) => {
      return {
        getAllOfficers: () => dispatch(getAllOfficers()),
        editCase: (id, values) => dispatch(editCase(id, values)),
      };
    }
)(CaseDetailPage);
