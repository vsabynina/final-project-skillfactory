import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./CaseForm.module.css";
import { useNavigate } from "react-router-dom";
import { CaseCreate } from "src/store/types/cases";
import LoadingSpinner from "src/components/LoadingSpinner";
import { useActionsCases, useActionsOfficer } from "src/hooks/useActions";
import Message from "src/components/Message";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import Modal from "src/components/Modal";
import MainButton from "src/components/MainButton";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

const CaseForm: React.VFC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { officers } = useTypedSelector((state) => state.officersReducer);
  const { isLoading, messageCase, caseIsCreated } = useTypedSelector(
    (state) => state.casesReducer
  );
  const { bicycleType } = useTypedSelector(
    (state) => state.casesReducer.bicycle
  );

  const { getAllOfficers } = useActionsOfficer();
  const { createCase, handleClickMessageButton, handleClickModalButton } =
    useActionsCases();

  const classes = classNames("row", "g-3", css.form);

  useEffect(() => {
    getAllOfficers();
  }, []);

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  const handleCLickModalSecondaryButton = () => {
    navigate(`/`);
    handleClickModalButton();
  };

  const handleCLickModalMainButton = () => {
    navigate(`/cases`);
    handleClickModalButton();
  };

  return (
    <Formik<CaseCreate>
      enableReinitialize={true}
      initialValues={{
        licenseNumber: "",
        ownerFullName: "",
        type: "",
        color: "",
        date: "",
        officer: "",
        description: "",
        agreement: false,
      }}
      validationSchema={Yup.object({
        licenseNumber: Yup.string().required(t("errors.required")),
        ownerFullName: Yup.string().required(t("errors.required")),
        type: Yup.string().required(t("errors.required")),
        color: Yup.string(),
        date: Yup.date(),
        officer: Yup.string(),
        description: Yup.string(),
        agreement: Yup.boolean().oneOf([true], t("errors.agreement")),
      })}
      onSubmit={(values) => {
        createCase(values);
      }}
    >
      {(formik) => {
        return (
          <>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {messageCase ? (
                  <Message message={messageCase} onClick={handleClickMessage} />
                ) : (
                  <div className="wrapper">
                    <Form className={classes}>
                      <div className="col-md-6">
                        <label htmlFor="licenseNumber" className="form-label">
                          {t("case.licenseNumber")}
                        </label>
                        <Field
                          type="text"
                          name="licenseNumber"
                          className="form-control"
                          placeholder={t("placeholder.licenseNumber")}
                          id="licenseNumber"
                        />
                        <ErrorMessage
                          name="licenseNumber"
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="ownerFullName" className="form-label">
                          {t("case.ownerFullName")}
                        </label>
                        <Field
                          type="text"
                          name="ownerFullName"
                          className="form-control"
                          placeholder={t("placeholder.ownerFullName")}
                          id="ownerFullName"
                        />
                        <ErrorMessage
                          name="ownerFullName"
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="type" className="form-label">
                          {t("case.type")}
                        </label>
                        <Field
                          as="select"
                          className="form-select"
                          name="type"
                          id="type"
                        >
                          <option value="DEFAULT" disabled>
                            {t("case.choose")}
                          </option>

                          {bicycleType &&
                            bicycleType.map((item, index) => {
                              return (
                                <option value={item.value} key={index}>
                                  {(item.value === "general" &&
                                    t("case.typeList.general")) ||
                                    (item.value === "sport" &&
                                      t("case.typeList.sport"))}
                                </option>
                              );
                            })}
                        </Field>
                        <ErrorMessage
                          name="type"
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="color" className="form-label">
                          {t("case.color")}
                        </label>
                        <Field
                          type="text"
                          name="color"
                          className="form-control"
                          placeholder={t("placeholder.color")}
                          id="color"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="date" className="form-label">
                          {t("caseForm.date")}
                        </label>
                        <Field
                          type="date"
                          name="date"
                          className="form-control"
                          id="date"
                        />
                      </div>

                      <div className="col-md-7">
                        <label htmlFor="officer" className="form-label">
                          {t("case.officer")}
                        </label>
                        <Field
                          as="select"
                          className="form-select"
                          name="officer"
                          id="officer"
                        >
                          <option value="">{t("case.choose")}</option>

                          {officers
                            .filter((officer) => officer.approved)
                            .map((officer) => {
                              return (
                                <option key={officer._id} value={officer._id}>
                                  {!officer.firstName || !officer.lastName
                                    ? `${t("case.officer")} ${
                                        !officer.firstName && !officer.lastName
                                          ? officer._id
                                          : officer.firstName ||
                                            officer.lastName
                                      }`
                                    : `${officer.firstName} ${officer.lastName}`}
                                </option>
                              );
                            })}
                        </Field>
                      </div>

                      <div className="col-12">
                        <label htmlFor="description" className="form-label">
                          {t("case.description")}
                        </label>
                        <Field
                          as="textarea"
                          className="form-control"
                          name="description"
                          id="description"
                          placeholder={t("placeholder.description")}
                        />
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            name="agreement"
                            id="agreement"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="agreement"
                          >
                            {t("form.agreement")}
                          </label>
                        </div>
                        <ErrorMessage
                          name="agreement"
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-12">
                        <MainButton
                          title={t("caseForm.mainButton.title")}
                          type="submit"
                          disabled={!(formik.isValid && formik.dirty)}
                        />
                      </div>
                    </Form>
                  </div>
                )}
              </>
            )}
            {caseIsCreated && (
              <Modal
                title={t("modal.title")}
                paragraph={t("modal.paragraph")}
                titleSecondaryButton={t("modal.titleSecondaryButton")}
                titleMainButton={t("modal.titleMainButton")}
                onClickSecondaryButton={handleCLickModalSecondaryButton}
                onClickMainButton={handleCLickModalMainButton}
                isSecondaryButtonShown={true}
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default CaseForm;
