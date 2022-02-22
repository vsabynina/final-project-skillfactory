export interface CaseBicycleType {
  title: string;
  value: string;
}

export interface Bicycle {
  caseStatus: Array<CaseBicycleType>;
  bicycleType: Array<CaseBicycleType>;
}

export interface CaseCreate {
  licenseNumber: string;
  type: string;
  ownerFullName: string | null;
  color: string | null;
  date: string | null;
  officer: string | null;
  description: string | null;
  agreement: boolean;
}

export interface CaseCreatePublic {
  licenseNumber: string;
  ownerFullName: string | null;
  type: string;
  clientId: string;
  color: string | null;
  date: string | null;
  description: string | null;
  agreement: boolean;
}

export interface CaseEdit {
  status: string;
  licenseNumber: string;
  type: string;
  ownerFullName: string | null;
  color: string | null;
  officer: string | null;
  description: string | null;
  resolution: string | null;
}

export interface Case extends CaseEdit {
  _id: string | number;
  clientId: string;
  createdAt: string;
  updatedAt: string | null;
  date: string | null;
}

export interface CaseState {
  cases: Array<Case>;
  someCase: Case | null;
  caseIsCreated: boolean;
  bicycle: Bicycle;
  isLoading: boolean;
  messageCase: null | string;
}

export type CaseAction =
  | FetchCasesRequest
  | FetchCasesSuccess
  | FetchCasesFailure
  | CreateCasesRequest
  | CreateCasesSuccess
  | CreateCasesFailure
  | CreateCasesPublicRequest
  | CreateCasesPublicSuccess
  | CreateCasesPublicFailure
  | EditCaseRequest
  | EditCaseSuccess
  | EditCaseFailure
  | GetOneCaseRequest
  | GetOneCaseSuccess
  | GetOneCaseFailure
  | DeleteCaseRequest
  | DeleteCaseSuccess
  | DeleteCaseFailure
  | OnClickMessageButton
  | OnClickModalButton;

export enum CaseActionTypes {
  FETCH_CASES_REQUEST = "FETCH_CASES_REQUEST",
  FETCH_CASES_SUCCESS = "FETCH_CASES_SUCCESS",
  FETCH_CASES_FAILURE = "FETCH_CASES_FAILURE",

  CREATE_CASE_REQUEST = "CREATE_CASE_REQUEST",
  CREATE_CASE_SUCCESS = "CREATE_CASE_SUCCESS",
  CREATE_CASE_FAILURE = "CREATE_CASE_FAILURE",

  CREATE_CASE_PUBLIC_REQUEST = "CREATE_CASE_PUBLIC_REQUEST",
  CREATE_CASE_PUBLIC_SUCCESS = "CREATE_CASE_PUBLIC_SUCCESS",
  CREATE_CASE_PUBLIC_FAILURE = "CREATE_CASE_PUBLIC_FAILURE",

  EDIT_CASE_REQUEST = "EDIT_CASE_REQUEST",
  EDIT_CASE_SUCCESS = "EDIT_CASE_SUCCESS",
  EDIT_CASE_FAILURE = "EDIT_CASE_FAILURE",

  GET_ONE_CASE_REQUEST = "GET_ONE_CASE_REQUEST",
  GET_ONE_CASE_SUCCESS = "GET_ONE_CASE_SUCCESS",
  GET_ONE_CASE_FAILURE = "GET_ONE_CASE_FAILURE",

  DELETE_CASE_REQUEST = "DELETE_CASE_REQUEST",
  DELETE_CASE_SUCCESS = "DELETE_CASE_SUCCESS",
  DELETE_CASE_FAILURE = "DELETE_CASE_FAILURE",

  ON_CLICK_MESSAGE_BUTTON = "ON_CLICK_MESSAGE_BUTTON",
  ON_CLICK_MODAL_BUTTON = "ON_CLICK_MODAL_BUTTON",
}

interface FetchCasesRequest {
  type: CaseActionTypes.FETCH_CASES_REQUEST;
}

interface FetchCasesSuccess {
  type: CaseActionTypes.FETCH_CASES_SUCCESS;
  payload: Array<Case>;
}

interface FetchCasesFailure {
  type: CaseActionTypes.FETCH_CASES_FAILURE;
  payload: string;
}

interface CreateCasesRequest {
  type: CaseActionTypes.CREATE_CASE_REQUEST;
}

interface CreateCasesSuccess {
  type: CaseActionTypes.CREATE_CASE_SUCCESS;
  payload: Case;
}

interface CreateCasesFailure {
  type: CaseActionTypes.CREATE_CASE_FAILURE;
  payload: string;
}

interface CreateCasesPublicRequest {
  type: CaseActionTypes.CREATE_CASE_PUBLIC_REQUEST;
}

interface CreateCasesPublicSuccess {
  type: CaseActionTypes.CREATE_CASE_PUBLIC_SUCCESS;
  payload: Case;
}

interface CreateCasesPublicFailure {
  type: CaseActionTypes.CREATE_CASE_PUBLIC_FAILURE;
  payload: string;
}

interface EditCaseRequest {
  type: CaseActionTypes.EDIT_CASE_REQUEST;
}

interface EditCaseSuccess {
  type: CaseActionTypes.EDIT_CASE_SUCCESS;
  payload: Case;
}

interface EditCaseFailure {
  type: CaseActionTypes.EDIT_CASE_FAILURE;
  payload: string;
}

interface GetOneCaseRequest {
  type: CaseActionTypes.GET_ONE_CASE_REQUEST;
}

interface GetOneCaseSuccess {
  type: CaseActionTypes.GET_ONE_CASE_SUCCESS;
  payload: Case;
}

interface GetOneCaseFailure {
  type: CaseActionTypes.GET_ONE_CASE_FAILURE;
  payload: string;
}

interface DeleteCaseRequest {
  type: CaseActionTypes.DELETE_CASE_REQUEST;
}

interface DeleteCaseSuccess {
  type: CaseActionTypes.DELETE_CASE_SUCCESS;
  payload: string | number;
}

interface DeleteCaseFailure {
  type: CaseActionTypes.DELETE_CASE_FAILURE;
  payload: string;
}

interface OnClickMessageButton {
  type: CaseActionTypes.ON_CLICK_MESSAGE_BUTTON;
}

interface OnClickModalButton {
  type: CaseActionTypes.ON_CLICK_MODAL_BUTTON;
}
