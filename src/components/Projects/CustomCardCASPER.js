/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

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

  useEffect(async () => {
    try {
      const casperpadClient = await initClient();

      const projectUref = await casperpadClient.getProjectUrefById(
        project.contractAddress
      );
      const response = await Promise.all([
        casperpadClient.getDataByFieldName(projectUref, "users_length"),
        casperpadClient.getDataByFieldName(projectUref, "token_price"),
        casperpadClient.getDataByFieldName(projectUref, "total_invests_amount"),
        casperpadClient.getDataByFieldName(projectUref, "token_capacity"),
        casperpadClient.getDataByFieldName(projectUref, "cspr_price"),
        casperpadClient.getDataByFieldName(projectUref, "token_decimals"),
      ]);
      setParticipants(response[0].toNumber());
      setSoldAmount(
        (((response[2] / 10 ** 9) * response[4]) / response[1]).toFixed(2)
      );
      setTotalPresaleAmount(
        (response[3] / 10 ** response[5].toNumber()).toFixed(2)
      );
      setProgressValue(((response[2] * 100) / response[3]).toFixed(2));
      setProgressValue(
        (
          ((response[2] / 10 ** 9) * response[4] * 100) /
          ((response[1] / 10 ** response[5].toNumber()) * response[3])
        ).toFixed(2)
      );
    } catch (err) {}
  }, []);

  const handleGoDetail = (projectAddress) => {
    window.location = "/project/casper/" + projectAddress;
  };

  return (
    <section
      className="custom-card cursor-pointer"
      onClick={() => handleGoDetail(project.contractAddress)}
    >
      <div className="custom-card-header">
        <div className="tokenLogo">
          <img src={project.picture} alt="project profile"></img>
        </div>
      </div>
      <div className="custom-card-title">
        <div>
          <strong>{project.name + " (" + project.tier + " Tiers" + ")"}</strong>
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
      <div className="custom-card-body">{project.message}</div>
      <div className="custom-card-footer">
        <div className="information">
          <div>
            Token Price
            <br />
            <span>${project.swap_rate}</span>
          </div>
          <div>
            Cap
            <br />
            <span>{project.cap}</span>
          </div>
          <div>
            Access
            <br />
            <span>{project.access}</span>
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
              {progressValue}%
            </span>
            <span style={{ color: "white", fontWeight: "bold" }}>
              {soldAmount + "/" + totalPresaleAmount}
            </span>
          </div>
        </div>
      </div>
      <div className="custom-card-title">
        <div className="social-links">
          <a href={project.webpackLink}>
            <SiWebpack className="social-link" />
          </a>
          <a href={project.twitterLink}>
            <AiFillTwitterCircle className="social-link" />
          </a>
          <a href={project.outlineLink}>
            <AiOutlineMedium className="social-link" />
          </a>
          <a href={project.telegramLink}>
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
