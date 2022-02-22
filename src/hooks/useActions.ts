import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as OfficersActionCreators from "../store/actionCreators/officers";
import * as CasesActionCreators from "../store/actionCreators/cases";
import * as AuthActionCreators from "../store/actionCreators/authorization";

export const useActionsOfficer = () => {
  const dispatch = useDispatch();
  return bindActionCreators(OfficersActionCreators, dispatch);
};

export const useActionsCases = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CasesActionCreators, dispatch);
};

export const useActionsAuth = () => {
  const dispatch = useDispatch();
  return bindActionCreators(AuthActionCreators, dispatch);
};
