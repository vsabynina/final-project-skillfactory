import axios from "axios";
import {
  REQUEST,
  FAILURE,
  SUCCESS,
  FETCH_CASES_SUCCESS,
  DELETE_CASE_SUCCESS,
  GET_ONE_CASE_SUCCESS,
  EDIT_CASE_SUCCESS,
  CREATE_CASE_SUCCESS,
} from "../type";
import {
  failure,
  success,
  request,
  fetchCasesSuccess,
  deleteCaseSuccess,
  editCaseSuccess,
  getOneCaseSuccess,
  createCaseSuccess,
} from "../actions";

const initialState = {
  cases: [],
  case: {},
  bicycle: {
    caseStatus: [
      { title: "Открыто", value: "new" },
      { title: "В процессе", value: "in_progress" },
      { title: "Завершено", value: "done" },
    ],
    bicycleType: [
      { title: "Обычный", value: "general" },
      { title: "Спортивный", value: "sport" },
    ],
  },
  loading: false,
  error: "",
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
        error: action.payload.response.data.message,
      };

    case FETCH_CASES_SUCCESS:
      return {
        ...state,
        cases: action.payload,
      };
    //
    case CREATE_CASE_SUCCESS:
      return {
        cases: [
          ...state.cases,
          {
            licenseNumber: action.payload.licenseNumber,
            ownerFullName: action.payload.ownerFullName,
            type: action.payload.type,
            color: action.payload.color,
            date: action.payload.date,
            officer: action.payload.officer,
            description: action.payload.description,
          },
        ],
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
      .catch((response) => dispatch(failure(response)));
  };
};

//
export const createCase = (values) => {
  return function (dispatch) {
    dispatch(request());
    axios
      .post(
        "https://sf-final-project.herokuapp.com/api/cases/",
        {
          licenseNumber: values.licenseNumber,
          ownerFullName: values.ownerFullName,
          type: values.type,
          color: values.color,
          date: values.date,
          officer: values.officer,
          description: values.description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => createCaseSuccess(response.data))
      .catch((response) => failure(response));
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
      .catch((response) => dispatch(failure(response)));
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
      .catch((response) => dispatch(failure(response)));
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
      .catch((response) => dispatch(failure(response)));
  };
};
