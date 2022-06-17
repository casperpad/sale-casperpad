import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./util/web3React";

import "./assets/css/bootstrap.min.css";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById("root")
);

reportWebVitals();
