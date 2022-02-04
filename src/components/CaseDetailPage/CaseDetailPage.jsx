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
        licenseNumber: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        ownerFullName: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        type: Yup.string().nullable(),
        color: Yup.string().nullable(),
        officer: Yup.string().nullable(),
        description: Yup.string().nullable(),
        resolution: Yup.string()
          .nullable()
          .when("status", {
            is: (value) => value === "done",
            then: Yup.string()
              .nullable()
              .required("Это поле обязательно для заполнения"),
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
                          Сообщение было создано{" "}
                          {new Date(someCase.createdAt).toLocaleDateString()} в{" "}
                          {new Date(someCase.createdAt).toLocaleTimeString()}
                        </p>
                        {someCase && (
                          <p className={css.p}>
                            {!someCase.updatedAt
                              ? "Сообщение не редактировалось"
                              : `Сообщение было отредактировано ${new Date(
                                  someCase.updatedAt
                                ).toLocaleDateString()} в ${new Date(
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
                          (values.status === "new" && "Открыто") ||
                          (values.status === "in_progress" && "В процессе") ||
                          (values.status === "done" && "Завершено")
                        ) : (
                          <Field
                            as="select"
                            className="form-select"
                            name="status"
                          >
                            <option value="DEFAULT" disabled>
                              Выберите...
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
                        <td className={css.cell1}>Решение</td>
                        <td className={css.cell2}>
                          {!isClickedResolution &&
                          someCase &&
                          !someCase.resolution ? (
                            <Field
                              as="textarea"
                              className="form-control"
                              name={"resolution"}
                              placeholder="Опишите как был решён случай"
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
                      <td className={css.cell1}>Лицензионный номер</td>
                      <td className={css.cell2}>
                        {!isClickedLicenseNumber ? (
                          values.licenseNumber
                        ) : (
                          <Field
                            type="text"
                            name={"licenseNumber"}
                            className="form-control"
                            placeholder={"Введите ицензионный номер"}
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
                      <td className={css.cell1}>ФИО владельца</td>
                      <td className={css.cell2}>
                        {!isClickedOwnerFullName ? (
                          values.ownerFullName
                        ) : (
                          <Field
                            type="text"
                            name={"ownerFullName"}
                            className="form-control"
                            placeholder={"Введите ФИО владельца"}
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
                      <td className={css.cell1}>Тип</td>
                      <td className={css.cell2}>
                        {!isClickedType ? (
                          (values.type === "general" && "Обычный") ||
                          (values.type === "sport" && "Спортивный")
                        ) : (
                          <Field
                            as="select"
                            className="form-select"
                            name="type"
                          >
                            <option value="DEFAULT" disabled>
                              Выберите...
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
                      <td className={css.cell1}>Цвет</td>
                      <td className={css.cell2}>
                        {!isClickedColor ? (
                          values.color
                        ) : (
                          <Field
                            type="text"
                            name={"color"}
                            className="form-control"
                            placeholder={"Напишите цвет велосипеда"}
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
                      <td className={css.cell1}>Сотрудник</td>
                      <td className={css.cell2}>
                        {!isClickedOfficer ? (
                          `${
                            officers.find(
                              (officer) => officer._id === values.officer
                            ).firstName
                          } ${
                            officers.find(
                              (officer) => officer._id === values.officer
                            ).lastName
                          }`
                        ) : (
                          <Field
                            as="select"
                            className="form-select"
                            name="officer"
                          >
                            <option value="">Выберите...</option>
                            {officers
                              .filter((officer) => officer.approved)
                              .map((officer, index) => {
                                return (
                                  <option key={officer._id} value={officer._id}>
                                    {!officer.firstName || !officer.lastName
                                      ? `Сотрудник ${index + 1}`
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
                      <td className={css.cell1}>Описание</td>
                      <td className={css.cell2}>
                        {!isClickedDescription ? (
                          values.description
                        ) : (
                          <Field
                            as="textarea"
                            className="form-control"
                            name={"description"}
                            placeholder="Опишите случай"
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
                    Сохранить изменения
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
