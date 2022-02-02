import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./CaseForm.module.css";
import { OFFICERS, USER } from "../../mock.js";
import { createCase } from "../../store/reducers/casesReducer";

const CaseForm = () => {
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
        values.color,
        values.date,
        values.officer,
        values.description
      )
    );
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    setValues({ ...values, [fieldName]: e.target.value });
  };

  return (
    <div className={css.wrapper}>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="TheftFormLicenseNumber" className="form-label">
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
          <label htmlFor="TheftFormOwnerFullName" className="form-label">
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
          <div className="invalid-feedback">Please select a valid state.</div>
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

        <div className="col-md-7">
          <label htmlFor="TheftFormOfficer" className="form-label">
            Officer
          </label>
          <select
            className="form-select"
            name={"officer"}
            id="TheftFormType"
            defaultValue={"DEFAULT"}
            required
            onChange={handleChange}
            value={values.officer}
          >
            <option value="DEFAULT" disabled>
              Choose...
            </option>

            {OFFICERS.map((officer) => {
              return (
                <option>
                  {officer.firstName} {officer.lastName}
                </option>
              );
            })}
          </select>
          <div className="invalid-feedback">Please select a valid state.</div>
        </div>

        <div className="col-12">
          <label htmlFor="TheftFormDescription" className="form-label">
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
          <div id="validationServer05Feedback" className="invalid-feedback">
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
            <label className="form-check-label" htmlFor="invalidCheck3">
              Agree to terms and conditions
            </label>
            <div id="invalidCheck3Feedback" className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
  //с авторизацией
  // licenseNumber*
  // ownerFullName*
  // type*
  // color
  // date
  // officer
  // description
  //status и createdAt заполняются на бэкенде автоматически
};

export default CaseForm;
