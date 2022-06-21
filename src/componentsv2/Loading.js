import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = (props) => {
  const { loading, loaded, fetchData } = props;

  return (
    <div className="load-data">
      <div className={"load-status text-white " + (loading ? "" : "hide")}>
        <Spinner animation="border" className="claim-spinner" />
      </div>
      <div
        className={
          "load-status text-white " + (!loading && !loaded ? "" : "hide")
        }
      >
        <button
          className="btn btn-wallet wallet-connected"
          onClick={() => fetchData()}
        >
          <h1>Try again!</h1>
        </button>
      </div>
    </div>
  );
};

export default Loading;
