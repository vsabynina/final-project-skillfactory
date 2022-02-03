import axios from "axios";
import {
  REQUEST,
  FAILURE,
  SUCCESS,
  FETCH_CASES_SUCCESS,
  CREATE_CASE,
  DELETE_CASE_SUCCESS,
  GET_ONE_CASE_SUCCESS,
  EDIT_CASE_SUCCESS,
} from "../type";
import {
  failure,
  success,
  request,
  fetchCasesSuccess,
  deleteCaseSuccess,
  editCaseSuccess,
  getOneCaseSuccess,
} from "../actions";

const initialState = {
  cases: [],
  case: {},
  bicycle: {
    caseStatus: [
      { title: "New", value: "new" },
      { title: "In progress", value: "in_progress" },
      { title: "Done", value: "done" },
    ],
    bicycleType: [
      { title: "General", value: "general" },
      { title: "Sport", value: "sport" },
    ],
  },
  loading: false,
  err: "",
};

// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

export const casesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_CASES_SUCCESS:
      return {
        ...state,
        cases: action.payload,
      };
    //
    case CREATE_CASE:
      return {
        cases: [...state.cases, action.payload],
        ...state,
      };

    case EDIT_CASE_SUCCESS:
      return {
        cases: [
          ...state.cases,
          {
            ...state.cases.find((item) => item._id !== action.payload.id),
            status: action.payload.status,
            licenseNumber: action.payload.licenseNumber,
            ownerFullName: action.payload.ownerFullName,
            type: action.payload.type,
            color: action.payload.color,
            officer: action.payload.officer,
            description: action.payload.description,
            resolution: action.payload.resolution,
          },
        ],
        ...state,
      };
    case GET_ONE_CASE_SUCCESS:
      return {
        ...state,
        case: action.payload,
      };
    case DELETE_CASE_SUCCESS:
      return {
        ...state,
        cases: state.cases.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export const getAllCases = () => {
  return function (dispatch) {
    dispatch(request());
    axios
      .get("https://sf-final-project.herokuapp.com/api/cases/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(fetchCasesSuccess(response.data.data));
        dispatch(success());
      })
      .catch((error) => dispatch(failure(error)));
  };
};

//
export const createCase = () => {
  return function (dispatch, getState) {
    const cases = getState().cases;
    dispatch(request());
    axios
      .post(
        "https://sf-final-project.herokuapp.com/api/cases/",
        { body: JSON.stringify(cases) },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => fetchCasesSuccess(response.data))
      .catch((error) => failure(error));
  };
};
//

export const deleteCase = (id) => {
  return function (dispatch) {
    dispatch(request());
    axios
      .delete(`https://sf-final-project.herokuapp.com/api/cases/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        dispatch(deleteCaseSuccess(id));
        dispatch(success());
      })
      .catch((error) => dispatch(failure(error)));
  };
};

export const getOneCase = (id) => {
  return function (dispatch) {
    dispatch(request());
    axios
      .get(`https://sf-final-project.herokuapp.com/api/cases/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(getOneCaseSuccess(response.data.data));
        dispatch(success());
      })
      .catch((error) => dispatch(failure(error)));
  };
};

export const editCase = (id, values) => {
  return function (dispatch) {
    dispatch(request());
    axios
      .put(
        `https://sf-final-project.herokuapp.com/api/cases/${id}`,
        {
          status: values.status,
          licenseNumber: values.licenseNumber,
          ownerFullName: values.ownerFullName,
          type: values.type,
          color: values.color,
          officer: values.officer,
          description: values.description,
          resolution: values.resolution,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        dispatch(editCaseSuccess(id, values));
        dispatch(getOneCaseSuccess(response.data.data));
        dispatch(success());
      })
      .catch((error) => dispatch(failure(error)));
  };
};
