/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
import MyModal from '../modal/Modal';
// import BuyModalNew from '../modal/BuyModalNew';
import { Container, Row, Col } from 'react-bootstrap';

import useNetworkStatus from '../../store/useNetworkStatus';
import { initClient } from '../../xWeb3';
import { casperProjects } from '../../assets/variables';

import {
  Signer,
  CLValueBuilder,
  decodeBase16,
  CLPublicKey,
} from 'casper-js-sdk';

import {
    utils,
} from 'casper-js-client-helper';

export default function TokenDetailNew({address}) {
    const [project, setProject] = useState();
    const [status, setStatus] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [participants, setParticipants] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const {
      casperConnected,
      casperAddress,
    } = useNetworkStatus();

    useEffect( async() => {
      setProgressValue(0);
      casperProjects.forEach((project) => {
        if(project.contractAddress === address) setProject(project);
      });

      try {
        const casperpadClient = await initClient();

        const projectUref = await casperpadClient.getProjectUrefById(address);
        const response = await Promise.all([
          casperpadClient.getDataByFieldName(projectUref, "status"),
          casperpadClient.getDataByFieldName(projectUref, "users_length"),
          casperpadClient.getDataByFieldName(projectUref, "token_symbol"),
        ]);

        setStatus(response[0].toNumber() === 1 ? "Closed" : "");
        setParticipants(response[1].toNumber());
        setTokenSymbol(response[2]);
      } catch(err) {

      }
    }, []);

    function connectWallet(){
      setIsOpen(true);
    }

    async function setOwner() {
        const casperpadClient = await initClient();
        const deployHash = await casperpadClient.setOwner(casperAddress);
        console.log(deployHash);
    }

    async function showOwner() {
        const casperpadClient = await initClient();
        const ownerHash = await casperpadClient.queryContract("owner");
        console.log(ownerHash);
        const owner = utils.toAccountHashString(ownerHash.data);
        console.log("Owner", owner);
        let publicKey = CLPublicKey.fromHex("013357dae6e6cfeb1bfc84a0398fa602116ad4976a2c2e4eb75618bff5faab7ec9");
        publicKey = publicKey.toAccountHash();
        const key = CLValueBuilder.key(
           CLValueBuilder.byteArray(publicKey)
        ).data;
        // const key = CLValueBuilder.byteArray(decodeBase16("2642243a3ca1abc6f1b5ad3c9f53114955533ffe1a9e76055d1f987370d1d8e0"))
        console.log("Key", key);
    }

    return (
        <>
            <Container className='mb-5'>
                <Row>
                    <Col sm={5}>
                        <section className="mt-auto">
                            <div className="toekn-detail-header d-flex mt-5">
                                <div className="tokenLogo mr-5">
                                    <img src={project ? project.picture : ""} alt="project profile"></img>
                                </div>
                                <div className="custom-card-title">
                                    <h2 className="text-white mb-auto  tokenLogoTitle">{project ? project.name : ""}</h2>
                                </div>
                            </div>
                            <div className="custom-card-header">
                                <div>
                                    <div className="grid-box">
                                        <div className="text-white my-0 ml-3" style={{fontSize: '1.5rem'}}>{tokenSymbol}</div>
                                    </div>
                                    <div className="buyBtnContainer d-flex">
                                         <span className="status" style={{ backgroundColor:'rgb(255 0 0 / 25%)', color:'red' }}>
                                            <BsCircleFill style={{ fontSize: '.6rem', verticalAlign: 'middle' }} />
                                            {status === 'Coming' ? ' Opens in TBA' : status === 'Opened' ? ' Opened' : ' Closed'}
                                        </span> &nbsp;
                                        <span className="status">BUSD</span> &nbsp;
                                        <span className="status">USDC</span>
                                    </div>
                                    <hr/>
                                    <div className="text-white">
                                        <div className="mb-4">
                                            {project ? project.message : ""}
                                        </div>
                                        {!casperConnected && (
                                            <button className="btn btn-wallet wallet-connected" onClick={connectWallet}> Connect Wallet </button>
                                        )}
                                        <button className="btn btn-wallet wallet-connected" onClick={showOwner}> Show Owner </button>
                                        {casperConnected && (
                                            <button className="btn btn-wallet wallet-connected" onClick={setOwner}> Set Owner </button>
                                        )}

                                        {/* {(whitelistOfTiers[toCheckAddress(account)] > 0 && currentTime <= saleEndTime && currentTime >= saleStartTime) && (
                                            <button className="btn btn-wallet wallet-connected mr-4 mb-2" onClick={ () => handleBuyToken(true) }> <BiMoney /> Buy SWPR (WhiteList) </button>
                                        ) || (whitelistOfTiers[toCheckAddress(account)] > 0 && currentTime <= saleEndTime && currentTime < saleStartTime) && ( <button className="btn btn-wallet wallet-connected mx-auto mb-2" disabled> <BsClockHistory /> {tmp_day_wl} Days {tmp_hour_wl} Hours {tmp_min_wl} Mins {tmp_sec_wl} Sec</button>
                                        )}

                                        {(whitelistOfTiers[toCheckAddress(account)] && currentTime >= startFcfsTime && currentTime <= saleEndTime && currentTime >= saleStartTime) && (
                                            <button className="btn btn-wallet wallet-connected mx-auto mb-2" onClick={ () => handleBuyToken(false) }> <BiMoney /> Buy SWPR ( FCFS ) </button>
                                        ) || (whitelistOfTiers[toCheckAddress(account)] && currentTime < startFcfsTime && currentTime <= saleEndTime && currentTime >= saleStartTime) && ( <button className="btn btn-wallet wallet-connected mx-auto mb-2" disabled> <BsClockHistory /> {tmp_day_fcfs} Days {tmp_hour_fcfs} Hours {tmp_min_fcfs} Mins {tmp_sec_fcfs} Sec</button>
                                        )} */}

                                    </div>
                                    <div className='mt-3'>
                                        <div className="social-links">
                                            <a href="https://www.the-swappery.io"><SiWebpack className="social-link" /></a>
                                            <a href="https://twitter.com/TheSwappery"><AiFillTwitterCircle className="social-link" /></a>
                                            <a href="https://theswappery.medium.com"><AiOutlineMedium className="social-link" /></a>
                                            <a href=" https://t.me/TheSwapperyAnn "><FaTelegramPlane className="social-link" /></a>
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
                                {/* <div style={{paddingRight: '3rem'}}> {!swprBalance ? ('-') : (swprBalance + ' SWPR')} </div>
                                {whitelistOfTiers[toCheckAddress(account)] && (
                                    <div> { Number(tier).toFixed(2) + ' USD'} </div>
                                ) || (
                                    <div> This wallet is not whitelisted </div>
                                )}
                                <div style={{paddingRight: '3rem'}}> {} </div>
                                {whitelistOfTiers[toCheckAddress(account)] && (
                                    <div> { Number(tier * 100).toFixed(2) + ' SWPR'} </div>
                                )} */}
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
                                {/* <div> {lockedTokenAmount + ' SWPR'} </div>
                                <div> {remainSWPRAmount + ' SWPR'} </div> */}
                            </div>
                            <div className="grid-box text-white">
                                {/* <div> {lockedUSDAmount + ' USD'} </div> */}
                            </div>
                            <hr className="bg-gray-100" />
                            <div className="custom-card-footer detail-bar">
                                <div className="custom-progress-bar">
                                    <div className="progress-title">
                                        <span>Progress</span>
                                        <span>Participants <span style={{ color: 'white', fontWeight: 'bold' }}>{ participants }</span></span>
                                    </div>
                                    <ProgressBar now={progressValue} variant="pro" />
                                    <div className="progress-title">
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{progressValue}%</span>
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
            {/* <Toast onClose={() => setShowToast(false)} show={showToast} delay={7000} autohide>
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
            <BuyModalNew isOpen = { isOpenBuy } setIsOpen = {setIsOpenBuy} onlyOneToast = {false} isFixed = {isFixed}/> */}
            <MyModal isOpen = { isOpen } setIsOpen = {setIsOpen} onlyOneToast = {true}/>
        </>
    );
}