import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch, connect } from "react-redux";
import css from "./CaseFormPublic.module.css";
import { OFFICERS, USER } from "../../mock.js";
import {
  createCase,
  createCasePublic,
  handleClickMessageButton,
  handleClickModalButton,
} from "../../store/reducers/casesReducer";
import MainButton from "../../components/MainButton";
import { useNavigate } from "react-router-dom";
import { getAllOfficers } from "../../store/reducers/officersReducer";
import * as Yup from "yup";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";

const CaseFormPublic = (props) => {
  const {
    createCasePublic,
    officers,
    bicycleType,
    getAllOfficers,
    isLoading,
    message,
    handleClickMessageButton,
    caseIsCreated,
    handleClickModalButton,
  } = props;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    licenseNumber: "",
    fullName: "",
    type: "",
    color: "",
    date: "",
    officer: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCase(
        values.licenseNumber,
        values.fullName,
        values.type,
        values.clientId,
        values.color,
        values.date,
        values.description
      )
    );
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    setValues({ ...values, [fieldName]: e.target.value });
  };

  return (
    <Formik
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
        licenseNumber: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        ownerFullName: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        type: Yup.string().required("Это поле обязательно для заполнения"),
        clientId: Yup.string().required("Это поле обязательно для заполнения"),
        color: Yup.string(),
        date: Yup.date(),
        description: Yup.string(),
        agreement: Yup.boolean().oneOf(
          [true],
          "Вы должны согласиться перед отправкой сообщения"
        ),
      })}
      onSubmit={(values) => {
        createCasePublic(values);
      }}
    >
      {(formik) => {
        return (
          <div className={`row g-3 ${css.form}`}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {message ? (
                  <Message message={message} />
                ) : (
                  <Form className={`row g-3 ${css.form}`}>
                    <div className="col-md-6">
                      <label
                        htmlFor="TheftFormLicenseNumber"
                        className="form-label"
                      >
                        License Number
                      </label>
                      <input
                        type="text"
                        name={"licenseNumber"}
                        className="form-control "
                        placeholder="License Number"
                        //is-valid
                        id="TheftFormLicenseNumber"
                        required
                        onChange={handleChange}
                        value={values.licenseNumber}
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="TheftFormOwnerFullName"
                        className="form-label"
                      >
                        Owner full name
                      </label>
                      <input
                        type="text"
                        name={"fullName"}
                        className="form-control "
                        placeholder="Owner full name"
                        //is-valid
                        id="TheftFormOwnerFullName"
                        required
                        onChange={handleChange}
                        value={values.fullName}
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="TheftFormType" className="form-label">
                        Type
                      </label>
                      <select
                        className="form-select"
                        name={"type"}
                        id="TheftFormType"
                        defaultValue={"DEFAULT"}
                        required
                        onChange={handleChange}
                        value={values.type}
                      >
                        <option value="DEFAULT" disabled>
                          Choose...
                        </option>
                        <option>General</option>
                        <option>Sport</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid state.
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="TheftFormOwnerFullName"
                        className="form-label"
                      >
                        Client ID
                      </label>
                      <input
                        type="text"
                        name={"clientId"}
                        className="form-control "
                        placeholder="Client ID"
                        //is-valid
                        id="TheftFormClientId"
                        required
                        onChange={handleChange}
                        value={values.clientId}
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="TheftFormColor" className="form-label">
                        Color
                      </label>
                      <input
                        type="text"
                        name={"color"}
                        className="form-control "
                        // is-invalid
                        placeholder="Color"
                        id="TheftFormColor"
                        aria-describedby="validationServer03Feedback"
                        onChange={handleChange}
                        value={values.color}
                      />
                      <div id="TheftFormColor" className="invalid-feedback">
                        Please provide a valid city.
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="TheftFormDate" className="form-label">
                        Date
                      </label>
                      <input
                        type="date"
                        name={"date"}
                        className="form-control"
                        // is-invalid
                        id="TheftFormDate"
                        aria-describedby="validationServer03Feedback"
                        onChange={handleChange}
                        value={values.date}
                      />
                      <div id="TheftFormDate" className="invalid-feedback">
                        Please select a valid state.
                      </div>
                    </div>

                    <div className="col-12">
                      <label
                        htmlFor="TheftFormDescription"
                        className="form-label"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        name={"description"}
                        aria-label="Description"
                        id="TheftFormDescription"
                        placeholder="Please describe lost bicycle"
                        onChange={handleChange}
                        value={values.description}
                      />
                      <div
                        id="validationServer05Feedback"
                        className="invalid-feedback"
                      >
                        Please provide a valid zip.
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input "
                          // is-invalid
                          type="checkbox"
                          // value=""
                          id="invalidCheck3"
                          aria-describedby="invalidCheck3Feedback"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck3"
                        >
                          Agree to terms and conditions
                        </label>
                        <div
                          id="invalidCheck3Feedback"
                          className="invalid-feedback"
                        >
                          You must agree before submitting.
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <MainButton title={"Submit form"} type={"submit"} />
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
  //без авторизации
  // licenseNumber*
  // ownerFullName*
  // type*
  // clientId*
  // color
  // date
  // description
};

export default connect(
  (state) => {
    return {
      officers: state.officersReducer.officers,
      bicycleType: state.casesReducer.bicycle.bicycleType,
      isLoadingCases: state.casesReducer.isLoading,
      message: state.casesReducer.message,
      caseIsCreated: state.casesReducer.caseIsCreated,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      createCasePublic: (values) => dispatch(createCasePublic(values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
      handleClickModalButton: () => dispatch(handleClickModalButton()),
    };
  }
)(CaseFormPublic);
