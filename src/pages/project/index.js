import React from "react";
import { Route, Routes } from "react-router-dom";

import CasperProject from "./Casper";
import BinanceProject from "./binance";

export default function Project() {
  return (
    <>
      <Routes>
        <Route path="/casper/:contractHash" element={<CasperProject />} />
        <Route path="/binance/:address" element={<BinanceProject />} />
      </Routes>
    </>
  );
}
