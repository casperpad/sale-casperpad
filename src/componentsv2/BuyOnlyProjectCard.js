import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import useBuyOnlyContract from "@hooks/binance/buyOnly";

export default function BuyOnlyProjectCard({ project, status }) {
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const naviagte = useNavigate();
  const { participants, loading } = useBuyOnlyContract(project.address);

  const progressValue = useMemo(() => {
    return (soldAmount / totalPresaleAmount) * 100;
  }, [totalPresaleAmount, soldAmount]);

  return (
    <button
      className="custom-card cursor-pointer"
      onClick={() => naviagte(`/project/binance/${project.address}`)}
    >
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
          <div className="currency-badge flex flex-row gap-2">
            <span
              className="status"
              style={{ backgroundColor: "rgb(255 0 0 / 25%)", color: "red" }}
            >
              <BsCircleFill
                style={{ fontSize: ".6rem", verticalAlign: "middle" }}
              />
              {status}
            </span>
            {project.payToken.map((token) => (
              <span key={token.address} className="status">
                {token.symbol}
              </span>
            ))}
          </div>
        </div>
        <hr className="card-hr" />
        <div className="custom-card-body">{project.description}</div>
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
              <span>Public</span>
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
            {loading ? (
              <Skeleton className="mb-2" />
            ) : (
              <div className="progress-title">
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {progressValue}%
                </span>
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {soldAmount + "/" + totalPresaleAmount}
                </span>
              </div>
            )}
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
    </button>
  );
}
