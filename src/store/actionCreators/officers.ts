import { Dispatch } from "redux";
import {
  OfficerAction,
  OfficerActionTypes,
  OfficerEdit,
} from "../types/officers";
import { SignUp } from "../types/authorization";
import { axiosInstance } from "../../config/axios";

export const getAllOfficers = () => {
  return function (dispatch: Dispatch<OfficerAction>) {
    dispatch({ type: OfficerActionTypes.FETCH_OFFICERS_REQUEST });
    axiosInstance
      .get("/api/officers/")
      .then((response) => {
        dispatch({
          type: OfficerActionTypes.FETCH_OFFICERS_SUCCESS,
          payload: response.data.officers,
        });
      })
      .catch((response) =>
        dispatch({
          type: OfficerActionTypes.FETCH_OFFICERS_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const deleteOfficer = (id: string | number) => {
  return function (dispatch: Dispatch<OfficerAction>) {
    dispatch({ type: OfficerActionTypes.DELETE_OFFICER_REQUEST });
    axiosInstance
      .delete(`/api/officers/${id}`)
      .then(() => {
        dispatch({
          type: OfficerActionTypes.DELETE_OFFICER_SUCCESS,
          payload: id,
        });
      })
      .catch((response) =>
        dispatch({
          type: OfficerActionTypes.DELETE_OFFICER_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const getOneOfficer = (id: string) => {
  return function (dispatch: Dispatch<OfficerAction>) {
    dispatch({ type: OfficerActionTypes.GET_ONE_OFFICER_REQUEST });
    axiosInstance
      .get(`/api/officers/${id}`)
      .then((response) => {
        dispatch({
          type: OfficerActionTypes.GET_ONE_OFFICER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((response) =>
        dispatch({
          type: OfficerActionTypes.GET_ONE_OFFICER_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const editOfficer = (id: string | number, values: OfficerEdit) => {
  return function (dispatch: Dispatch<OfficerAction>) {
    dispatch({ type: OfficerActionTypes.EDIT_OFFICER_REQUEST });
    axiosInstance
      .put(`/api/officers/${id}`, {
        ...values,
        password:
          values.passwordConfirmation === ""
            ? values.oldPassword
            : values.passwordConfirmation,
      })
      .then((response) => {
        dispatch({
          type: OfficerActionTypes.EDIT_OFFICER_SUCCESS,
          payload: response.data.data,
        });
        dispatch({
          type: OfficerActionTypes.GET_ONE_OFFICER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((response) => {
        dispatch({
          type: OfficerActionTypes.EDIT_OFFICER_FAILURE,
          payload: response.response.data.message,
        });
        dispatch({
          type: OfficerActionTypes.GET_ONE_OFFICER_FAILURE,
          payload: response.response.data.message,
        });
      });
  };
};

export const createOfficer = (values: SignUp) => {
  return function (dispatch: Dispatch<OfficerAction>) {
    dispatch({ type: OfficerActionTypes.CREATE_OFFICER_REQUEST });
    axiosInstance
      .post("/api/officers", values)
      .then((response) => {
        dispatch({
          type: OfficerActionTypes.CREATE_OFFICER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((response) =>
        dispatch({
          type: OfficerActionTypes.CREATE_OFFICER_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const handleClickMessageButton = () => {
  return function (dispatch: Dispatch<OfficerAction>) {
    dispatch({ type: OfficerActionTypes.ON_CLICK_MESSAGE_BUTTON });
  };
};

export const handleClickModalButton = () => {
  return function (dispatch: Dispatch<OfficerAction>) {
    dispatch({ type: OfficerActionTypes.ON_CLICK_MODAL_BUTTON });
  };
};
