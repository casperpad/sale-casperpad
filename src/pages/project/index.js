import React from "react";
import { Route, Routes } from "react-router-dom";

import CasperProject from "./Casper";
import CasperProjectPublic from "./CasperPublic";
import BinanceProject from "./binance";

export default function Project() {
  return (
    <>
      <Routes>
        <Route
          path="/casper/private/:contractHash"
          element={<CasperProject />}
        />
        <Route
          path="/casper/public/:contractHash"
          element={<CasperProjectPublic />}
        />
        <Route path="/binance/:state/:address" element={<BinanceProject />} />
      </Routes>
    </>
  );
}
