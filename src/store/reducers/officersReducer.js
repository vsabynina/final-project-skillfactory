import axios from "axios";
import {
  DELETE_OFFICER_SUCCESS,
  EDIT_CASE_SUCCESS,
  EDIT_OFFICER_SUCCESS,
  FETCH_OFFICERS_SUCCESS,
} from "../type";
import {
  failure,
  success,
  request,
  fetchOfficersSuccess,
  deleteOfficerSuccess,
  editOfficerSuccess,
} from "../actions";

const initialState = {
  officers: [],
};

// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

export const officersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFICERS_SUCCESS:
      return {
        officers: action.payload,
      };
    case EDIT_OFFICER_SUCCESS:
      return {
        officers: [
          ...state.officers,
          {
            ...state.officers.find((item) => item._id !== action.payload.id),
            firstName: action.payload.firstName,
            lastName: action.payload.firstName,
            password: action.payload.password,
            approved: action.payload.approved,
          },
        ],
      };
    case DELETE_OFFICER_SUCCESS:
      return {
        officers: state.officers.filter((item) => item._id !== action.payload),
      };
      // officers: [
      //   ...state.officers,
      //   state.officers.indexOf((item) => item._id !== action.payload.id) !== -1
      //     ? (state.officers[
      //         state.officers.indexOf((item) => item._id !== action.payload.id)
      //       ] = action.payload.newOfficer)
      //     : null,
      // ],
    default:
      return state;
  }
};

export const getAllOfficers = () => {
  return function (dispatch) {
    dispatch(request());
    axios
        .get("https://sf-final-project.herokuapp.com/api/officers/", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          dispatch(fetchOfficersSuccess(response.data.officers));
          dispatch(success());
        })
        .catch((error) => dispatch(failure(error)));
  };
};

export const deleteOfficer = (id) => {
  return function (dispatch) {
    dispatch(request());
    axios
        .delete(`https://sf-final-project.herokuapp.com/api/officers/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(() => {
          dispatch(deleteOfficerSuccess(id));
          dispatch(success());
        })
        .catch((error) => dispatch(failure(error)));
  };
};

export const editOfficer = (id, values) => {
  return function (dispatch) {
    axios
        .put(
            `https://sf-final-project.herokuapp.com/api/officers/${id}`,
            {
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
              approved: values.approved,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
        )
        .then(() => {
          dispatch(editOfficerSuccess(id, values));
          dispatch(success());
        })
        .catch((error) => dispatch(failure(error)));
  };
};
