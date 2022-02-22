import { Dispatch } from "redux";
import {
  CaseAction,
  CaseActionTypes,
  CaseEdit,
  CaseCreate,
  CaseCreatePublic,
} from "../types/cases";
import { axiosInstance } from "../../config/axios";

export const getAllCases = () => {
  return function (dispatch: Dispatch<CaseAction>) {
    dispatch({ type: CaseActionTypes.FETCH_CASES_REQUEST });
    axiosInstance
      .get("/api/cases/")
      .then((response) => {
        dispatch({
          type: CaseActionTypes.FETCH_CASES_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((response) =>
        dispatch({
          type: CaseActionTypes.FETCH_CASES_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const createCase = (values: CaseCreate) => {
  return function (dispatch: Dispatch<CaseAction>) {
    dispatch({ type: CaseActionTypes.CREATE_CASE_REQUEST });
    axiosInstance
      .post("/api/cases/", { values })
      .then((response) => {
        dispatch({
          type: CaseActionTypes.CREATE_CASE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((response) =>
        dispatch({
          type: CaseActionTypes.CREATE_CASE_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const createCasePublic = (values: CaseCreatePublic) => {
  return function (dispatch: Dispatch<CaseAction>) {
    dispatch({ type: CaseActionTypes.CREATE_CASE_PUBLIC_REQUEST });
    axiosInstance
      .post("/api/public/report", values)
      .then((response) => {
        dispatch({
          type: CaseActionTypes.CREATE_CASE_PUBLIC_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((response) =>
        dispatch({
          type: CaseActionTypes.CREATE_CASE_PUBLIC_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const deleteCase = (id: string | number) => {
  return function (dispatch: Dispatch<CaseAction>) {
    dispatch({ type: CaseActionTypes.DELETE_CASE_REQUEST });
    axiosInstance
      .delete(`/api/cases/${id}`)
      .then(() => {
        dispatch({ type: CaseActionTypes.DELETE_CASE_SUCCESS, payload: id });
      })
      .catch((response) =>
        dispatch({
          type: CaseActionTypes.DELETE_CASE_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const getOneCase = (id: string) => {
  return function (dispatch: Dispatch<CaseAction>) {
    dispatch({ type: CaseActionTypes.GET_ONE_CASE_REQUEST });
    axiosInstance
      .get(`/api/cases/${id}`)
      .then((response) => {
        dispatch({
          type: CaseActionTypes.GET_ONE_CASE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((response) =>
        dispatch({
          type: CaseActionTypes.GET_ONE_CASE_FAILURE,
          payload: response.response.data.message,
        })
      );
  };
};

export const editCase = (id: string | number, values: CaseEdit) => {
  return function (dispatch: Dispatch<CaseAction>) {
    dispatch({ type: CaseActionTypes.EDIT_CASE_REQUEST });
    axiosInstance
      .put(`/api/cases/${id}`, { values })
      .then((response) => {
        dispatch({
          type: CaseActionTypes.EDIT_CASE_SUCCESS,
          payload: response.data.data,
        });
        dispatch({
          type: CaseActionTypes.GET_ONE_CASE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((response) => {
        dispatch({
          type: CaseActionTypes.EDIT_CASE_FAILURE,
          payload: response.response.data.message,
        });
        dispatch({
          type: CaseActionTypes.GET_ONE_CASE_FAILURE,
          payload: response.response.data.message,
        });
      });
  };
};

export const handleClickMessageButton = () => {
  return function (dispatch: Dispatch<CaseAction>) {
    dispatch({ type: CaseActionTypes.ON_CLICK_MESSAGE_BUTTON });
  };
};

export const handleClickModalButton = () => {
  return function (dispatch: Dispatch<CaseAction>) {
    dispatch({ type: CaseActionTypes.ON_CLICK_MODAL_BUTTON });
  };
};
