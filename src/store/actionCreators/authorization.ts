import { Dispatch } from "redux";
import {
  AuthAction,
  AuthActionTypes,
  SignIn,
  SignUp,
} from "../types/authorization";
import { axiosInstance } from "../../config/axios";

export const signUp = (values: SignUp) => {
  return function (dispatch: Dispatch<AuthAction>) {
    dispatch({ type: AuthActionTypes.SIGN_UP_REQUEST });
    axiosInstance
      .post("/api/auth/sign_up", values)
      .then(() => {
        dispatch({ type: AuthActionTypes.SIGN_UP_SUCCESS });
      })
      .catch((response) => {
        dispatch({
          type: AuthActionTypes.SIGN_UP_FAILURE,
          payload: response.response.data.message,
        });
      });
  };
};

export const signIn = (values: SignIn) => {
  return function (dispatch: Dispatch<AuthAction>) {
    dispatch({ type: AuthActionTypes.SIGN_IN_REQUEST });
    axiosInstance
      .post("/api/auth/sign_in", values)
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        dispatch({
          type: AuthActionTypes.SIGN_IN_SUCCESS,
          payload: response.data.data.user,
        });
      })
      .catch((response) =>
        dispatch({
          type: AuthActionTypes.SIGN_IN_REQUEST,
          payload: response.response.data.message,
        })
      );
  };
};

export const logOut = () => {
  return function (dispatch: Dispatch<AuthAction>) {
    localStorage.removeItem("user");
    dispatch({ type: AuthActionTypes.LOG_OUT_SUCCESS });
  };
};

export const handleClickMessageButton = () => {
  return function (dispatch: Dispatch<AuthAction>) {
    dispatch({ type: AuthActionTypes.ON_CLICK_MESSAGE_BUTTON });
  };
};
