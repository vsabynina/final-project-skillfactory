import { Officer } from "./officers";

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp extends SignIn {
  clientId: string;
  firstName: string;
  lastName: string;
  approved: boolean;
  agreement: boolean;
}

export interface AuthState {
  isAuthorized: boolean;
  isRegistered: boolean;
  user: Officer | null;
  isLoading: boolean;
  messageAuth: null | string;
}

export type AuthAction =
  | SignUpRequest
  | SignUpSuccess
  | SignUpFailure
  | SignInRequest
  | SignInSuccess
  | SignInFailure
  | LogOutSuccess
  | OnClickMessageButton;

export enum AuthActionTypes {
  SIGN_UP_REQUEST = "SIGN_UP_REQUEST",
  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  SIGN_UP_FAILURE = "SIGN_UP_FAILURE",
  SIGN_IN_REQUEST = "SIGN_IN_REQUEST",
  SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE = "SIGN_IN_FAILURE",
  LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS",
  ON_CLICK_MESSAGE_BUTTON = "ON_CLICK_MESSAGE_BUTTON",
}

interface SignUpRequest {
  type: AuthActionTypes.SIGN_UP_REQUEST;
}

interface SignUpSuccess {
  type: AuthActionTypes.SIGN_UP_SUCCESS;
}

interface SignUpFailure {
  type: AuthActionTypes.SIGN_UP_FAILURE;
  payload: string;
}

interface SignInRequest {
  type: AuthActionTypes.SIGN_IN_REQUEST;
}

interface SignInSuccess {
  type: AuthActionTypes.SIGN_IN_SUCCESS;
  payload: Officer;
}

interface SignInFailure {
  type: AuthActionTypes.SIGN_IN_FAILURE;
  payload: string;
}

interface LogOutSuccess {
  type: AuthActionTypes.LOG_OUT_SUCCESS;
}

interface OnClickMessageButton {
  type: AuthActionTypes.ON_CLICK_MESSAGE_BUTTON;
}
