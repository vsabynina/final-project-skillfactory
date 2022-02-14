import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import css from "./CaseFormPublic.module.css";
import {
  createCasePublic,
  handleClickMessageButton,
  handleClickModalButton,
} from "../../store/reducers/casesReducer";
import MainButton from "../../components/MainButton";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";
import Modal from "../../components/Modal/Modal";

const CaseFormPublic = (props) => {
  const {
    createCasePublic,
    bicycleType,
    isLoading,
    message,
    handleClickMessageButton,
    caseIsCreated,
    handleClickModalButton,
  } = props;

  const navigate = useNavigate();

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  const handleCLickModalMainButton = () => {
    navigate(`/`);
    handleClickModalButton();
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
          <>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {message ? (
                  <Message message={message} onClick={handleClickMessage} />
                ) : (
                  <div className={`row g-3 ${css.form}`}>
                    <Form className={`row g-3 ${css.form}`}>
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
                          className="invalidMessage"
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
                          className="invalidMessage"
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
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-8">
                        <label htmlFor="clientId" className="form-label">
                          ID клиента
                        </label>
                        <Field
                          type="text"
                          name={"clientId"}
                          className="form-control "
                          placeholder="ID клиента"
                          id="clientId"
                        />
                        <ErrorMessage
                          name={"clientId"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-6">
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

                      <div className="col-md-6">
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
                          <label
                            className="form-check-label"
                            htmlFor="agreement"
                          >
                            Согласиться с условиями и правилами
                          </label>
                        </div>
                        <ErrorMessage
                          name={"agreement"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-12">
                        <MainButton
                          title={"Сообщить о краже"}
                          type={"submit"}
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
                title={"Сообщение о краже создано"}
                paragraph={"Данные успешно отправлены"}
                titleMainButton={"Главная страница"}
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
      createCasePublic: (values) => dispatch(createCasePublic(values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
      handleClickModalButton: () => dispatch(handleClickModalButton()),
    };
  }
)(CaseFormPublic);
