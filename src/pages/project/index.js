import React from "react";
import { Route, Routes } from "react-router-dom";

import CasperProject from "./Casper";
import BinanceProject from "./Binance";

export default function Project() {
  return (
    <>
      <Routes>
        <Route path="/casper/:address" element={<CasperProject />} />
        <Route path="/binance/:address" element={<BinanceProject />} />
      </Routes>
    </>
  );
}
