import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import css from "./OfficerDetailPage.module.css";
import officerImage from "src/assets/images/officerImage.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "src/components/LoadingSpinner";
import { useActionsOfficer } from "src/hooks/useActions";
import Message from "src/components/Message";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import SecondaryButton from "src/components/SecondaryButton";
import { OfficerEdit } from "src/store/types/officers";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

const OfficerDetailPage: React.VFC = () => {
  const { t } = useTranslation();

  const { id } = useParams() as { id: string };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { officer, isLoading, messageOfficer } = useTypedSelector(
    (state) => state.officersReducer
  );
  const { editOfficer, getOneOfficer, handleClickMessageButton } =
    useActionsOfficer();

  const classesTable = classNames("table", "table-hover", css.table);
  const classesCursorRow = classNames(css.row, "cursor");
  const classesSwitcher = classNames(
    "form-check",
    "form-switch",
    css.formSwitch
  );

  const [isClickedFirstName, setIsClickedFirstName] = useState(false);
  const [isClickedLastName, setIsClickedLastName] = useState(false);
  const [isClickedPassword, setIsClickedPassword] = useState(false);

  const handleClickFirstName = () => {
    setIsClickedFirstName((prevState) => !prevState);
  };
  const handleClickLastName = () => {
    setIsClickedLastName((prevState) => !prevState);
  };
  const handleClickPassword = () => {
    setIsClickedPassword((prevState) => !prevState);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
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
    <Formik<OfficerEdit>
      enableReinitialize={true}
      initialValues={{
        firstName: officer ? officer.firstName : "",
        lastName: officer ? officer.lastName : "",
        oldPassword: officer ? officer.password : "",
        newPassword: "",
        passwordConfirmation: "",
        approved: officer ? officer.approved : false,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(15, t("errors.firstName")),
        lastName: Yup.string().max(20, t("errors.lastName")),
        oldPassword: Yup.string(),
        newPassword: Yup.string().when((isClickedPassword, schema) => {
          if (isClickedPassword)
            return schema
              .min(3, t("errors.passwordMin"))
              .max(12, t("errors.passwordMax"))
              .required(t("errors.required"));
        }),
        passwordConfirmation: Yup.string()
          .when("password", (isClickedPassword, schema) => {
            if (isClickedPassword)
              return schema.required(t("errors.requiredNewPassword"));
          })
          .oneOf([Yup.ref(" newPassword")], t("errors.requiredSamePasswords")),
        approved: Yup.boolean(),
      })}
      onSubmit={(values) => {
        editOfficer(officer!._id, values);
        setIsClickedFirstName(false);
        setIsClickedLastName(false);
        setIsClickedPassword(false);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {messageOfficer ? (
                  <Message
                    message={messageOfficer}
                    onClick={handleClickMessage}
                  />
                ) : (
                  <div className={css.wrapper}>
                    <img src={officerImage} className={css.img} alt="Officer" />
                    <Form>
                      <table className={classesTable}>
                        <tbody>
                          <tr
                            className={classesCursorRow}
                            onClick={handleClickFirstName}
                          >
                            <td className={css.cell1}>{t("user.firstName")}</td>
                            <td className={css.cell2}>
                              {!isClickedFirstName ? (
                                values.firstName
                              ) : (
                                <Field
                                  type="text"
                                  name="firstName"
                                  className="form-control"
                                  placeholder={t("placeholder.firstName")}
                                  onKeyPress={handleKeyPress}
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                className="invalidMessage"
                                component="div"
                                name="firstName"
                              />
                            </td>
                          </tr>

                          <tr
                            className={classesCursorRow}
                            onClick={handleClickLastName}
                          >
                            <td className={css.cell1}>{t("user.lastName")}</td>
                            <td className={css.cell2}>
                              {!isClickedLastName ? (
                                values.lastName
                              ) : (
                                <Field
                                  type="text"
                                  name="lastName"
                                  className="form-control"
                                  placeholder={t("placeholder.lastName")}
                                  onKeyPress={handleKeyPress}
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                component="div"
                                name="lastName"
                                className="invalidMessage"
                              />
                            </td>
                          </tr>

                          <tr className={css.row}>
                            <td className={css.cell1}>{t("user.email")}</td>
                            <td className={css.cell2}>
                              {officer ? officer.email : ""}
                            </td>
                          </tr>

                          {!isClickedPassword && (
                            <tr
                              className={classesCursorRow}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>
                                {t("user.password")}
                              </td>
                              <td className={css.cell2}>
                                {!values.passwordConfirmation
                                  ? values.oldPassword
                                  : values.passwordConfirmation}
                              </td>
                            </tr>
                          )}

                          {isClickedPassword && (
                            <tr
                              className={classesCursorRow}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>
                                {t("officerDetailPage.newPassword")}
                              </td>
                              <td className={css.cell2}>
                                <Field
                                  type="password"
                                  name="newPassword"
                                  className="form-control"
                                  placeholder={t("placeholder.newPassword")}
                                  onKeyPress={handleKeyPress}
                                  autoComplete="on"
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="newPassword"
                                  className="invalidMessage"
                                />
                              </td>
                            </tr>
                          )}

                          {isClickedPassword && (
                            <tr
                              className={classesCursorRow}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>
                                {t("officerDetailPage.passwordConfirmation")}
                              </td>
                              <td className={css.cell2}>
                                <Field
                                  type="password"
                                  name="passwordConfirmation"
                                  className="form-control"
                                  placeholder={t(
                                    "placeholder.passwordConfirmation"
                                  )}
                                  onKeyPress={handleKeyPress}
                                  autoComplete="on"
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => e.stopPropagation()}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="passwordConfirmation"
                                  className="invalidMessage"
                                />
                              </td>
                            </tr>
                          )}

                          <tr className={css.row}>
                            <td className={css.cell1}>{t("case.clientId")}</td>
                            <td className={css.cell2}>
                              {officer ? officer.clientId : ""}
                            </td>
                          </tr>

                          <tr className={classesCursorRow}>
                            <td className={css.cell1}>{t("user.approved")}</td>
                            <td className={css.cell2}>
                              <div className={classesSwitcher}>
                                <Field
                                  className={
                                    "form-check-input checkboxInput cursor"
                                  }
                                  type="checkbox"
                                  name="approved"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className={css.btnWrapper}>
                        <SecondaryButton
                          title={t("officerDetailPage.secondaryButton.title")}
                          type="submit"
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
export default OfficerDetailPage;
