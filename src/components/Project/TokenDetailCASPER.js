/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

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
import BuyModal from "../modal/BuyModalCASPER";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import { utils } from "casper-js-client-helper";
import useNetworkStatus from "../../store/useNetworkStatus";
import { initClient, getAccountHashString } from "../../xWeb3";

import { ERC20Client } from "casper-erc20-js-client";
import { NODE_ADDRESS, CHAIN_NAME } from "../../xWeb3/constants";

import { casperProjects } from "../../assets/variables";
import { CLPublicKey } from "casper-js-sdk";

export default function TokenDetailNew({ address }) {
  const currentTime = new Date().getTime();
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState(-1);
  const [project, setProject] = useState();
  const [status, setStatus] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [participants, setParticipants] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState(-1);
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(1000);
  const [tier, setTier] = useState(-1);
  const [saleStartTime, setSaleStartTime] = useState(0);
  const [saleEndTime, setSaleEndTime] = useState(0);
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [remainAmount, setRemainAmount] = useState(0);
  const [csprPrice, setCsprPrice] = useState(0);
  const [token_cspr, setToken_cspr] = useState(0);
  const [cspr_token, setCspr_token] = useState(0);
  const [projectUref, setProjectUref] = useState();
  const [merkleRoot, setMerkleRoot] = useState();

  const {
    casperConnected,
    casperAddress,
    setProjectLoading,
    setProjectLoaded,
    projectLoading,
    projectLoaded,
  } = useNetworkStatus();

  useEffect(() => {
    casperProjects.forEach((project, index) => {
      if (project.contractAddress === address) {
        setProject(project);
        setProjectId(index);
      }
    });
    setProjectLoading(true, 0);
    setProjectLoaded(false, 0);
  }, []);

  useEffect(async () => {
    setProjectLoading(loading, 0);
    if (loading === false) return;
    try {
      const casperpadClient = await initClient();

      const merkleRoot = await casperpadClient.queryContract("merkle_root");
      setMerkleRoot(merkleRoot);
      const projectUref = await casperpadClient.getProjectUrefById(address);
      setProjectUref(projectUref);
      const response = await Promise.all([
        casperpadClient.getDataByFieldName(projectUref, "status"), // 0
        casperpadClient.getDataByFieldName(projectUref, "users_length"), // 1
        casperpadClient.getDataByFieldName(projectUref, "token_symbol"), // 2
        casperpadClient.getDataByFieldName(projectUref, "token_price"), // 3
        casperpadClient.getDataByFieldName(projectUref, "token_decimals"), // 4
        casperpadClient.getDataByFieldName(projectUref, "token_address"), // 5
        casperpadClient.getDataByFieldName(projectUref, "sale_start_time"), // 6
        casperpadClient.getDataByFieldName(projectUref, "sale_end_time"), // 7
        casperpadClient.getDataByFieldName(projectUref, "total_invests_amount"), // 8
        casperpadClient.getDataByFieldName(projectUref, "cspr_price"), // 9
        casperpadClient.getDataByFieldName(projectUref, "token_capacity"), // 10
      ]);

      setStatus(response[0].toNumber() === 1 ? "Closed" : "");
      setParticipants(response[1].toNumber());
      setTokenSymbol(response[2]);
      setTokenPrice(response[3]);
      setTokenDecimals(response[4].toNumber());
      const tokenAddress = utils.toAccountHashString(response[5]);
      setTokenAddress(tokenAddress);
      setSaleStartTime(response[6].toNumber());
      setSaleEndTime(response[7].toNumber());
      setCsprPrice(response[9]);

      const soldAmount = (
        ((response[8] / 10 ** 9) * response[9]) /
        response[3]
      ).toFixed(5);
      setSoldAmount(soldAmount);

      const totalPresaleAmount = (
        response[10] /
        10 ** response[4].toNumber()
      ).toFixed(5);
      setTotalPresaleAmount(totalPresaleAmount);

      const remainAmount = (totalPresaleAmount - soldAmount).toFixed(5);
      setRemainAmount(remainAmount);

      setToken_cspr(Math.round((response[3] / response[9]) * 10 ** 9));
      setCspr_token(
        Math.round((response[9] / response[3]) * 10 ** response[4].toNumber())
      );

      setProgressValue(
        (
          ((response[8] / 10 ** 9) * response[9] * 100) /
          ((response[10] / 10 ** response[4].toNumber()) * response[3])
        ).toFixed(5)
      );
      setProjectLoaded(true, 0);
    } catch (err) {
      setProjectLoaded(false, 0);
      console.log("TokenDetail", err);
    }
    setLoading(false);
    setProjectLoading(false, 0);
  }, [loading]);

  useEffect(async () => {
    if (casperAddress === "" || tokenAddress === "") return;
    const erc20 = new ERC20Client(NODE_ADDRESS, CHAIN_NAME, undefined);
    await erc20.setContractHash(tokenAddress);
    const publicKey = CLPublicKey.fromHex(casperAddress);
    try {
      const balance = await erc20.balanceOf(publicKey);
      setTokenBalance(balance);
    } catch (err) {
      setTokenBalance(-1);
    }
    try {
      const casperpadClient = await initClient();
      const tier = await casperpadClient.getAmountDataOfAccount(
        getAccountHashString(casperAddress),
        address,
        "tiers"
      );
      setTier(tier / 10 ** 9);
    } catch (err) {
      setTier(-1);
    }
  }, [casperAddress, tokenAddress]);

  let temp = Math.floor(
    (saleEndTime - Math.floor(new Date().getTime())) / 1000
  );
  let tmp_sec_wl = temp % 60;
  let tmp_min_wl = Math.floor(temp / 60) % 60;
  let tmp_hour_wl = Math.floor(temp / 3600) % 24;
  let tmp_day_wl = Math.floor(temp / 3600 / 24);

  const [, setTimeTemp] = useState();

  setInterval(myTimer, 1000);
  function myTimer() {
    if (saleStartTime === 0) return;
    temp = Math.floor(
      (saleStartTime - Math.floor(new Date().getTime())) / 1000
    );
    tmp_sec_wl = temp % 60;
    tmp_min_wl = Math.floor(temp / 60) % 60;
    tmp_hour_wl = Math.floor(temp / 3600) % 24;
    tmp_day_wl = Math.floor(temp / 3600 / 24);

    setTimeTemp(temp);
  }

  function connectWallet() {
    setIsOpen(true);
  }

  function handleBuyToken(flag) {
    if (casperConnected) setIsOpenBuy(true);
  }

  return (
    <>
      <div
        className={"load-status text-white " + (projectLoading ? "" : "hide")}
      >
        <Spinner animation="border" className="claim-spinner" />
      </div>
      <div
        className={
          "load-status text-white " +
          (!projectLoading && !projectLoaded ? "" : "hide")
        }
      >
        <button
          className="btn btn-wallet wallet-connected"
          onClick={() => setLoading(true)}
        >
          <h1>Try again!</h1>
        </button>
      </div>
      <Container
        className={"mb-5 " + (!projectLoading && projectLoaded ? "" : "hide")}
      >
        <Row>
          <Col sm={5}>
            <section className="mt-auto">
              <div className="toekn-detail-header d-flex mt-5">
                <div className="tokenLogo mr-5">
                  <img
                    src={project ? project.picture : ""}
                    alt="project profile"
                  ></img>
                </div>
                <div className="custom-card-title">
                  <h2 className="text-white mb-auto  tokenLogoTitle">
                    {project ? project.name : ""}
                  </h2>
                </div>
              </div>
              <div className="custom-card-header">
                <div>
                  <div className="grid-box">
                    <div
                      className="text-white my-0 ml-3"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {tokenSymbol}
                    </div>
                  </div>
                  <div className="buyBtnContainer d-flex">
                    <span
                      className="status"
                      style={{
                        backgroundColor: "rgb(255 0 0 / 25%)",
                        color: "red",
                      }}
                    >
                      <BsCircleFill
                        style={{ fontSize: ".6rem", verticalAlign: "middle" }}
                      />
                      {status === "Coming"
                        ? " Opens in TBA"
                        : status === "Opened"
                        ? " Opened"
                        : " Closed"}
                    </span>{" "}
                    &nbsp;
                    <span className="status">BUSD</span> &nbsp;
                    <span className="status">USDC</span>
                  </div>
                  <hr />
                  <div className="text-white">
                    <div className="mb-4">{project ? project.message : ""}</div>
                    {!casperConnected && (
                      <button
                        className="btn btn-wallet wallet-connected"
                        onClick={connectWallet}
                      >
                        {" "}
                        Connect Wallet{" "}
                      </button>
                    )}

                    {(tier > 0 &&
                      casperConnected &&
                      saleStartTime > 0 &&
                      currentTime <= saleEndTime &&
                      currentTime >= saleStartTime && (
                        <button
                          className="btn btn-wallet wallet-connected mr-4 mb-2"
                          onClick={() => handleBuyToken(true)}
                        >
                          {" "}
                          <BiMoney /> Buy {tokenSymbol} (WhiteList){" "}
                        </button>
                      )) ||
                      (tier > 0 &&
                        casperConnected &&
                        saleStartTime > 0 &&
                        currentTime <= saleEndTime &&
                        currentTime < saleStartTime && (
                          <button
                            className="btn btn-wallet wallet-connected mx-auto mb-2"
                            disabled
                          >
                            {" "}
                            <BsClockHistory /> {tmp_day_wl} Days {tmp_hour_wl}{" "}
                            Hours {tmp_min_wl} Mins {tmp_sec_wl} Secs
                          </button>
                        ))}

                    {/* {((tier > 0 && currentTime >= startFcfsTime && currentTime <= saleEndTime && currentTime >= saleStartTime) && (
                        <button className="btn btn-wallet wallet-connected mx-auto mb-2" onClick={ () => handleBuyToken(false) }> <BiMoney /> Buy SWPR ( FCFS ) </button>
                    )) || ((tier > 0 && currentTime < startFcfsTime && currentTime <= saleEndTime && currentTime >= saleStartTime) && ( <button className="btn btn-wallet wallet-connected mx-auto mb-2" disabled> <BsClockHistory /> {tmp_day_fcfs} Days {tmp_hour_fcfs} Hours {tmp_min_fcfs} Mins {tmp_sec_fcfs} Sec</button>
                    ))} */}
                  </div>
                  <div className="mt-3">
                    <div className="social-links">
                      <a href="https://www.the-swappery.io">
                        <SiWebpack className="social-link" />
                      </a>
                      <a href="https://twitter.com/TheSwappery">
                        <AiFillTwitterCircle className="social-link" />
                      </a>
                      <a href="https://theswappery.medium.com">
                        <AiOutlineMedium className="social-link" />
                      </a>
                      <a href=" https://t.me/TheSwapperyAnn ">
                        <FaTelegramPlane className="social-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Col>
          <Col sm={7}>
            <section className="custom-card-detail text-white">
              <div className="grid-box">
                <div> Your balance </div>
                <div> Allocation </div>
              </div>
              <div className="grid-box text-white">
                <div style={{ paddingRight: "3rem" }}>
                  {" "}
                  {tokenBalance < 0
                    ? "-"
                    : tokenBalance / 10 ** tokenDecimals +
                      " " +
                      tokenSymbol}{" "}
                </div>
                {(tier !== -1 && (
                  <div>
                    {" "}
                    {Number((tier * csprPrice) / 10 ** 18).toFixed(2) +
                      " USD"}{" "}
                  </div>
                )) || <div> This wallet is not whitelisted </div>}
                <div style={{ paddingRight: "3rem" }}> {} </div>
                {tier !== -1 && (
                  <div> {Number(tier).toFixed(2) + " CSPR"} </div>
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
                <div> {Number(soldAmount).toFixed(2) + " " + tokenSymbol} </div>
                <div> {remainAmount + " " + tokenSymbol} </div>
              </div>
              <div className="grid-box text-white">
                <div>
                  {" "}
                  {((soldAmount * tokenPrice) / 10 ** 18).toFixed(2) +
                    " USD"}{" "}
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
                      {progressValue}%
                    </span>
                    <span
                      style={{ color: "white", fontWeight: "bold" }}
                    >{`${soldAmount}/${totalPresaleAmount}`}</span>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} onlyOneToast={true} />
      <BuyModal
        isOpen={isOpenBuy}
        setIsOpen={setIsOpenBuy}
        onlyOneToast={false}
        projectId={projectId}
        projectName={address}
        projectUref={projectUref}
        tier={tier}
        tokenSymbol={tokenSymbol}
        tokenDecimals={tokenDecimals}
        cspr_token={cspr_token}
        token_cspr={token_cspr}
        merkleRoot={merkleRoot}
      />
    </>
  );
}
