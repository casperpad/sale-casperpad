import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SiWebpack,
  AiFillTwitterCircle,
  AiOutlineMedium,
  FaTelegramPlane,
  BsCircleFill,
  BiMoney,
  BsClockHistory,
} from "react-icons/all";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { useParams } from "react-router-dom";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ProgressBar } from "react-bootstrap";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

import useBuyOnlyContract from "@hooks/binance/buyOnly";
import EthereumBuyModal from "@components/modal/EthereumBuyModal";
import MyModal from "../../../components/modal/Modal";
import Loading from "../../../components/Project/Loading";
import { Container, Row, Col } from "react-bootstrap";
import { CHAIN_ID } from "../../../util/web3React";
import { getMerkleProof, generateLeaves, generateLeaf } from "./merkletree";

export default function TokenDetailNew(props) {
  const { status } = props;
  const address = useParams().address;
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(true);
  const [tier, setTier] = useState(0);
  const [investors, setInvestors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [accountVestedAmount, setAccountVestedAmount] = useState();

  const { account, active } = useWeb3React();
  const {
    participants,
    loading: contractDataLoading,
    loaded: contractDataLoaded,
    totalVested,
    merkleRoot,
    vestedAmount,
    addVest,
  } = useBuyOnlyContract(address);

  async function fetchData() {
    try {
      const res = await fetch(
        `${window.location.origin}/projects/ethereum/${CHAIN_ID}/${address}.json`
      );
      const data = await res.json();
      const investors = data.investors;
      const tier = data.tier;

      await fetchAccountVestedAmount();
      setTier(tier);
      setInvestors(investors);

      setInfo(data.info);
      setLoading(false);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setLoaded(false);
    }
  }

  const fetchAccountVestedAmount = useCallback(async () => {
    try {
      if (account === undefined) return;
      const amount = await vestedAmount(account);
      setAccountVestedAmount(amount.toString());
    } catch (err) {
      console.error(err);
    }
  }, [account, vestedAmount]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAccountVestedAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  async function handleAddVest(payCurrency, amount) {
    try {
      const proof = getMerkleProof(investors, tier, account);
      const tx = await addVest(
        proof,
        amount,
        payCurrency,
        BigNumber.from(tier[accountTier])
      );
      return tx;
    } catch (err) {
      toast.error(err.message);
    }
  }
  const currentTime = Date.now();

  const accountTier = useMemo(() => {
    return investors.find((investor) => investor.address === account)?.tier;
  }, [account, investors]);

  const whitelisted = useMemo(() => {
    if (accountTier === undefined || merkleRoot === undefined) return false;
    const leaves = generateLeaves(investors, tier);
    const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
    const proof = getMerkleProof(investors, tier, account);
    const leaf = generateLeaf(account, tier[accountTier]);
    const verified = merkleTree.verify(proof, leaf, merkleRoot);
    console.log(verified);
    return verified;
  }, [accountTier, investors, tier, account, merkleRoot]);

  const progressValue = useMemo(() => {
    return 0;
  }, []);

  const accountAllocation = useMemo(() => {
    if (tier[accountTier] === undefined || accountVestedAmount === undefined)
      return undefined;
    const accountTierAmount = BigNumber.from(tier[accountTier]);
    const available = accountTierAmount.sub(
      BigNumber.from(accountVestedAmount)
    );
    return formatUnits(available, 18);
  }, [accountVestedAmount, accountTier, tier]);

  const isSaleTime = useMemo(() => {
    return true;
  }, []);

  return (
    <>
      {loading || contractDataLoading || !loaded || !contractDataLoaded ? (
        <>
          <Loading
            loading={loading}
            loaded={loaded || contractDataLoaded}
            fetchData={fetchData}
          />
        </>
      ) : (
        <>
          <Container className="mt-5 mb-5">
            <Col>
              <Col>
                <Row className="mt-auto">
                  <Col className="toekn-detail-header d-flex mt-5">
                    <div className="tokenLogo mr-5">
                      <img src={info.links.logo} alt="project profile"></img>
                    </div>
                    <div className="custom-card-title">
                      <h2 className="text-white mb-auto  tokenLogoTitle">
                        {info.name}
                      </h2>
                    </div>
                  </Col>
                  <Col className="custom-card-header">
                    <div>
                      <div className="grid-box">
                        <div
                          className="text-white my-0 ml-3"
                          style={{ fontSize: "1.5rem" }}
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
                            style={{
                              fontSize: ".6rem",
                              verticalAlign: "middle",
                            }}
                          />
                          {status}
                        </span>{" "}
                        &nbsp;
                        <span className="status">BUSD</span> &nbsp;
                        <span className="status">USDC</span>
                      </div>
                      <hr />
                      <div className="text-white">
                        <div className="mb-4">{info.description}</div>
                        {!active && (
                          <button
                            className="btn btn-wallet wallet-connected"
                            onClick={() => setIsOpen(true)}
                          >
                            Connect Wallet
                          </button>
                        )}

                        {isSaleTime ? (
                          whitelisted ? (
                            <button
                              className="btn btn-wallet wallet-connected mr-4 mb-2"
                              onClick={() => setIsOpenBuy(true)}
                            >
                              <BiMoney /> Buy {info.token.symbol} (WhiteList)
                            </button>
                          ) : null
                        ) : (
                          accountTier > 0 &&
                          active &&
                          info.startTime > 0 &&
                          currentTime <= info.endTime &&
                          currentTime < info.startTime && (
                            <button
                              className="btn btn-wallet wallet-connected mx-auto mb-2"
                              disabled
                            >
                              <BsClockHistory />
                              {/* {tmp_day_wl} Days {tmp_hour_wl}{" "}
                            Hours {tmp_min_wl} Mins {tmp_sec_wl} Secs */}
                            </button>
                          )
                        )}
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
                  </Col>
                </Row>
              </Col>
              <Col>
                <SkeletonTheme baseColor="#ffffff10" highlightColor="#ffffff20">
                  <section className="custom-card-detail text-white">
                    <div className="grid-box">
                      <div> Your balance </div>
                      <div> Allocation </div>
                    </div>
                    <div className="grid-box text-white">
                      <div style={{ paddingRight: "3rem" }}>-</div>
                      {loading ? (
                        <Skeleton />
                      ) : accountAllocation ? (
                        <div>{accountAllocation + " USD"}</div>
                      ) : (
                        <div> This wallet is not whitelisted </div>
                      )}
                    </div>
                    <hr className="bg-gray-100" />
                    <div className="grid-box">
                      <div className="text-white"> {status} </div>
                    </div>
                    <div className="custom-card-footer detail-bar">
                      <div className="custom-progress-bar">
                        <div className="progress-title">
                          <span>Progress</span>
                          <span>
                            Participants{" "}
                            <span
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              {participants}
                            </span>
                          </span>
                        </div>
                        <ProgressBar now={progressValue} variant="pro" />
                        <div className="progress-title">
                          <span style={{ color: "white", fontWeight: "bold" }}>
                            {progressValue.toFixed(5)}%
                          </span>
                          <span style={{ color: "white", fontWeight: "bold" }}>
                            {/* {soldAmount.toFixed(5) +
                          "/" +
                          totalPresaleAmount.toFixed(5)} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                </SkeletonTheme>
              </Col>
            </Col>
          </Container>
          <MyModal isOpen={isOpen} setIsOpen={setIsOpen} />
          <EthereumBuyModal
            isOpen={isOpenBuy}
            payToken={info.payToken}
            handleClose={() => setIsOpenBuy(false)}
            accountAllocation={accountAllocation}
            tokenPrice={info.token.price}
            tokenSymbol={info.token.symbol}
            proof={getMerkleProof(investors, tier, account)}
            contractAddress={address}
            handleAddVest={handleAddVest}
          />
        </>
      )}
    </>
  );
}
