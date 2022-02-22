import { CaseAction, CaseActionTypes, CaseState } from "../types/cases";

const initialState: CaseState = {
  cases: [],
  someCase: null,
  caseIsCreated: false,
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
  isLoading: false,
  messageCase: null,
};

export const casesReducer = (
  state = initialState,
  action: CaseAction
): CaseState => {
  switch (action.type) {
    case CaseActionTypes.FETCH_CASES_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageCase: null,
      };

    case CaseActionTypes.FETCH_CASES_SUCCESS:
      return {
        ...state,
        cases: action.payload,
        isLoading: false,
        messageCase: null,
      };

    case CaseActionTypes.FETCH_CASES_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageCase: action.payload,
      };

    case CaseActionTypes.CREATE_CASE_REQUEST:
      return {
        ...state,
        caseIsCreated: false,
        isLoading: true,
        messageCase: null,
      };

    case CaseActionTypes.CREATE_CASE_SUCCESS:
      return {
        ...state,
        cases: [...state.cases, action.payload],
        caseIsCreated: true,
        isLoading: false,
        messageCase: null,
      };

    case CaseActionTypes.CREATE_CASE_FAILURE:
      return {
        ...state,
        caseIsCreated: false,
        isLoading: false,
        messageCase: action.payload,
      };

    case CaseActionTypes.CREATE_CASE_PUBLIC_REQUEST:
      return {
        ...state,
        caseIsCreated: false,
        isLoading: true,
        messageCase: null,
      };

    case CaseActionTypes.CREATE_CASE_PUBLIC_SUCCESS:
      return {
        ...state,
        cases: [...state.cases, action.payload],
        caseIsCreated: true,
        isLoading: false,
        messageCase: null,
      };

    case CaseActionTypes.CREATE_CASE_PUBLIC_FAILURE:
      return {
        ...state,
        caseIsCreated: false,
        isLoading: false,
        messageCase: action.payload,
      };

    case CaseActionTypes.EDIT_CASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageCase: null,
      };

    case CaseActionTypes.EDIT_CASE_SUCCESS:
      return {
        ...state,
        cases: [
          ...state.cases,
          {
            ...state.cases.find((item) => item._id !== action.payload._id),
            ...action.payload,
          },
        ],
        isLoading: false,
        messageCase: null,
      };

    case CaseActionTypes.EDIT_CASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageCase: action.payload,
      };

    case CaseActionTypes.GET_ONE_CASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageCase: null,
      };

    case CaseActionTypes.GET_ONE_CASE_SUCCESS:
      return {
        ...state,
        someCase: action.payload,
        isLoading: false,
        messageCase: null,
      };

    case CaseActionTypes.GET_ONE_CASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageCase: action.payload,
      };

    case CaseActionTypes.DELETE_CASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageCase: null,
      };

    case CaseActionTypes.DELETE_CASE_SUCCESS:
      return {
        ...state,
        cases: state.cases.filter((item) => item._id !== action.payload),
        isLoading: false,
        messageCase: null,
      };

    case CaseActionTypes.DELETE_CASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageCase: action.payload,
      };

    case CaseActionTypes.ON_CLICK_MESSAGE_BUTTON:
      return {
        ...state,
        messageCase: null,
      };

    case CaseActionTypes.ON_CLICK_MODAL_BUTTON:
      return {
        ...state,
        caseIsCreated: false,
      };

    default:
      return state;
  }
};
