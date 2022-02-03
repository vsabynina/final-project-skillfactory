import {
  REQUEST,
  FAILURE,
  SUCCESS,
  FETCH_CASES_SUCCESS,
  DELETE_CASE_SUCCESS,
  EDIT_CASE_SUCCESS,
  GET_ONE_CASE_SUCCESS,
  FETCH_OFFICERS_SUCCESS,
  DELETE_OFFICER_SUCCESS,
  EDIT_OFFICER_SUCCESS,
  CREATE_CASE_SUCCESS,
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

export const createCaseSuccess = (values) => {
  return {
    type: CREATE_CASE_SUCCESS,
    payload: {
      licenseNumber: values.licenseNumber,
      ownerFullName: values.ownerFullName,
      type: values.type,
      color: values.color === "" ? null : values.color,
      date: values.date === "" ? null : values.date,
      officer: values.officer === "" ? null : values.officer,
      description: values.description === "" ? null : values.description,
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
