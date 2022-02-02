import React, { useState } from "react";
import css from "./Registration.module.css";
import SuccessfulRegistration from "../SuccessfulAuthorization/SuccessfulRegistration";

const Registration = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={css.wrapper}>
      <form
        className="row g-3 needs-validation"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="col-md-4">
          <label className="form-label" htmlFor="registrationEmail">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="registrationEmail"
            placeholder="name@example.com"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="registrationPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="registrationPassword"
            placeholder="Password"
            autoComplete="on"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="registrationClientId" className="form-label">
            Client ID
          </label>
          <input
            type="text"
            className="form-control"
            id="registrationClientId"
            placeholder="Client ID"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="registrationFirstName" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="registrationFirstName"
            placeholder="First name"
          />
          <div className="invalid-feedback">Please provide a valid city.</div>
        </div>

        <div className="col-md-5">
          <label htmlFor="registrationLastName" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="registrationLastName"
            placeholder="Last name"
          />
          <div className="invalid-feedback">Please select a valid state.</div>
        </div>

        <div className="col-md-3">
          <label htmlFor="registrationApproved" className="form-label">
            Approved
          </label>
          <select
            className="form-select"
            id="registrationApproved"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Choose...
            </option>
            <option>True</option>
            <option>False</option>
          </select>
          <div className="invalid-feedback">Please select a valid state.</div>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="invalidCheck"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">
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
      {isCompleted ? (
        <SuccessfulRegistration
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
      ) : (
        ""
      )}
    </div>

    //   email* password* clientId* firstName lastName approved: если не передан в
    //   запросе, первому созданному пользователю с конкретным clientId будет
    //   автоматически присвоено значение true, всем последующим пользователям -
    //   false.
  );
};
export default Registration;
