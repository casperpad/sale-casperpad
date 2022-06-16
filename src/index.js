import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "./assets/css/bootstrap.min.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { DAppProvider } from "@usedapp/core";
import { CHAIN_ID } from "./config/binance";

ReactDOM.render(
  <DAppProvider config={{ supportedChains: CHAIN_ID }}>
    <App />
  </DAppProvider>,
  document.getElementById("root")
);

reportWebVitals();
