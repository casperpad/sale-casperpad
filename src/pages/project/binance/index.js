import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAddress } from "@ethersproject/address";
import ProjectDetail from "./ProjectDetail";
import TokenDetail from "./TokenDetail";
import TokenDetailPublic from "./TokenDetailPublic";
import Loading from "../../../components/Project/Loading";

export default function Binance() {
  const address = useParams().address;
  const state = useParams().state;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const result = getAddress(address);
      setLoading(false);
    } catch (error) {
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loading loading={loading} loaded={true} />
      ) : state === "public" ? (
        <>
          <TokenDetailPublic />
          <ProjectDetail />
        </>
      ) : (
        <>
          <TokenDetail />
          <ProjectDetail />
        </>
      )}
    </>
  );
}
