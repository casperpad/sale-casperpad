/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { BiMoney, BiKey } from "react-icons/all";
import { Container, Row, Col, Table, Tabs, Tab } from "react-bootstrap";
import { Toast } from "react-bootstrap";

import { initClient, newCasperClient, getAccountHashString } from "../../xWeb3";
import useNetworkStatus from "../../store/useNetworkStatus";
import { casperProjects } from "../../assets/variables";
import { whitelist } from "../../contract_info/whitelistCASPER";

const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

export default function ProjectDetailCASPER({ address }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  //const tmpSoldAmount = useTempSoldAmount();
  const [loading, setLoading] = useState(true);
  const [openTime, setOpenTime] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [tokenCapacity, setTokenCapacity] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [name, setName] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [verified, setVerified] = useState(false);
  const [projectId, setProjectId] = useState(-1);
  const [merkleRoot, setMerkleRoot] = useState();
  const [pending, setPending] = useState(false);
  //let isAdmin_tmp = useIsAdmin(account);
  //let soldAmount_tmp = useSoldAmount();

  const currentTime = new Date().getTime();

  const {
    setProjectLoading,
    setProjectLoaded,
    projectLoading,
    projectLoaded,
    casperAddress,
    claimDeployHash,
    setClaimDeployHash,
  } = useNetworkStatus();

  useEffect(() => {
    casperProjects.forEach((project, index) => {
      if (project.contractAddress === address) {
        setProjectId(index);
      }
    });
  }, []);

  useEffect(async () => {
    if (casperAddress === "") {
      setVerified(false);
      return;
    }
    const leaves = whitelist[projectId].map(keccak256);
    const tree = new MerkleTree(leaves, keccak256);

    const leaf = keccak256(getAccountHashString(casperAddress));
    const proof = tree.getProof(leaf);

    const _verified = tree.verify(proof, leaf, merkleRoot);
    setVerified(_verified);

    const casperpadClient = await initClient();
    const isAdmin = await casperpadClient.isAdmin(casperAddress);
    setIsAdmin(isAdmin);
  }, [casperAddress]);

  useEffect(() => {
    if (projectLoading === false) return;
    setLoading(projectLoading);
  }, [projectLoading]);

  useEffect(async () => {
    setProjectLoading(loading, 1);
    try {
      const casperpadClient = await initClient();

      const res = await Promise.all([
        casperpadClient.queryContract("merkle_root"),
        casperpadClient.getProjectUrefById(address),
      ]);
      setMerkleRoot(res[0]);
      const projectUref = res[1];
      const response = await Promise.all([
        casperpadClient.getDataByFieldName(projectUref, "open_time"), //0
        casperpadClient.getDataByFieldName(projectUref, "token_symbol"), //1
        casperpadClient.getDataByFieldName(projectUref, "token_price"), //2
        casperpadClient.getDataByFieldName(projectUref, "token_decimals"), //3
        casperpadClient.getDataByFieldName(projectUref, "token_capacity"), //4
        casperpadClient.getDataByFieldName(projectUref, "users_length"), //5
        casperpadClient.getDataByFieldName(projectUref, "total_invests_amount"), //6
        casperpadClient.getDataByFieldName(projectUref, "name"), //7
        casperpadClient.getDataByFieldName(projectUref, "schedules"), //8
        casperpadClient.getDataByFieldName(projectUref, "cspr_price"), //9
      ]);

      const date = new Date(response[0].toNumber()).toLocaleString("en-US");
      setOpenTime(date);
      setTokenSymbol(response[1]);
      setTokenPrice(response[2] / 10 ** response[3].toNumber());
      setTokenDecimals(response[3].toNumber());
      setTokenCapacity(response[4] / 10 ** response[3].toNumber());
      setParticipants(response[5].toNumber());
      setSoldAmount(
        (((response[6] / 10 ** 9) * response[9]) / 10 ** 18).toFixed(2)
      );
      setName(response[7]);
      setSchedules(response[8]);
      setProjectLoaded(true, 1);
    } catch (err) {
      setProjectLoaded(false, 1);
      console.log("ProjectDetail", err);
    }
    setLoading(false);
    setProjectLoading(false, 1);
  }, [loading]);

  const handleClaim = async (index) => {
    const casperpadClient = await initClient();
    const deployHash = await casperpadClient.claim(
      address,
      index,
      casperAddress
    );
    setClaimDeployHash(deployHash);
  };

  useEffect(async () => {
    if (claimDeployHash === "") {
      setPending(false);
      return;
    }
    const client = newCasperClient();
    const [, deployResult] = await client.getDeploy(claimDeployHash);
    if (deployResult.execution_results.length === 0) setPending(true);
    else setPending(false);
  }, [claimDeployHash]);

  return (
    <>
      {/* <button onClick={ handleTransferOwnership }>test</button> */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={7000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Notice</strong>
          <small className="mr-auto"></small>
        </Toast.Header>
        <Toast.Body>{toastText}</Toast.Body>
      </Toast>
      <Container className={!projectLoading && projectLoaded ? "" : "hide"}>
        <Tabs
          defaultActiveKey="project"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="project" title="Project">
            <Row>
              <Col sm={6}>
                <div>
                  <Table responsive="sm" className="text-white">
                    <thead>
                      <tr>
                        <th colSpan="2">Project Information</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Opens</td>
                        <td>{openTime}</td>
                      </tr>
                      <tr>
                        <td>Token Price</td>
                        <td>{`1 ${tokenSymbol} = ${tokenPrice} USD`}</td>
                      </tr>
                      <tr>
                        <td>Cap</td>
                        <td>{tokenCapacity + " " + tokenSymbol}</td>
                      </tr>
                      <tr>
                        <td>Total Users Participated</td>
                        <td>{participants}</td>
                      </tr>
                      <tr>
                        <td>Total Funds Sold</td>
                        <td>{"$ " + soldAmount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col sm={6}>
                <div>
                  <Table responsive="sm" className="text-white">
                    <thead>
                      <tr>
                        <th colSpan="2">Token Information</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{name}</td>
                      </tr>
                      <tr>
                        <td>Token Symbol</td>
                        <td>{tokenSymbol}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="allocation" title="Allocation">
            <Row>
              <Col sm={9}>
                <div>
                  <Table responsive="sm" className="text-white">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Allocation</th>
                        <th>Percentage</th>
                        <th>Date</th>
                        <th>Claimed</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.map(async (schedule, index) => {
                        const casperpadClient = await initClient();
                        const time = schedule.data[0].data.toNumber();
                        const percentage =
                          schedule.data[1].data.toNumber() / 1000;
                        const response = await Promise.all([
                          casperpadClient
                            .getAmountDataOfAccount(
                              getAccountHashString(casperAddress),
                              address,
                              "invests"
                            )
                            .catch((err) => {
                              return 0;
                            }),
                          casperpadClient
                            .getAmountDataOfAccount(
                              getAccountHashString(casperAddress),
                              address,
                              "claims"
                            )
                            .catch((err) => {
                              return 0;
                            }),
                        ]);
                        const scheduleAmount =
                          response[0] / 10 ** tokenDecimals;
                        const isClaimed = response[1] / 10 ** tokenDecimals;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{scheduleAmount + " " + tokenSymbol}</td>
                            <td>{percentage + "%"}</td>
                            <td>{new Date(time).toLocaleString("en-US")}</td>
                            <td>
                              {currentTime >= time && isClaimed
                                ? scheduleAmount
                                : 0}
                              {" " + tokenSymbol}
                            </td>
                            <td>
                              {(currentTime >= time &&
                                verified &&
                                !pending &&
                                isClaimed === 0 && (
                                  <>
                                    <button
                                      className="btn btn-wallet wallet-connected"
                                      onClick={() => handleClaim(index)}
                                    >
                                      {" "}
                                      Claim{" "}
                                    </button>
                                  </>
                                )) ||
                                (currentTime >= time && "unlocked") ||
                                "waiting..."}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col sm={3} className="d-flex">
                <Row>
                  {isAdmin && (
                    <>
                      <Col sm={12} className="d-flex">
                        <div className="mx-auto my-auto">
                          <button
                            className="btn btn-wallet wallet-connected"
                            disabled
                          >
                            {" "}
                            <BiMoney /> Presale {tokenSymbol} Deposit{" "}
                          </button>
                        </div>
                      </Col>
                      <Col sm={12} className="d-flex">
                        <div className="mx-auto my-auto">
                          <button
                            className="btn btn-wallet wallet-connected"
                            disabled
                          >
                            {" "}
                            <BiKey /> Withdraw Remain Token{" "}
                          </button>
                        </div>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
