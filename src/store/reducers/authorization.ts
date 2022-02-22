import { AuthState, AuthActionTypes, AuthAction } from "../types/authorization";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: AuthState = user
  ? {
      isAuthorized: true,
      isRegistered: true,
      user,
      isLoading: false,
      messageAuth: null,
    }
  : {
      isAuthorized: false,
      isRegistered: false,
      user: null,
      isLoading: false,
      messageAuth: null,
    };

export const authorizationReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthorized: false,
        isRegistered: false,
        user: null,
        messageAuth: null,
      };

    case AuthActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        isRegistered: true,
        isLoading: false,
        messageAuth: null,
      };

    case AuthActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthorized: false,
        isRegistered: false,
        isLoading: false,
        messageAuth: action.payload,
      };

    case AuthActionTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthorized: false,
        user: null,
        messageAuth: null,
      };

    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        user: action.payload,
        isLoading: false,
        messageAuth: null,
      };

    case AuthActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
        messageAuth: action.payload,
      };

    case AuthActionTypes.LOG_OUT_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        user: null,
        isLoading: false,
        messageAuth: null,
      };

    case AuthActionTypes.ON_CLICK_MESSAGE_BUTTON:
      return {
        ...state,
        messageAuth: null,
      };

    default:
      return state;
  }
};
