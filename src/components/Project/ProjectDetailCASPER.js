/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { BiMoney, BiKey } from "react-icons/all";
import { Container, Row, Col, Table, Tabs, Tab } from "react-bootstrap";

import ScheduleTable from "./ScheduleTable";

export default function ProjectDetailCASPER(props) {
  const {
    info,
    vestAmount,
    schedules,
    isAdmin,
    openTime,
    totalPresaleAmount,
    soldAmount,
    participants,
    scheduleClaimed,
    verified,
    contractAddress,
    fetchData,
  } = props;

  return (
    <>
      {/* <button onClick={ handleTransferOwnership }>test</button> */}
      <Container className={info ? "" : "hide"}>
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
                        <td>{new Date(openTime).toLocaleString("en-US")}</td>
                      </tr>
                      <tr>
                        <td>Token Price</td>
                        <td>{`1 ${info.token.symbol} = ${info.token.price} CSPR`}</td>
                      </tr>
                      <tr>
                        <td>Cap</td>
                        <td>{totalPresaleAmount + " " + info.token.symbol}</td>
                      </tr>
                      <tr>
                        <td>Total Users Participated</td>
                        <td>{participants}</td>
                      </tr>
                      <tr>
                        <td>Total Funds Sold</td>
                        <td>{soldAmount * info.token.price + " "}CSPR</td>
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
                        <td>{info.name}</td>
                      </tr>
                      <tr>
                        <td>Token Symbol</td>
                        <td>{info.token.symbol}</td>
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
                      {schedules.map((schedule, index) => {
                        return (
                          <ScheduleTable
                            key={`schedule_${index}`}
                            schedule={schedule}
                            contractAddress={contractAddress}
                            index={index}
                            tokenSymbol={info.token.symbol}
                            tokenPrice={info.token.price}
                            vestAmount={vestAmount}
                            verified={verified}
                            fetchData={fetchData}
                            scheduleClaimed={scheduleClaimed[index]}
                          />
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
                            <BiMoney /> Presale {info.token.symbol} Deposit{" "}
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
