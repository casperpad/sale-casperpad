import React, { useState, useEffect } from "react";

import {
  SiWebpack,
  AiFillTwitterCircle,
  AiOutlineMedium,
  FaTelegramPlane,
  BsCircleFill,
} from "react-icons/all";
import { ProgressBar } from "react-bootstrap";

import PropTypes from "prop-types";

import { initClient } from "../../xWeb3";

export default function CustomCardCASPER({ project, status }) {
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [info, setInfo] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const casperpadClient = await initClient(project.contractAddress);

        const response = await Promise.all([
          casperpadClient.queryContract("info"),
          casperpadClient.queryContract("auction_token_capacity"),
          casperpadClient.queryContract("total_participants"),
          casperpadClient.queryContract("sold_amount"),
        ]);

        const info = JSON.parse(response[0]);
        setInfo(info);

        setParticipants(response[2].toNumber());

        const totalPresaleAmount = response[1] / 10 ** info.token.decimals;
        setTotalPresaleAmount(response[1] / 10 ** info.token.decimals);

        const soldAmount = response[3] / 10 ** 9 / info.token.price;
        setSoldAmount(response[3] / 10 ** 9 / info.token.price);
        setProgressValue((soldAmount * 100) / totalPresaleAmount);
      } catch (err) {}
    }

    fetchData();
  }, []);

  const handleGoDetail = (projectAddress) => {
    window.location = "/project/casper/" + project.contractAddress;
  };

  return (
    <section
      className="custom-card cursor-pointer"
      onClick={() => handleGoDetail(project.contractAddress)}
    >
      <div className="custom-card-header">
        <div className="tokenLogo">
          <img src={info && info.links.logo} alt="project profile"></img>
        </div>
      </div>
      <div className="custom-card-title">
        <div>
          <strong>{info && info.name}</strong>
        </div>
        <div>
          <span
            className="status"
            style={{ backgroundColor: "rgb(255 0 0 / 25%)", color: "red" }}
          >
            <BsCircleFill
              style={{ fontSize: ".6rem", verticalAlign: "middle" }}
            />
            {status === "Coming"
              ? " Opens in Cspr"
              : status === "Opened"
              ? " Opened"
              : " Closed"}
          </span>{" "}
          &nbsp;
          <span className="status">BUSD</span> &nbsp;
          <span className="status">USDC</span>
        </div>
      </div>
      <hr className="card-hr" />
      <div className="custom-card-body">{info && info.description}</div>
      <div className="custom-card-footer">
        <div className="information">
          <div>
            Token Price
            <br />
            <span>{info && info.token.price}cspr</span>
          </div>
          <div>
            Cap
            <br />
            <span>
              {info && (totalPresaleAmount * info.token.price).toLocaleString()}
              cspr
            </span>
          </div>
          <div>
            Access
            <br />
            <span>Public</span>
          </div>
        </div>
        <div className="custom-progress-bar">
          <div className="progress-title">
            <span>Progress</span>
            <span>
              Participants{" "}
              <span style={{ color: "white", fontWeight: "bold" }}>
                {participants}
              </span>
            </span>
          </div>
          <ProgressBar now={progressValue} variant="pro" />
          <div className="progress-title">
            <span style={{ color: "white", fontWeight: "bold" }}>
              {progressValue.toFixed(2)}%
            </span>
            <span style={{ color: "white", fontWeight: "bold" }}>
              {soldAmount.toFixed(2) + "/" + totalPresaleAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="custom-card-title">
        <div className="social-links">
          <a href={info && info.links.webpackLink}>
            <SiWebpack className="social-link" />
          </a>
          <a href={info && info.links.twitterLink}>
            <AiFillTwitterCircle className="social-link" />
          </a>
          <a href={info && info.links.outlineLink}>
            <AiOutlineMedium className="social-link" />
          </a>
          <a href={info && info.links.telegramLink}>
            <FaTelegramPlane className="social-link" />
          </a>
        </div>
      </div>
    </section>
  );
}

CustomCardCASPER.propTypes = {
  project: PropTypes.object.isRequired,
};
