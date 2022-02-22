export interface OfficerCreate {
  email: string;
  firstName: string | null;
  lastName: string | null;
  password: string | number;
  approved: boolean;
}

export interface Officer {
  _id: string | number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  password: string | number;
  clientId: string;
  approved: boolean;
}

export interface OfficerEdit {
  firstName: string | null;
  lastName: string | null;
  oldPassword: string | number;
  newPassword: string | number;
  passwordConfirmation: string | number;
  approved: boolean;
}

export interface OfficerState {
  officer: Officer | null;
  officers: Array<Officer>;
  officerIsCreated: boolean;
  isLoading: boolean;
  messageOfficer: null | string;
}

export type OfficerAction =
  | CreateOfficerRequest
  | CreateOfficerSuccess
  | CreateOfficerFailure
  | DeleteOfficerRequest
  | DeleteOfficerSuccess
  | DeleteOfficerFailure
  | EditOfficerRequest
  | EditOfficerSuccess
  | EditOfficerFailure
  | FetchOfficersRequest
  | FetchOfficersSuccess
  | FetchOfficersFailure
  | GetOneOfficerRequest
  | GetOneOfficerSuccess
  | GetOneOfficerFailure
  | OnClickMessageButton
  | OnClickModalButton;

export enum OfficerActionTypes {
  CREATE_OFFICER_REQUEST = "CREATE_OFFICER_REQUEST",
  CREATE_OFFICER_SUCCESS = "CREATE_OFFICER_SUCCESS",
  CREATE_OFFICER_FAILURE = "CREATE_OFFICER_FAILURE",

  DELETE_OFFICER_REQUEST = "DELETE_OFFICER_REQUEST",
  DELETE_OFFICER_SUCCESS = "DELETE_OFFICER_SUCCESS",
  DELETE_OFFICER_FAILURE = "DELETE_OFFICER_FAILURE",

  EDIT_OFFICER_REQUEST = "EDIT_OFFICER_REQUEST",
  EDIT_OFFICER_SUCCESS = "EDIT_OFFICER_SUCCESS",
  EDIT_OFFICER_FAILURE = "EDIT_OFFICER_FAILURE",

  FETCH_OFFICERS_REQUEST = "FETCH_OFFICERS_REQUEST",
  FETCH_OFFICERS_SUCCESS = "FETCH_OFFICERS_SUCCESS",
  FETCH_OFFICERS_FAILURE = "FETCH_OFFICERS_FAILURE",

  GET_ONE_OFFICER_REQUEST = "GET_ONE_OFFICER_REQUEST",
  GET_ONE_OFFICER_SUCCESS = "GET_ONE_OFFICER_SUCCESS",
  GET_ONE_OFFICER_FAILURE = "GET_ONE_OFFICER_FAILURE",

  ON_CLICK_MESSAGE_BUTTON = "ON_CLICK_MESSAGE_BUTTON",
  ON_CLICK_MODAL_BUTTON = "ON_CLICK_MODAL_BUTTON",
}

interface FetchOfficersRequest {
  type: OfficerActionTypes.FETCH_OFFICERS_REQUEST;
}

interface FetchOfficersSuccess {
  type: OfficerActionTypes.FETCH_OFFICERS_SUCCESS;
  payload: Array<Officer>;
}

interface FetchOfficersFailure {
  type: OfficerActionTypes.FETCH_OFFICERS_FAILURE;
  payload: string;
}

interface EditOfficerRequest {
  type: OfficerActionTypes.EDIT_OFFICER_REQUEST;
}

interface EditOfficerSuccess {
  type: OfficerActionTypes.EDIT_OFFICER_SUCCESS;
  payload: Officer;
}

interface EditOfficerFailure {
  type: OfficerActionTypes.EDIT_OFFICER_FAILURE;
  payload: string;
}

interface DeleteOfficerRequest {
  type: OfficerActionTypes.DELETE_OFFICER_REQUEST;
}

interface DeleteOfficerSuccess {
  type: OfficerActionTypes.DELETE_OFFICER_SUCCESS;
  payload: string | number;
}

interface DeleteOfficerFailure {
  type: OfficerActionTypes.DELETE_OFFICER_FAILURE;
  payload: string;
}

interface GetOneOfficerRequest {
  type: OfficerActionTypes.GET_ONE_OFFICER_REQUEST;
}

interface GetOneOfficerSuccess {
  type: OfficerActionTypes.GET_ONE_OFFICER_SUCCESS;
  payload: Officer;
}

interface GetOneOfficerFailure {
  type: OfficerActionTypes.GET_ONE_OFFICER_FAILURE;
  payload: string;
}

interface CreateOfficerRequest {
  type: OfficerActionTypes.CREATE_OFFICER_REQUEST;
}

interface CreateOfficerSuccess {
  type: OfficerActionTypes.CREATE_OFFICER_SUCCESS;
  payload: Officer;
}

interface CreateOfficerFailure {
  type: OfficerActionTypes.CREATE_OFFICER_FAILURE;
  payload: string;
}

interface OnClickMessageButton {
  type: OfficerActionTypes.ON_CLICK_MESSAGE_BUTTON;
}

interface OnClickModalButton {
  type: OfficerActionTypes.ON_CLICK_MODAL_BUTTON;
}
