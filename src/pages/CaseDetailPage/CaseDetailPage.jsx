import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import css from "./CaseDetailPage.module.css";
import bicycle from "../../assets/icons/bicycleIcon.svg";
import { getAllOfficers } from "../../store/reducers/officersReducer";
import { editCase, getOneCase } from "../../store/reducers/casesReducer";
import SecondaryButton from "../../components/SecondaryButton";
import EditButton from "../../components/EditButton/EditButton";
import editIcon from "../../assets/icons/editIcon.svg";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";
import { handleClickMessageButton } from "../../store/reducers/casesReducer";

const CaseDetailPage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    officers,
    getAllOfficers,
    editCase,
    bicycleType,
    caseStatus,
    getOneCase,
    someCase,
    isLoading,
    message,
    handleClickMessageButton,
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

  const handleClickMessage = () => {
    navigate(`/cases`);
    handleClickMessageButton();
  };

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
          <div className={css.wrapper}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {message ? (
                  <Message message={message} onClick={handleClickMessage} />
                ) : (
                  <Form className={css.form}>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">
                            <img src={bicycle} alt={"Bicycle"} />
                          </th>
                          <th colSpan="2" className={css.thTextAlign}>
                            <p className={css.p}>
                              Сообщение было создано{" "}
                              {new Date(
                                someCase.createdAt
                              ).toLocaleDateString()}{" "}
                              в{" "}
                              {new Date(
                                someCase.createdAt
                              ).toLocaleTimeString()}
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
                        <tr onClick={handleClickStatus}>
                          <td className={css.cell1}>Status</td>
                          <td className={css.cell2}>
                            {!isClickedStatus ? (
                              (values.status === "new" && "Открыто") ||
                              (values.status === "in_progress" &&
                                "В процессе") ||
                              (values.status === "done" && "Завершено")
                            ) : (
                              <Field
                                as="select"
                                className="form-select"
                                name="status"
                                onClick={(e) => e.stopPropagation()}
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
                        </tr>

                        {values.status === "done" ? (
                          <tr onClick={handleClickResolution}>
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
                                  onClick={(e) => e.stopPropagation()}
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
                          </tr>
                        ) : null}

                        <tr onClick={handleClickLicenseNumber}>
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
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            <ErrorMessage
                              name={"licenseNumber"}
                              component="div"
                              className={css.invalidMessage}
                            />
                          </td>
                        </tr>

                        <tr onClick={handleClickOwnerFullName}>
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
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            <ErrorMessage
                              name={"ownerFullName"}
                              component="div"
                              className={css.invalidMessage}
                            />
                          </td>
                        </tr>

                        <tr onClick={handleClickType}>
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
                                onClick={(e) => e.stopPropagation()}
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
                        </tr>

                        <tr onClick={handleClickColor}>
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
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                          </td>
                        </tr>

                        <tr onClick={handleClickOfficer}>
                          <td className={css.cell1}>Сотрудник</td>
                          <td className={css.cell2}>
                            {!isClickedOfficer ? (
                              officers.find(
                                (officer) => officer._id === values.officer
                              ) &&
                              `${
                                !officers.find(
                                  (officer) => officer._id === values.officer
                                ).firstName
                                  ? "Сотрудник"
                                  : officers.find(
                                      (officer) =>
                                        officer._id === values.officer
                                    ).firstName
                              } ${
                                !officers.find(
                                  (officer) => officer._id === values.officer
                                ).lastName
                                  ? officers.find(
                                      (officer) =>
                                        officer._id === values.officer
                                    )._id
                                  : officers.find(
                                      (officer) =>
                                        officer._id === values.officer
                                    ).lastName
                              }`
                            ) : (
                              <Field
                                as="select"
                                className="form-select"
                                name="officer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value="">Выберите...</option>
                                {officers
                                  .filter((officer) => officer.approved)
                                  .map((officer) => {
                                    return (
                                      <option
                                        key={officer._id}
                                        value={officer._id}
                                      >
                                        {!officer.firstName || !officer.lastName
                                          ? `Сотрудник ${officer._id}`
                                          : `${officer.firstName} ${officer.lastName}`}
                                      </option>
                                    );
                                  })}
                              </Field>
                            )}
                          </td>
                        </tr>

                        <tr onClick={handleClickDescription}>
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
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={css.btnWrapper}>
                      <SecondaryButton
                        title={"Сохранить изменения"}
                        type="submit"
                        className={css.btnSave}
                        disabled={!(formik.isValid && formik.dirty)}
                      />
                    </div>
                  </Form>
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
      officers: state.officersReducer.officers,
      someCase: state.casesReducer.case,
      caseStatus: state.casesReducer.bicycle.caseStatus,
      bicycleType: state.casesReducer.bicycle.bicycleType,
      isLoading: state.casesReducer.isLoading,
      message: state.casesReducer.message,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      getOneCase: (id) => dispatch(getOneCase(id)),
      editCase: (id, values) => dispatch(editCase(id, values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(CaseDetailPage);