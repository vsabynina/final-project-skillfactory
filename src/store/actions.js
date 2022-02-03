import {
  REQUEST,
  FAILURE,
  SUCCESS,
  FETCH_CASES_SUCCESS,
  CREATE_CASE,
  DELETE_CASE_SUCCESS,
  GET_ONE_CASE,
  EDIT_CASE_SUCCESS,
  GET_ONE_CASE_SUCCESS,
  FETCH_OFFICERS_SUCCESS,
  DELETE_OFFICER_SUCCESS,
  EDIT_OFFICER_SUCCESS,
} from "./type";

export const request = () => {
  return { type: REQUEST };
};

export const success = () => {
  return { type: SUCCESS };
};

export const failure = (err) => {
  return {
    type: FAILURE,
    payload: err.message,
  };
};

export const fetchCasesSuccess = (cases) => {
  return {
    type: FETCH_CASES_SUCCESS,
    payload: cases,
  };
};
//
export const createCase = (
  licenseNumber,
  ownerFullName,
  type,
  color = null,
  date = null,
  officer = null,
  description = null
) => {
  return {
    type: CREATE_CASE,
    payload: {
      licenseNumber: licenseNumber,
      ownerFullName: ownerFullName,
      type: type,
      color: color,
      date: date,
      officer: officer,
      description: description,
    },
  };
};

export const editCaseSuccess = (id, values) => {
  return {
    type: EDIT_CASE_SUCCESS,
    payload: {
      id: id,
      status: values.status,
      licenseNumber: values.licenseNumber,
      ownerFullName: values.ownerFullName,
      type: values.type,
      color: values.color,
      officer: values.officer,
      description: values.description,
      resolution: values.resolution,
    },
  };
};

export const deleteCaseSuccess = (id) => {
  return {
    type: DELETE_CASE_SUCCESS,
    payload: id,
  };
};

export const getOneCaseSuccess = (someCase) => {
  return {
    type: GET_ONE_CASE_SUCCESS,
    payload: someCase,
  };
};

export const fetchOfficersSuccess = (officers) => {
  return {
    type: FETCH_OFFICERS_SUCCESS,
    payload: officers,
  };
};

export const deleteOfficerSuccess = (id) => {
  return {
    type: DELETE_OFFICER_SUCCESS,
    payload: id,
  };
};

export const editOfficerSuccess = (id, values) => {
  return {
    type: EDIT_OFFICER_SUCCESS,
    payload: {
      id: id,
      firstName: values.firstName,
      lastName: values.lastName,
      password:
        values.newPassword === "" ? values.oldPassword : values.newPassword,
      approved: values.approved,
    },
  };
};
