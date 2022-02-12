import React from "react";
import App from "./App";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import reportWebVitals from "./reportWebVitals";

axios.defaults.baseURL = "https://sf-final-project.herokuapp.com/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
