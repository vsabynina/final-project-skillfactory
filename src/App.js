import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Authorization from "./pages/Authorization/Authorization";
import Registration from "./pages/Registration/Registration";
import ListOfCases from "./pages/ListOfCases/ListOfCases";
import CaseForm from "./pages/CaseForm/CaseForm";
import CaseFormPublic from "./pages/CaseFormPublic/CaseFormPublic";
import CaseDetailPage from "./pages/CaseDetailPage/CaseDetailPage";
import ListOfOfficers from "./pages/ListOfOfficers/ListOfOfficers";
import OfficerDetailPage from "./pages/OfficerDetailPage/OfficerDetailPage";
import { connect } from "react-redux";

function App(props) {
  const { isAuthorized } = props;

  return (
    <div className="wrapperApp">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth/sign_in" element={<Authorization />} />
          <Route path="auth/sign_up" element={<Registration />} />

          {isAuthorized && <Route path="cases" element={<ListOfCases />} />}
          {isAuthorized ? (
            <Route path="cases/create_case" element={<CaseForm />} />
          ) : (
            <Route
              path="cases/create_case_public"
              element={<CaseFormPublic />}
            />
          )}
          {isAuthorized && (
            <Route path="cases/:id" element={<CaseDetailPage />} />
          )}
          {isAuthorized && (
            <Route path="officers" element={<ListOfOfficers />} />
          )}
          {isAuthorized && (
            <Route path="officers/:id" element={<OfficerDetailPage />} />
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default connect((state) => {
  return {
    isAuthorized: state.authorizationReducer.isAuthorized,
  };
})(App);
