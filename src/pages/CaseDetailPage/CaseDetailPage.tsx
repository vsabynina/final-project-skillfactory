import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import css from "./CaseDetailPage.module.css";
import bicycle from "src/assets/icons/bicycleIcon.svg";
import LoadingSpinner from "src/components/LoadingSpinner";
import { useActionsCases, useActionsOfficer } from "src/hooks/useActions";
import { CaseEdit } from "src/store/types/cases";
import Message from "src/components/Message";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import SecondaryButton from "src/components/SecondaryButton";
import { useTranslation, Trans } from "react-i18next";

const CaseDetailPage: React.VFC = () => {
  const { t } = useTranslation();

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

  const date = someCase && new Date(someCase!.createdAt).toLocaleDateString();
  const time = someCase && new Date(someCase!.createdAt).toLocaleTimeString();

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
        licenseNumber: Yup.string().required(t("errors.required")),
        ownerFullName: Yup.string().required(t("errors.required")),
        type: Yup.string().nullable(),
        color: Yup.string().nullable(),
        officer: Yup.string().nullable(),
        description: Yup.string().nullable(),
        resolution: Yup.string()
          .nullable()
          .when("status", {
            is: (value: string) => value === "done",
            then: Yup.string().nullable().required(t("errors.required")),
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
                              <img src={bicycle} alt="Bicycle" />
                            </th>

                            <th colSpan={2} className={css.thTextAlign}>
                              <p className={css.p}>
                                <Trans i18nKey="caseDetailPage.time.timeCreate">
                                  Сообщение было создано {{ date }} в {{ time }}
                                </Trans>
                              </p>

                              {someCase && (
                                <p className={css.p}>
                                  {!someCase.updatedAt ? (
                                    t("caseDetailPage.time.noEdit")
                                  ) : (
                                    <Trans i18nKey="caseDetailPage.time.timeEdit">
                                      Сообщение было отредактировано {{ date }}{" "}
                                      в {{ time }}
                                    </Trans>
                                  )}
                                </p>
                              )}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr onClick={handleClickStatus} className="cursor">
                            <td className={css.cell1}>{t("case.status")}</td>

                            <td className={css.cell2}>
                              {!isClickedStatus ? (
                                (values.status === "new" &&
                                  t("case.statusList.new")) ||
                                (values.status === "in_progress" &&
                                  t("case.statusList.inProgress")) ||
                                (values.status === "done" &&
                                  t("case.statusList.done"))
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
                                    {t("case.choose")}
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
                              className="cursor"
                            >
                              <td className={css.cell1}>
                                {t("case.resolution")}
                              </td>

                              <td className={css.cell2}>
                                {!isClickedResolution &&
                                someCase &&
                                !someCase.resolution ? (
                                  <Field
                                    as="textarea"
                                    className="form-control"
                                    name="resolution"
                                    placeholder={t("placeholder.resolution")}
                                    onClick={(
                                      e: React.MouseEvent<HTMLTextAreaElement>
                                    ) => e.stopPropagation()}
                                  />
                                ) : (
                                  values.resolution
                                )}
                                <ErrorMessage
                                  name="resolution"
                                  component="div"
                                  className="invalidMessage"
                                />
                              </td>
                            </tr>
                          )}

                          <tr
                            onClick={handleClickLicenseNumber}
                            className="cursor"
                          >
                            <td className={css.cell1}>
                              {t("case.licenseNumber")}
                            </td>

                            <td className={css.cell2}>
                              {!isClickedLicenseNumber ? (
                                values.licenseNumber
                              ) : (
                                <Field
                                  type="text"
                                  name="licenseNumber"
                                  className="form-control"
                                  placeholder={t("placeholder.licenseNumber")}
                                  onKeyPress={handleKeyPress}
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                name="licenseNumber"
                                component="div"
                                className="invalidMessage"
                              />
                            </td>
                          </tr>

                          <tr
                            onClick={handleClickOwnerFullName}
                            className="cursor"
                          >
                            <td className={css.cell1}>
                              {t("case.ownerFullName")}
                            </td>

                            <td className={css.cell2}>
                              {!isClickedOwnerFullName ? (
                                values.ownerFullName
                              ) : (
                                <Field
                                  type="text"
                                  name="ownerFullName"
                                  className="form-control"
                                  placeholder={t("placeholder.ownerFullName")}
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                name="ownerFullName"
                                component="div"
                                className="invalidMessage"
                              />
                            </td>
                          </tr>

                          <tr onClick={handleClickType} className="cursor">
                            <td className={css.cell1}>{t("case.type")}</td>

                            <td className={css.cell2}>
                              {!isClickedType ? (
                                (values.type === "general" &&
                                  t("case.typeList.general")) ||
                                (values.type === "sport" &&
                                  t("case.typeList.sport"))
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
                                    {t("case.choose")}
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
                            <td className={css.cell1}>{t("case.color")}</td>

                            <td className={css.cell2}>
                              {!isClickedColor ? (
                                values.color
                              ) : (
                                <Field
                                  type="text"
                                  name="color"
                                  className="form-control"
                                  placeholder={t("placeholder.color")}
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                              )}
                            </td>
                          </tr>

                          <tr onClick={handleClickOfficer} className={"cursor"}>
                            <td className={css.cell1}>{t("case.officer")}</td>

                            <td className={css.cell2}>
                              {!isClickedOfficer ? (
                                getCurrentOfficer(values) &&
                                `${
                                  getCurrentOfficer(values)?.firstName
                                    ? getCurrentOfficer(values)?.firstName
                                    : t("case.officer")
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
                                  <option value="">{t("case.choose")}</option>
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
                                            ? `${t("case.officer")} ${
                                                officer._id
                                              }`
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
                            className="cursor"
                          >
                            <td className={css.cell1}>
                              {t("case.description")}
                            </td>

                            <td className={css.cell2}>
                              {!isClickedDescription ? (
                                values.description
                              ) : (
                                <Field
                                  as="textarea"
                                  className="form-control"
                                  name="description"
                                  placeholder={t("placeholder.description")}
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
                          title={t("caseDetailPage.secondaryButton.title")}
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
