import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/HomePage/HomePage";
import Authorization from "./components/Authorization/Authorization";
import Registration from "./components/Registration/Registration";
import ListOfCases from "./components/ListOfCases/ListOfCases";
import CaseForm from "./components/CaseForm/CaseForm";
import CaseFormPublic from "./components/CaseFormPublic/CaseFormPublic";
import CaseDetailPage from "./components/CaseDetailPage/CaseDetailPage";
import ListOfOfficers from "./components/ListOfOfficers/ListOfOfficers";
import OfficerDetailPage from "./components/OfficerDetailPage/OfficerDetailPage";

// const setToken = (userToken) => {
//   localStorage.setItem("token", JSON.stringify(userToken));
// };

// const getToken = () => {
//   const tokenString = localStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// };

function App() {
  // const token = getToken();

  window.localStorage.setItem(
    "token",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTkzZGI0NzgzNTJlNDEzMGUzYTMyNyIsImlhdCI6MTY0MzcxMjM0OSwiZXhwIjoxNjQ0MzE3MTQ5fQ.7Lvz_f0JsjCHKFsAfQ0GOSJyPjxorOQ0Kl-_RJxWVQ8"
  );

  return (
    <div className="wrapper">
      <Routes>
        {/*<Route path="/" element={<Layout setToken={setToken} />}>*/}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/*<Route*/}
          {/*  path="auth/sign_in"*/}
          {/*  element={<Authorization setToken={setToken} />}*/}
          {/*/>*/}
          <Route path="auth/sign_in" element={<Authorization />} />

          {/*<Route*/}
          {/*  path="auth/sign_up"*/}
          {/*  element={*/}
          {/*    !token ? <Authorization setToken={setToken} /> : <Registration />*/}
          {/*  }*/}
          {/*/>*/}
          <Route path="auth/sign_up" element={<Registration />} />

          {/*<Route*/}
          {/*  path="cases"*/}
          {/*  element={*/}
          {/*    !token ? <Authorization setToken={setToken} /> : <ListOfCases />*/}
          {/*  }*/}
          {/*/>*/}
          <Route path="cases" element={<ListOfCases />} />

          <Route path="public/report" element={<CaseFormPublic />} />

          {/*<Route*/}
          {/*  path="cases/create_case"*/}
          {/*  element={*/}
          {/*    !token ? <Authorization setToken={setToken} /> : <CaseForm />*/}
          {/*  }*/}
          {/*/>*/}
          <Route path="cases/create_case" element={<CaseForm />} />

          {/*<Route*/}
          {/*  path="cases/:id"*/}
          {/*  element={*/}
          {/*    !token ? (*/}
          {/*      <Authorization setToken={setToken} />*/}
          {/*    ) : (*/}
          {/*      <CaseDetailPage />*/}
          {/*    )*/}
          {/*  }*/}
          {/*/>*/}
          <Route path="cases/:id" element={<CaseDetailPage />} />

          {/*<Route*/}
          {/*  path="officers"*/}
          {/*  element={*/}
          {/*    !token ? (*/}
          {/*      <Authorization setToken={setToken} />*/}
          {/*    ) : (*/}
          {/*      <ListOfOfficers />*/}
          {/*    )*/}
          {/*  }*/}
          {/*/>*/}
          <Route path="officers" element={<ListOfOfficers />} />

          {/*<Route*/}
          {/*  path="officers/:id"*/}
          {/*  element={*/}
          {/*    !token ? (*/}
          {/*      <Authorization setToken={setToken} />*/}
          {/*    ) : (*/}
          {/*      <OfficerDetailPage />*/}
          {/*    )*/}
          {/*  }*/}
          {/*/>*/}
          <Route path="officers/:id" element={<OfficerDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
