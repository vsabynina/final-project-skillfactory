import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import css from "./CaseDetailPage.module.css";
import bicycle from "../../assets/icons/bicycleIcon.svg";
import SecondaryButton from "../../components/SecondaryButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import Message from "../../components/Message/Message";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActionsCases, useActionsOfficer } from "../../hooks/useActions";
import { CaseEdit } from "../../store/types/cases";

const CaseDetailPage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { officers } = useTypedSelector((state) => state.officersReducer);
  const { someCase, isLoading, messageCase } = useTypedSelector(
    (state) => state.casesReducer
  );
  const { caseStatus, bicycleType } = useTypedSelector(
    (state) => state.casesReducer.bicycle
  );

  const { getAllOfficers } = useActionsOfficer();
  const { editCase, getOneCase, handleClickMessageButton } = useActionsCases();

  const [isClickedStatus, setIsClickedStatus] = useState(false);
  const [isClickedLicenseNumber, setIsClickedLicenseNumber] = useState(false);
  const [isClickedOwnerFullName, setIsClickedOwnerFullName] = useState(false);
  const [isClickedType, setIsClickedType] = useState(false);
  const [isClickedColor, setIsClickedColor] = useState(false);
  const [isClickedOfficer, setIsClickedOfficer] = useState(false);
  const [isClickedDescription, setIsClickedDescription] = useState(false);
  const [isClickedResolution, setIsClickedResolution] = useState(false);

  const handleClickStatus = () => {
    setIsClickedStatus((prevState) => !prevState);
  };
  const handleClickLicenseNumber = () => {
    setIsClickedLicenseNumber((prevState) => !prevState);
  };
  const handleClickOwnerFullName = () => {
    setIsClickedOwnerFullName((prevState) => !prevState);
  };
  const handleClickType = () => {
    setIsClickedType((prevState) => !prevState);
  };
  const handleClickColor = () => {
    setIsClickedColor((prevState) => !prevState);
  };
  const handleClickOfficer = () => {
    setIsClickedOfficer((prevState) => !prevState);
  };
  const handleClickDescription = () => {
    setIsClickedDescription((prevState) => !prevState);
  };
  const handleClickResolution = () => {
    setIsClickedResolution((prevState) => !prevState);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
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

  const getCurrentOfficer = (values: CaseEdit) => {
    return officers.find((officer) => officer._id === values.officer);
  };

  return (
    <Formik<CaseEdit>
      enableReinitialize={true}
      initialValues={{
        status: someCase?.status || "",
        licenseNumber: someCase?.licenseNumber || "",
        ownerFullName: someCase?.ownerFullName || "",
        type: someCase?.type || "",
        color: someCase?.color || "",
        officer: someCase?.officer || "",
        description: someCase?.description || "",
        resolution: someCase?.resolution || "",
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
            is: (value: string) => value === "done",
            then: Yup.string()
              .nullable()
              .required("Это поле обязательно для заполнения"),
          }),
      })}
      onSubmit={(values) => {
        editCase(someCase!._id, values);
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
          <>
            {isLoading || !someCase ? (
              <LoadingSpinner />
            ) : (
              <>
                {messageCase ? (
                  <Message message={messageCase} onClick={handleClickMessage} />
                ) : (
                  <div className={css.wrapper}>
                    <Form className={css.form}>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">
                              <img src={bicycle} alt={"Bicycle"} />
                            </th>

                            <th colSpan={2} className={css.thTextAlign}>
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
                          <tr onClick={handleClickStatus} className={"cursor"}>
                            <td className={css.cell1}>Статус</td>

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
                                  onClick={(
                                    e: React.MouseEvent<HTMLSelectElement>
                                  ) => e.stopPropagation()}
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

                          {values.status === "done" && (
                            <tr
                              onClick={handleClickResolution}
                              className={"cursor"}
                            >
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
                                    onClick={(
                                      e: React.MouseEvent<HTMLTextAreaElement>
                                    ) => e.stopPropagation()}
                                  />
                                ) : (
                                  values.resolution
                                )}
                                <ErrorMessage
                                  name={"resolution"}
                                  component="div"
                                  className="invalidMessage"
                                />
                              </td>
                            </tr>
                          )}

                          <tr
                            onClick={handleClickLicenseNumber}
                            className={"cursor"}
                          >
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
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                name={"licenseNumber"}
                                component="div"
                                className="invalidMessage"
                              />
                            </td>
                          </tr>

                          <tr
                            onClick={handleClickOwnerFullName}
                            className={"cursor"}
                          >
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
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                name={"ownerFullName"}
                                component="div"
                                className="invalidMessage"
                              />
                            </td>
                          </tr>

                          <tr onClick={handleClickType} className={"cursor"}>
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
                                  onClick={(
                                    e: React.MouseEvent<HTMLSelectElement>
                                  ) => e.stopPropagation()}
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

                          <tr onClick={handleClickColor} className={"cursor"}>
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
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                              )}
                            </td>
                          </tr>

                          <tr onClick={handleClickOfficer} className={"cursor"}>
                            <td className={css.cell1}>Сотрудник</td>

                            <td className={css.cell2}>
                              {!isClickedOfficer ? (
                                getCurrentOfficer(values) &&
                                `${
                                  getCurrentOfficer(values)?.firstName
                                    ? getCurrentOfficer(values)?.firstName
                                    : "Сотрудник"
                                } ${
                                  getCurrentOfficer(values)?.lastName
                                    ? getCurrentOfficer(values)?.lastName
                                    : getCurrentOfficer(values)?._id
                                }`
                              ) : (
                                <Field
                                  as="select"
                                  className="form-select"
                                  name="officer"
                                  onClick={(
                                    e: React.MouseEvent<HTMLSelectElement>
                                  ) => e.stopPropagation()}
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
                                          {!officer.firstName ||
                                          !officer.lastName
                                            ? `Сотрудник ${officer._id}`
                                            : `${officer.firstName} ${officer.lastName}`}
                                        </option>
                                      );
                                    })}
                                </Field>
                              )}
                            </td>
                          </tr>

                          <tr
                            onClick={handleClickDescription}
                            className={"cursor"}
                          >
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
                                  onClick={(
                                    e: React.MouseEvent<HTMLTextAreaElement>
                                  ) => e.stopPropagation()}
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
                  </div>
                )}
              </>
            )}
          </>
        );
      }}
    </Formik>
  );
};
export default CaseDetailPage;
