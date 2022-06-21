import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  SiWebpack,
  AiFillTwitterCircle,
  AiOutlineMedium,
  FaTelegramPlane,
  BsCircleFill,
} from "react-icons/all";
import { ProgressBar } from "react-bootstrap";

import { initClient } from "../xWeb3";

export default function CasperCard({ project, status }) {
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const casperpadClient = await initClient(project.contractHash);
        const response = await Promise.all([
          casperpadClient.queryContract("auction_token_capacity"),
          casperpadClient.queryContract("total_participants"),
          casperpadClient.queryContract("sold_amount"),
        ]);

        setParticipants(response[1].toNumber());

        const totalPresaleAmount = response[0] / 10 ** project.token.decimals;
        setTotalPresaleAmount(response[0] / 10 ** project.token.decimals);

        const soldAmount = response[2] / 10 ** 9 / project.token.price;
        setSoldAmount(response[2] / 10 ** 9 / project.token.price);
        setProgressValue((soldAmount * 100) / totalPresaleAmount);
        setLoading(false);
      } catch (err) {
        fetchData();
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      className="custom-card cursor-pointer"
      onClick={() => {
        navigate(`/project/casper/${project.contractHash}`);
      }}
    >
      <div className="custom-card-type">CASPER</div>
      <SkeletonTheme baseColor="#ffffff10" highlightColor="#ffffff20">
        <div className="custom-card-header">
          <div className="tokenLogo">
            <img src={project.links.logo} alt="project profile" />
          </div>
        </div>
        <div className="custom-card-title">
          <div className="min-h-[30px]">
            <strong>{project.name}</strong>
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
            <span className="status">CSPR</span> &nbsp;
          </div>
        </div>
        <hr className="card-hr" />
        <div className="custom-card-body">{project.description}</div>
        <div className="custom-card-footer">
          <div className="information">
            <div>
              Token Price
              <br />
              <span>{project.token.price + " cspr"}</span>
            </div>
            <div>
              Cap
              <br />
              <span>
                {(totalPresaleAmount * project.token.price).toLocaleString() +
                  " cspr"}
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
                  {loading ? <Skeleton /> : participants}
                </span>
              </span>
            </div>
            <ProgressBar now={progressValue} variant="pro" />
            <div className="progress-title">
              <span style={{ color: "white", fontWeight: "bold" }}>
                {loading ? (
                  <Skeleton height={14} width={40} />
                ) : (
                  progressValue.toFixed(2) + "%"
                )}
              </span>
              <span style={{ color: "white", fontWeight: "bold" }}>
                {loading ? (
                  <Skeleton height={14} width={150} />
                ) : (
                  soldAmount.toFixed(2) + "/" + totalPresaleAmount.toFixed(2)
                )}
              </span>
            </div>
          </div>
        </div>
      </SkeletonTheme>
      <div className="custom-card-title">
        <div className="social-links">
          <a href={project.links.site}>
            <SiWebpack className="social-link" />
          </a>
          <a href={project.links.twitter}>
            <AiFillTwitterCircle className="social-link" />
          </a>
          <a href={project.links.medium}>
            <AiOutlineMedium className="social-link" />
          </a>
          <a href={project.links.telegram}>
            <FaTelegramPlane className="social-link" />
          </a>
        </div>
      </div>
    </button>
  );
}
