import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import css from "./CaseForm.module.css";
import { createCase } from "../../store/reducers/casesReducer";
import { getAllOfficers } from "../../store/reducers/officersReducer";

const CaseForm = (props) => {
  const { officers, bicycleType, getAllOfficers, createCase } = props;

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
        licenseNumber: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        ownerFullName: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        type: Yup.string().required("Это поле обязательно для заполнения"),
        color: Yup.string(),
        date: Yup.date(),
        officer: Yup.string(),
        description: Yup.string(),
        agreement: Yup.boolean().oneOf(
          [true],
          "You must agree before submitting"
        ),
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
                  Лицензионный номер
                </label>
                <Field
                  type="text"
                  name={"licenseNumber"}
                  className="form-control "
                  placeholder="Лицензионный номер"
                  id="licenseNumber"
                />
                <ErrorMessage
                  name={"licenseNumber"}
                  className={css.invalidMessage}
                  component="div"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="ownerFullName" className="form-label">
                  ФИО владельца
                </label>
                <Field
                  type="text"
                  name={"ownerFullName"}
                  className="form-control "
                  placeholder="ФИО владельца"
                  id="ownerFullName"
                />
                <ErrorMessage
                  name={"ownerFullName"}
                  className={css.invalidMessage}
                  component="div"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="type" className="form-label">
                  Тип
                </label>
                <Field
                  as={"select"}
                  className="form-select"
                  name={"type"}
                  id="type"
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
                <ErrorMessage
                  name={"type"}
                  className={css.invalidMessage}
                  component="div"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="color" className="form-label">
                  Цвет
                </label>
                <Field
                  type="text"
                  name={"color"}
                  className="form-control"
                  placeholder="Цвет"
                  id="color"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="date" className="form-label">
                  Дата
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
                  Сотрудник
                </label>
                <Field
                  as={"select"}
                  className="form-select"
                  name={"officer"}
                  id="officer"
                >
                  <option value="">Выберите...</option>

                  {officers
                    .filter((officer) => officer.approved)
                    .map((officer, index) => {
                      return (
                        <option key={officer._id} value={officer._id}>
                          {!officer.firstName || !officer.lastName
                            ? `Сотрудник ${index + 1}`
                            : `${officer.firstName} ${officer.lastName}`}
                        </option>
                      );
                    })}
                </Field>
              </div>

              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Описание
                </label>
                <Field
                  as={"textarea"}
                  className="form-control"
                  name={"description"}
                  id="description"
                  placeholder="Опишите велосипед"
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type={"checkbox"}
                    name={"agreement"}
                    id="agreement"
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Согласиться с условиями и правилами
                  </label>
                </div>
                <ErrorMessage
                  name={"agreement"}
                  className={css.invalidMessage}
                  component="div"
                />
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Сообщить о краже
                </button>
              </div>
            </Form>
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
      bicycleType: state.casesReducer.bicycle.bicycleType,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      createCase: (values) => dispatch(createCase(values)),
    };
  }
)(CaseForm);
