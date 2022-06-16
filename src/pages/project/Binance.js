import React, { useEffect, useState } from "react";
import ProjectDetailNew from "../../components/Project/ProjectDetailSkypublic";
import TokenDetailNew from "../../components/Project/TokenDetailCASPER";

export default function Binance() {
  console.log("Binance project is rendering");

  return (
    <>
      <TokenDetailNew />
      <ProjectDetailNew />
    </>
  );
}
