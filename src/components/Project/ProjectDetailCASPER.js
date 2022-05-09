/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { BiMoney, BiKey } from 'react-icons/all';
import { Container, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import { Toast } from 'react-bootstrap';

import Spinner from 'react-bootstrap/Spinner';

import useNetworkStatus from '../../store/useNetworkStatus';
import { initClient } from '../../xWeb3';

export default function ProjectDetailCASPER({ address }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');
  //const tmpSoldAmount = useTempSoldAmount();
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openTime, setOpenTime] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenCapacity, setTokenCapacity] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [name, setName] = useState("");
  const [schedules, setSchedules] = useState([]);
  //let isAdmin_tmp = useIsAdmin(account);
  //let soldAmount_tmp = useSoldAmount();

  const currentTime = Math.round(new Date().getTime());

  useEffect(async() => {
    try {
      const casperpadClient = await initClient();

      const projectUref = await casperpadClient.getProjectUrefById(address);
      const response = await Promise.all([
        casperpadClient.getDataByFieldName(projectUref, "open_time"),
        casperpadClient.getDataByFieldName(projectUref, "token_symbol"),
        casperpadClient.getDataByFieldName(projectUref, "token_price"),
        casperpadClient.getDataByFieldName(projectUref, "capacity_usd"),
        casperpadClient.getDataByFieldName(projectUref, "users_length"),
        casperpadClient.getDataByFieldName(projectUref, "capacity_usd"),
        casperpadClient.getDataByFieldName(projectUref, "name"),
        casperpadClient.getDataByFieldName(projectUref, "schedules"),
      ]);

      const date = new Date(response[0].toNumber()).toISOString();
      setOpenTime(date.slice(0, 10) + " " + date.slice(11, 16) + " UTC");
      setTokenSymbol(response[1]);
      setTokenPrice(response[2].toNumber() / 1000);
      setTokenCapacity(response[3].toNumber() * 1000 / response[2].toNumber());
      setParticipants(response[4].toNumber());
      setSoldAmount(response[5].toNumber());
      setName(response[6]);
      setSchedules(response[7]);
      setIsLoaded(true);
    } catch(err) {
      setIsLoaded(false);
      console.log("Read error");
    }
  }, []);

  return (
    <>
    {/* <button onClick={ handleTransferOwnership }>test</button> */}
    <Toast onClose={() => setShowToast(false)} show={showToast} delay={7000} autohide>
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto">Notice</strong>
        <small className="mr-auto"></small>
      </Toast.Header>
      <Toast.Body>{ toastText }</Toast.Body>
    </Toast>
    <Container>
      <Tabs
        defaultActiveKey="project"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="project" title="Project">
          <Row>
            <Col sm={6}>
              <div className>
                <Table responsive="sm" className="text-white">
                  <thead>
                    <tr>
                      <th colSpan="2">Project Information</th>
                    </tr>
                  </thead>
                  {
                    (isLoaded && (
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
                    </tbody>))
                  }
                </Table>
              </div>
            </Col>
            <Col sm={6}>
              <div className>
                <Table responsive="sm" className="text-white">
                  <thead>
                  <tr>
                    <th colSpan="2">Token Information</th>
                  </tr>
                  </thead>
                  {
                    (isLoaded && (<tbody>
                    <tr>
                      <td>Name</td>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <td>Token Symbol</td>
                      <td>{tokenSymbol}</td>
                    </tr>
                    </tbody>))
                  }
                </Table>
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="allocation" title="Allocation">
          <Row>
            <Col sm={9}>
              <div className>
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
                    {
                      schedules.map((schedule, index) => {
                        const time = schedule.data[0].data.toNumber();
                        const percentage = (schedule.data[1].data.toNumber() / 1000);
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>0</td>
                            <td>{percentage + '%'}</td>
                            <td>{new Date(time).toLocaleString("en-US", {timeZone: "UTC"})}</td>
                            <td>{currentTime >= time ? 0 : 0}</td>
                            <td>{
                              ((currentTime >= time) && (
                                'unlocked'
                              )) || (
                                'waiting...'
                              )
                            }
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col sm={3} className="d-flex">
              <Row>
                { isAdmin && (
                <>
                  <Col sm={12} className="d-flex">
                    <div className="mx-auto my-auto">
                      <button className="btn btn-wallet wallet-connected" disabled> <BiMoney /> Presale SWPR Deposit </button>
                    </div>
                  </Col>
                  <Col sm={12} className="d-flex">
                    <div className="mx-auto my-auto">
                      <button className="btn btn-wallet wallet-connected" disabled> <BiKey /> Withdraw Remain Token </button>
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