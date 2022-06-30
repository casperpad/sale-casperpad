import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import {
  SiWebpack,
  AiFillTwitterCircle,
  AiOutlineMedium,
  FaTelegramPlane,
  BsCircleFill,
  BiMoney,
  BsClockHistory,
} from "react-icons/all";
import { ProgressBar } from "react-bootstrap";
import MyModal from "../modal/Modal";
import BuyModal from "../modal/BuyModalCasperPublic";
import { Container, Row, Col } from "react-bootstrap";

import useNetworkStatus from "../../store/useNetworkStatus";

export default function TokenDetailNew(props) {
  const {
    info,
    balance,
    vestAmount,
    totalPresaleAmount,
    soldAmount,
    progressValue,
    status,
    participants,
    contractAddress,
    minAmount,
    maxAmount,
    fetchData,
  } = props;

  const { startTime, endTime } = info;

  const currentTime = new Date().getTime();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBuy, setIsOpenBuy] = useState(false);

  const { casperConnected, userDataLoading } = useNetworkStatus();

  let temp = Math.floor((startTime - Math.floor(Date.now())) / 1000);
  let tmp_sec_wl = temp % 60;
  let tmp_min_wl = Math.floor(temp / 60) % 60;
  let tmp_hour_wl = Math.floor(temp / 3600) % 24;
  let tmp_day_wl = Math.floor(temp / 3600 / 24);

  const [, setTimeTemp] = useState(0);

  let interval = setInterval(myTimer, 1000);
  function myTimer() {
    if (startTime === 0) return;
    if (startTime < Math.floor(Date.now())) clearInterval(interval);
    temp = Math.floor((startTime - Math.floor(Date.now())) / 1000);
    tmp_sec_wl = temp % 60;
    tmp_min_wl = Math.floor(temp / 60) % 60;
    tmp_hour_wl = Math.floor(temp / 3600) % 24;
    tmp_day_wl = Math.floor(temp / 3600 / 24);

    setTimeTemp(temp);
  }

  function connectWallet() {
    setIsOpen(true);
  }

  function handleBuyToken() {
    if (casperConnected) setIsOpenBuy(true);
  }

  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col sm={5}>
            <section className="mt-auto">
              <div className="toekn-detail-header d-flex mt-5">
                <div className="tokenLogo mr-5">
                  <img src={info.links.logo} alt="project profile"></img>
                </div>
                <div className="custom-card-title">
                  <h2 className="text-white mb-auto  tokenLogoTitle">
                    {info.name}
                  </h2>
                </div>
              </div>
              <div className="custom-card-header">
                <div>
                  <div className="grid-box">
                    <div
                      className="text-white ml-3"
                      style={{ fontSize: "1.5rem", marginTop: "1rem" }}
                    >
                      {info.token.symbol}
                    </div>
                  </div>
                  <div className="buyBtnContainer d-flex">
                    <span
                      className="status"
                      style={{
                        backgroundColor:
                          status === "Opened"
                            ? "rgb(0 255 0 / 10%)"
                            : "rgb(255 0 0 / 25%)",
                        color: status === "Opened" ? "green" : "red",
                      }}
                    >
                      <BsCircleFill
                        style={{ fontSize: ".6rem", verticalAlign: "middle" }}
                      />
                      {status === "Coming"
                        ? " Opens in Cspr"
                        : status === "Opened"
                        ? " Opened"
                        : " Closed"}
                    </span>
                    &nbsp;
                    <span className="status">CSPR</span> &nbsp;
                  </div>
                  <hr />
                  <div className="text-white">
                    <div className="mb-4">{info.description}</div>
                    {!casperConnected && (
                      <button
                        className="btn btn-wallet wallet-connected"
                        onClick={connectWallet}
                      >
                        Connect Wallet
                      </button>
                    )}

                    {(casperConnected &&
                      startTime > 0 &&
                      !userDataLoading &&
                      currentTime <= endTime &&
                      currentTime >= startTime && (
                        <button
                          className="btn btn-wallet wallet-connected mr-4 mb-2"
                          onClick={() => handleBuyToken()}
                        >
                          {" "}
                          <BiMoney /> Buy {info.token.symbol}{" "}
                        </button>
                      )) ||
                      (casperConnected &&
                        startTime > 0 &&
                        currentTime <= endTime &&
                        currentTime < startTime && (
                          <button
                            className="btn btn-wallet wallet-connected mx-auto mb-2"
                            disabled
                          >
                            {" "}
                            <BsClockHistory /> {tmp_day_wl} Days {tmp_hour_wl}{" "}
                            Hours {tmp_min_wl} Mins {tmp_sec_wl} Secs
                          </button>
                        ))}
                  </div>
                  <div className="mt-3">
                    <div className="social-links">
                      <a href={info.links.site}>
                        <SiWebpack className="social-link" />
                      </a>
                      <a href={info.links.twitter}>
                        <AiFillTwitterCircle className="social-link" />
                      </a>
                      <a href={info.links.medium}>
                        <AiOutlineMedium className="social-link" />
                      </a>
                      <a href={info.links.telegram}>
                        <FaTelegramPlane className="social-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Col>
          <Col sm={7}>
            <SkeletonTheme baseColor="#ffffff10" highlightColor="#ffffff20">
              <section className="custom-card-detail text-white">
                <div className="grid-box">
                  <div> Your balance </div>
                  <div> Allocation </div>
                </div>
                <div className="grid-box text-white">
                  <div style={{ paddingRight: "3rem" }}>
                    {" "}
                    {userDataLoading ? (
                      <Skeleton />
                    ) : balance < 0 ? (
                      "-"
                    ) : (
                      balance + " " + info.token.symbol
                    )}{" "}
                  </div>
                  {userDataLoading ? (
                    <Skeleton />
                  ) : (
                    <div> {(maxAmount - vestAmount).toFixed(2) + " CSPR"} </div>
                  )}
                </div>
                <hr className="bg-gray-100" />
                <div className="grid-box">
                  <div className="text-white"> {status} </div>
                </div>
                <hr className="bg-gray-100" />
                <div className="grid-box">
                  <div> Total Locked </div>
                  <div> Remaining Allocation: </div>
                </div>
                <div className="grid-box text-white">
                  <div> {soldAmount.toFixed(5) + " " + info.token.symbol} </div>
                  <div>
                    {" "}
                    {(totalPresaleAmount - soldAmount).toFixed(5) +
                      " " +
                      info.token.symbol}{" "}
                  </div>
                </div>
                <div className="grid-box text-white">
                  <div>
                    {" "}
                    {(soldAmount * info.token.price).toFixed(5) + " CSPR"}{" "}
                  </div>
                </div>
                <hr className="bg-gray-100" />
                <div className="custom-card-footer detail-bar">
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
                        {soldAmount.toFixed(2) +
                          "/" +
                          totalPresaleAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </SkeletonTheme>
          </Col>
        </Row>
      </Container>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} onlyOneToast={true} />
      <BuyModal
        isOpen={isOpenBuy}
        setIsOpen={setIsOpenBuy}
        vestAmount={vestAmount}
        tokenPrice={info.token.price}
        tokenSymbol={info.token.symbol}
        contractAddress={contractAddress}
        minAmount={minAmount}
        maxAmount={maxAmount}
        fetchData={fetchData}
      />
    </>
  );
}
