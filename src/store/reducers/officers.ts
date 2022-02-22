import {
  OfficerState,
  OfficerAction,
  OfficerActionTypes,
} from "../types/officers";

const initialState: OfficerState = {
  officer: null,
  officers: [],
  officerIsCreated: false,
  isLoading: false,
  messageOfficer: null,
};

export const officersReducer = (
  state = initialState,
  action: OfficerAction
): OfficerState => {
  switch (action.type) {
    case OfficerActionTypes.FETCH_OFFICERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageOfficer: null,
      };

    case OfficerActionTypes.FETCH_OFFICERS_SUCCESS:
      return {
        ...state,
        officers: action.payload,
        isLoading: false,
        messageOfficer: null,
      };

    case OfficerActionTypes.FETCH_OFFICERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageOfficer: action.payload,
      };

    case OfficerActionTypes.EDIT_OFFICER_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageOfficer: null,
      };

    case OfficerActionTypes.EDIT_OFFICER_SUCCESS:
      return {
        ...state,
        officers: [
          ...state.officers,
          {
            ...state.officers.find((item) => item._id !== action.payload._id),
            ...action.payload,
          },
        ],
        isLoading: false,
        messageOfficer: null,
      };

    case OfficerActionTypes.EDIT_OFFICER_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageOfficer: action.payload,
      };

    case OfficerActionTypes.DELETE_OFFICER_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageOfficer: null,
      };

    case OfficerActionTypes.DELETE_OFFICER_SUCCESS:
      return {
        ...state,
        officers: state.officers.filter((item) => item._id !== action.payload),
        isLoading: false,
        messageOfficer: null,
      };

    case OfficerActionTypes.DELETE_OFFICER_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageOfficer: action.payload,
      };

    case OfficerActionTypes.GET_ONE_OFFICER_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageOfficer: null,
      };

    case OfficerActionTypes.GET_ONE_OFFICER_SUCCESS:
      return {
        ...state,
        officer: action.payload,
        isLoading: false,
        messageOfficer: null,
      };

    case OfficerActionTypes.GET_ONE_OFFICER_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageOfficer: action.payload,
      };

    case OfficerActionTypes.CREATE_OFFICER_REQUEST:
      return {
        ...state,
        isLoading: true,
        officerIsCreated: false,
        messageOfficer: null,
      };

    case OfficerActionTypes.CREATE_OFFICER_SUCCESS:
      return {
        ...state,
        officers: [...state.officers, action.payload],
        isLoading: false,
        officerIsCreated: true,
        messageOfficer: null,
      };

    case OfficerActionTypes.CREATE_OFFICER_FAILURE:
      return {
        ...state,
        isLoading: false,
        officerIsCreated: false,
        messageOfficer: action.payload,
      };

    case OfficerActionTypes.ON_CLICK_MESSAGE_BUTTON:
      return {
        ...state,

        messageOfficer: null,
      };

    case OfficerActionTypes.ON_CLICK_MODAL_BUTTON:
      return {
        ...state,
        officerIsCreated: false,
      };

    default:
      return state;
  }
};
