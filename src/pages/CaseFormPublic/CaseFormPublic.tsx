import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./CaseFormPublic.module.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "src/components/LoadingSpinner";
import { CaseCreatePublic } from "src/store/types/cases";
import Message from "src/components/Message";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActionsCases } from "src/hooks/useActions";
import Modal from "src/components/Modal";
import MainButton from "src/components/MainButton";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

const CaseFormPublic: React.VFC = () => {
  const { t } = useTranslation();

  const { bicycleType } = useTypedSelector(
    (state) => state.casesReducer.bicycle
  );
  const { isLoading, messageCase, caseIsCreated } = useTypedSelector(
    (state) => state.casesReducer
  );

  const { createCasePublic, handleClickModalButton, handleClickMessageButton } =
    useActionsCases();

  const navigate = useNavigate();

  const classes = classNames("row", "g-3", css.form);

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  const handleCLickModalMainButton = () => {
    navigate(`/`);
    handleClickModalButton();
  };

  return (
    <Formik<CaseCreatePublic>
      enableReinitialize={true}
      initialValues={{
        licenseNumber: "",
        ownerFullName: "",
        type: "",
        clientId: "",
        color: "",
        date: "",
        description: "",
        agreement: false,
      }}
      validationSchema={Yup.object({
        licenseNumber: Yup.string().required(t("errors.required")),
        ownerFullName: Yup.string().required(t("errors.required")),
        type: Yup.string().required(t("errors.required")),
        clientId: Yup.string().required(t("errors.required")),
        color: Yup.string(),
        date: Yup.date(),
        description: Yup.string(),
        agreement: Yup.boolean().oneOf([true], t("errors.agreement")),
      })}
      onSubmit={(values) => {
        createCasePublic(values);
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
                  <div className={classes}>
                    <Form className={classes}>
                      <div className="col-md-6">
                        <label htmlFor="licenseNumber" className="form-label">
                          {t("case.licenseNumber")}
                        </label>
                        <Field
                          type="text"
                          name="licenseNumber"
                          className="form-control "
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
                          className="form-control "
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

                      <div className="col-md-8">
                        <label htmlFor="clientId" className="form-label">
                          {t("case.clientId")}
                        </label>
                        <Field
                          type="text"
                          name="clientId"
                          className="form-control"
                          placeholder={t("placeholder.clientId")}
                          id="clientId"
                        />
                        <ErrorMessage
                          name="clientId"
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-6">
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

                      <div className="col-md-6">
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
                titleMainButton={t("modal.titleSecondaryButton")}
                onClickMainButton={handleCLickModalMainButton}
                isSecondaryButtonShown={false}
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default CaseFormPublic;
