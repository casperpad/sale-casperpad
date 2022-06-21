import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SiWebpack,
  AiFillTwitterCircle,
  AiOutlineMedium,
  FaTelegramPlane,
  BsCircleFill,
} from "react-icons/all";
import { ProgressBar } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BuyOnlyProjectCard({ project }) {
  const [loading, setLoading] = useState(true);
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [status, setStatus] = useState();

  useEffect(() => {}, []);

  const progressValue = useMemo(() => {
    return (soldAmount / totalPresaleAmount) * 100;
  }, [totalPresaleAmount, soldAmount]);

  return (
    <Link
      className="custom-card cursor-pointer"
      to={`/project/binance/${project.contractAddress}`}
    >
      <div className="custom-card-type">BINANCE</div>
      <SkeletonTheme baseColor="#ffffff10" highlightColor="#ffffff20">
        <div className="custom-card-header">
          <div className="tokenLogo">
            {loading ? (
              <Skeleton width={100} height={100} />
            ) : (
              <img src={project.links.logo} alt="project profile" />
            )}
          </div>
        </div>
        <div className="custom-card-title">
          <div>
            {loading ? (
              <Skeleton height={17} />
            ) : (
              <strong>{project.name}</strong>
            )}
          </div>
          <div className="currency-badge">
            <span
              className="status"
              style={{ backgroundColor: "rgb(255 0 0 / 25%)", color: "red" }}
            >
              <BsCircleFill
                style={{ fontSize: ".6rem", verticalAlign: "middle" }}
              />
              {status}
            </span>
          </div>
        </div>
        <hr className="card-hr" />
        <div className="custom-card-body">
          {loading ? <Skeleton height={17} count={4} /> : project.description}
        </div>
        <div className="custom-card-footer">
          <div className="information">
            <div>
              Token Price
              <br />
              <span>{project.token.price}</span>
            </div>
            <div>
              Cap
              <br />
              <span>{project.token.capacity}</span>
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
                Participants&nbsp;
                {loading ? (
                  <Skeleton />
                ) : (
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    {Number(participants)}
                  </span>
                )}
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
            <a href={project.links.webpackLink}>
              <SiWebpack className="social-link" />
            </a>
            <a href={project.links.twitterLink}>
              <AiFillTwitterCircle className="social-link" />
            </a>
            <a href={project.links.outlineLink}>
              <AiOutlineMedium className="social-link" />
            </a>
            <a href={project.links.telegramLink}>
              <FaTelegramPlane className="social-link" />
            </a>
          </div>
        </div>
      </SkeletonTheme>
    </Link>
  );
}
