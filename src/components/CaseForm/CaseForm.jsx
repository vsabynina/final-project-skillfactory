import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch, connect } from "react-redux";
import css from "./CaseForm.module.css";
import { OFFICERS, USER } from "../../mock.js";
import {
  createCase,
  editCase,
  getOneCase,
} from "../../store/reducers/casesReducer";
import { getAllOfficers } from "../../store/reducers/officersReducer";

const CaseForm = (props) => {
  const { officers, bicycleType, getAllOfficers } = props;
  const dispatch = useDispatch();

  // const [values, setValues] = useState({
  //   licenseNumber: "",
  //   fullName: "",
  //   type: "",
  //   color: "",
  //   date: "",
  //   officer: "",
  //   description: "",
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     createCase(
  //       values.licenseNumber,
  //       values.fullName,
  //       values.type,
  //       values.color,
  //       values.date,
  //       values.officer,
  //       values.description
  //     )
  //   );
  // };

  // const handleChange = (e) => {
  //   const fieldName = e.target.name;
  //   setValues({ ...values, [fieldName]: e.target.value });
  // };

  useEffect(() => {
    getAllOfficers();
  }, []);

  return (
    <Formik
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
        licenseNumber: Yup.string().required("This field is required"),
        ownerFullName: Yup.string().required("This field is required"),
        type: Yup.string().required("This field is required"),
        color: Yup.string(),
        date: Yup.date(),
        officer: Yup.string(),
        //id сотрудника
        description: Yup.string(),
        agreement: Yup.boolean().required("You must agree before submitting"),
      })}
      onSubmit={(values) => {
        createCase(values);
      }}
    >
      {(formik) => {
        return (
          <div className={css.wrapper}>
            <Form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="licenseNumber" className="form-label">
                  License Number
                </label>
                <Field
                  type="text"
                  name={"licenseNumber"}
                  className="form-control "
                  placeholder="License Number"
                  id="licenseNumber"
                />
                <ErrorMessage name={"licenseNumber"} />
              </div>

              <div className="col-md-6">
                <label htmlFor="ownerFullName" className="form-label">
                  Owner full name
                </label>
                <Field
                  type="text"
                  name={"ownerFullName"}
                  className="form-control "
                  placeholder="Owner full name"
                  id="ownerFullName"
                />
                <ErrorMessage name={"ownerFullName"} />
              </div>

              <div className="col-md-4">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <Field
                  as={"select"}
                  className="form-select"
                  name={"type"}
                  id="type"
                >
                  <option value="DEFAULT" disabled>
                    Choose...
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
                <ErrorMessage name={"type"} />
              </div>

              <div className="col-md-4">
                <label htmlFor="color" className="form-label">
                  Color
                </label>
                <Field
                  type="text"
                  name={"color"}
                  className="form-control"
                  placeholder="Color"
                  id="color"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <Field
                  type="date"
                  name={"date"}
                  className="form-control"
                  id="date"
                />
              </div>

              <div className="col-md-7">
                <label htmlFor="officer" className="form-label">
                  Officer
                </label>
                <Field
                  as={"select"}
                  className="form-select"
                  name={"officer"}
                  id="officer"
                >
                  <option value="">Choose...</option>

                  {officers
                    .filter((officer) => officer.approved)
                    .map((officer, index) => {
                      return (
                        <option key={officer._id} value={officer._id}>
                          {!officer.firstName || !officer.lastName
                            ? `Officer ${index + 1}`
                            : `${officer.firstName} ${officer.lastName}`}
                        </option>
                      );
                    })}
                </Field>
              </div>

              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <Field
                  as={"textarea"}
                  className="form-control"
                  name={"description"}
                  id="description"
                  placeholder="Please describe lost bicycle"
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type={"checkbox"}
                    name={"checkbox"}
                    id="agreement"
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Agree to terms and conditions
                  </label>
                  <ErrorMessage name={"agreement"} />
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Submit form
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
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
export default connect(
  (state) => {
    return {
      officers: state.officersReducer.officers,
      bicycleType: state.casesReducer.bicycle.bicycleType,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      createCase: () => dispatch(createCase()),
      // getOneCase: (id) => dispatch(getOneCase(id)),
      // editCase: (id, values) => dispatch(editCase(id, values)),
    };
  }
)(CaseForm);
