import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import css from "./CaseDetailPage.module.css";
import bicycle from "../../assets/icons/bicycleIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import { getAllOfficers } from "../../store/reducers/officersReducer";
import { editCase, getOneCase } from "../../store/reducers/casesReducer";

const CaseDetailPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    officers,
    getAllOfficers,
    editCase,
    bicycleType,
    caseStatus,
    getOneCase,
    someCase,
  } = props;

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
    getOneCase(id);
  }, [dispatch, id]);

  useEffect(() => {
    getAllOfficers();
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        status: someCase.status || "",
        licenseNumber: someCase.licenseNumber || "",
        ownerFullName: someCase.ownerFullName || "",
        type: someCase.type || "",
        color: someCase.color || "",
        officer: someCase.officer || "",
        description: someCase.description || "",
        resolution: someCase.resolution || "",
      }}
      validationSchema={Yup.object({
        status: Yup.string(),
        licenseNumber: Yup.string().required("This field is required"),
        ownerFullName: Yup.string().required("This field is required"),
        type: Yup.string().nullable(),
        color: Yup.string().nullable(),
        officer: Yup.string().nullable(),
        description: Yup.string().nullable(),
        resolution: Yup.string()
          .nullable()
          .when("status", {
            is: (value) => value === "done",
            then: Yup.string().nullable().required("This field is required"),
          }),
      })}
      onSubmit={(values) => {
        editCase(someCase._id, values);
        setIsClickedStatus(false);
        setIsClickedLicenseNumber(false);
        setIsClickedOwnerFullName(false);
        setIsClickedColor(false);
        setIsClickedType(false);
        setIsClickedOfficer(false);
        setIsClickedDescription(false);
        setIsClickedResolution(false);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          caseStatus && (
            <div className={css.wrapper}>
              <Form className={css.form}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">
                        <img src={bicycle} />
                      </th>
                      <th colSpan="2" className={css.thTextAlign}>
                        <p className={css.p}>
                          Message was created on{" "}
                          {new Date(someCase.createdAt).toLocaleDateString()} at{" "}
                          {new Date(someCase.createdAt).toLocaleTimeString()}
                        </p>
                        {someCase && (
                          <p className={css.p}>
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
                          (values.status === "new" && "New") ||
                          (values.status === "in_progress" && "In progress") ||
                          (values.status === "done" && "Done")
                        ) : (
                          <Field
                            as="select"
                            className="form-select"
                            name="status"
                          >
                            <option value="DEFAULT" disabled>
                              Choose...
                            </option>
                            {caseStatus &&
                              caseStatus.map((item, index) => {
                                return (
                                  <option value={item.value} key={index}>
                                    {item.title}
                                  </option>
                                );
                              })}
                          </Field>
                        )}
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img src={editIcon} onClick={handleClickStatus} />
                        </button>
                      </td>
                    </tr>

                    {values.status === "done" ? (
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
                              placeholder="Please describe how case was solved"
                            />
                          ) : (
                            values.resolution
                          )}
                          <ErrorMessage
                            name={"resolution"}
                            component="div"
                            className={css.invalidMessage}
                          />
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
                          values.licenseNumber
                        ) : (
                          <Field
                            type="text"
                            name={"licenseNumber"}
                            className="form-control"
                            placeholder={"Please write license number"}
                            onKeyPress={handleKeyPress}
                          />
                        )}
                        <ErrorMessage
                          name={"licenseNumber"}
                          component="div"
                          className={css.invalidMessage}
                        />
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
                          values.ownerFullName
                        ) : (
                          <Field
                            type="text"
                            name={"ownerFullName"}
                            className="form-control"
                            placeholder={"Please write owner full name"}
                          />
                        )}
                        <ErrorMessage
                          name={"ownerFullName"}
                          component="div"
                          className={css.invalidMessage}
                        />
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
                          (values.type === "general" && "General") ||
                          (values.type === "sport" && "Sport")
                        ) : (
                          <Field
                            as="select"
                            className="form-select"
                            name="type"
                          >
                            <option value="DEFAULT" disabled>
                              Choose...
                            </option>
                            {bicycleType &&
                              bicycleType.map((item, index) => {
                                return (
                                  <option value={item.value} key={index}>
                                    {item.title}
                                  </option>
                                );
                              })}
                          </Field>
                        )}
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
                          values.color
                        ) : (
                          <Field
                            type="text"
                            name={"color"}
                            className="form-control"
                            placeholder={"Please write bicycle color"}
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
                          values.officer
                        ) : (
                          <Field
                            as="select"
                            className="form-select"
                            name="officer"
                          >
                            <option value="">Choose...</option>
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
                          values.description
                        ) : (
                          <Field
                            as="textarea"
                            className="form-control"
                            name={"description"}
                            placeholder="Please describe the case"
                          />
                        )}
                      </td>
                      <td className={css.cellIcon}>
                        <button className={css.btnEdit} type={"button"}>
                          <img
                            src={editIcon}
                            onClick={handleClickDescription}
                          />
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
          )
        );
      }}
    </Formik>
  );
};
export default connect(
  (state) => {
    return {
      officers: state.officersReducer.officers,
      someCase: state.casesReducer.case,
      caseStatus: state.casesReducer.bicycle.caseStatus,
      bicycleType: state.casesReducer.bicycle.bicycleType,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      getOneCase: (id) => dispatch(getOneCase(id)),
      editCase: (id, values) => dispatch(editCase(id, values)),
    };
  }
)(CaseDetailPage);
