import axios from "axios";
import { AUTH_SUCCESS, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS } from "../type";
import {
  authSuccess,
  failure,
  request,
  signInSuccess,
  signUpSuccess,
  success,
} from "../actions";

const initialState = {
  authorized: false,
  token: "",
  user: {},
};

axios.defaults.headers.common["Content-Type"] = "application/json";

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        authorized: false,
        token: "",
        user: {},
      };
    case SIGN_IN_SUCCESS:
      return {
        authorized: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case AUTH_SUCCESS:
      return {
        authorized: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    // case SIGN_IN_SUCCESS:
    //   return {
    //     cases: [
    //       ...state.cases,
    //       {
    //         licenseNumber: action.payload.licenseNumber,
    //         ownerFullName: action.payload.ownerFullName,
    //         type: action.payload.type,
    //         color: action.payload.color,
    //         date: action.payload.date,
    //         officer: action.payload.officer,
    //         description: action.payload.description,
    //       },
    //     ],
    //     ...state,
    //   };
    default:
      return state;
  }
};

export const signUp = (values) => {
  return function (dispatch) {
    dispatch(request());
    axios
      .post("https://sf-final-project.herokuapp.com/api/auth/sign_up", {
        email: values.email,
        password: values.password,
        clientId: values.clientId,
        firstName: values.firstName,
        lastName: values.lastName,
        approved: values.approved,
      })
      .then((response) => {
        dispatch(signUpSuccess(response.data.data));
        dispatch(success());
      })
      .catch((response) => dispatch(failure(response)));
  };
};

export const signIn = (values) => {
  return function (dispatch) {
    dispatch(request());
    axios
      .post("https://sf-final-project.herokuapp.com/api/auth/sign_in", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        dispatch(signInSuccess(response.data.data));
        dispatch(success());
      })
      .catch((response) => dispatch(failure(response)));
  };
};
export const auth = () => {
  return function (dispatch) {
    dispatch(request());
    axios
      .get("https://sf-final-project.herokuapp.com/api/auth/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(authSuccess(response.data.data));
        dispatch(success());
      })
      .catch((response) => dispatch(failure(response)));
  };
};
