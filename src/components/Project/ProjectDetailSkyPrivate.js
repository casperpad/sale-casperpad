import React, { Component, useEffect, useState, useRef } from 'react';

import { BiPlus, FiPlus, BsPeople, BiMoney, BiKey, AiOutlineSchedule } from 'react-icons/all';
import { Container, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import member_1 from '../../assets/img/team_member_1.jpg';
import { useEthers, useTokenBalance } from "@usedapp/core";
import { Toast } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import { 
    useIsAdmin,
    useVestingContractMethod, 
    useBalanceOfVesting,
    useGetUserSchedulePlain,
    useGetParticipants,
    useGetTreasuryWallet,
    useSwprContractMethod
} from '../../util/interactSkyPrivate';
import { 
    vestingContractAddress, 
    whitelistOfTiers,
    whitelistOfTiersLength
} from '../../contract_info/vestingDataSkyPrivate';
import { schedulePlain, preSaleAmount } from '../../contract_info/vestingDataSkyPrivate';
import {whitelist} from '../../contract_info/whitelist';

export default function ProjectDetail() {
    const limitPresaleAmount = preSaleAmount;
    const unmounted = useRef(true);
    const project = {
        contractAddress: vestingContractAddress,
        picture: member_1,
        name: 'SWPR',
        status: 'Open',
        progress: 0,
        swap_rate: '0.01 USD',
        cap: 20000000,
        access: 'Private',
        message: 'Swapper will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };

    const currentTime = Math.round(new Date().getTime()/1000);
    const {account} = useEthers();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState('');
    const [loading, setLoading] = useState(false);
    let isAdmin_tmp = useIsAdmin(account);
    
    let isScheduleLocked = [];
    let scheduleAmount = [];
    const [ amount0, claimedAmount0, unlockTime0, isFixed0 ] = useGetUserSchedulePlain(account, 0);
    const [ amount1, claimedAmount1, unlockTime1, isFixed1 ] = useGetUserSchedulePlain(account, 1);
    const [ amount2, claimedAmount2, unlockTime2, isFixed2 ] = useGetUserSchedulePlain(account, 2);
    const [ amount3, claimedAmount3, unlockTime3, isFixed3 ] = useGetUserSchedulePlain(account, 3);
    const [ amount4, claimedAmount4, unlockTime4, isFixed4 ] = useGetUserSchedulePlain(account, 4);
    const [ amount5, claimedAmount5, unlockTime5, isFixed5 ] = useGetUserSchedulePlain(account, 5);
    const [ amount6, claimedAmount6, unlockTime6, isFixed6 ] = useGetUserSchedulePlain(account, 6);
    const [ amount7, claimedAmount7, unlockTime7, isFixed7 ] = useGetUserSchedulePlain(account, 7);
    const [ amount8, claimedAmount8, unlockTime8, isFixed8 ] = useGetUserSchedulePlain(account, 8);
    const [ amount9, claimedAmount9, unlockTime9, isFixed9 ] = useGetUserSchedulePlain(account, 9);
    const [ amount10, claimedAmount10, unlockTime10, isFixed10 ] = useGetUserSchedulePlain(account, 10);
    const [ amount11, claimedAmount11, unlockTime11, isFixed11 ] = useGetUserSchedulePlain(account, 11);
    const [ amount12, claimedAmount12, unlockTime12, isFixed12 ] = useGetUserSchedulePlain(account, 12);

    isScheduleLocked.push(claimedAmount0);
    isScheduleLocked.push(claimedAmount1);
    isScheduleLocked.push(claimedAmount2);
    isScheduleLocked.push(claimedAmount3);
    isScheduleLocked.push(claimedAmount4);
    isScheduleLocked.push(claimedAmount5);
    isScheduleLocked.push(claimedAmount6);
    isScheduleLocked.push(claimedAmount7);
    isScheduleLocked.push(claimedAmount8);
    isScheduleLocked.push(claimedAmount9);
    isScheduleLocked.push(claimedAmount10);
    isScheduleLocked.push(claimedAmount11);
    isScheduleLocked.push(claimedAmount12);

    scheduleAmount.push(amount0);
    scheduleAmount.push(amount1);
    scheduleAmount.push(amount2);
    scheduleAmount.push(amount3);
    scheduleAmount.push(amount4);
    scheduleAmount.push(amount5);
    scheduleAmount.push(amount6);
    scheduleAmount.push(amount7);
    scheduleAmount.push(amount8);
    scheduleAmount.push(amount9);
    scheduleAmount.push(amount10);
    scheduleAmount.push(amount11);
    scheduleAmount.push(amount12);

    const { state: stateAddVest, send: addVest, events: getEventOfAddVest } = useVestingContractMethod("addVest");
    function handleAddVest() {
        addVest("0xA5664dC01BB8369EDc6116d3B267d6014681dD2F", 5000000, true);
    }

    const { state: stateSetTier, send: setTierOfAccount, events: getEventOfSetTier } = useVestingContractMethod("setTierOfAccount");
    function handleSetTier() {
        setTierOfAccount("0xbCeB94cF4579100B256eC7e5FdE4600631C3b0A5", 5000000);
    }

    const { state: SetTreasuryWallet, send: setTreasuryWallet, events: getEventOfSetTreasuryWallet } = useVestingContractMethod("setTreasuryWallet");
    let treasuryWallet = useGetTreasuryWallet();
    function handleSetTreasuryWallet() {
       
    }

    const { state: stateAddAdmin, send: addAdmin, events: getEventAddAdmin } = useVestingContractMethod("addAdmin");
    function handleAddAdmin() {
        addAdmin("0xbCeB94cF4579100B256eC7e5FdE4600631C3b0A5");
    }

    const { state: stateUnlockToken, send: unlockToken, events: getEventUnlockToken } = useVestingContractMethod("unlockToken");
    function handleUnlockToken() {
        unlockToken();
    }

    const { state: stateClaim, send: claim, events: getEventClaim } = useVestingContractMethod("claim");
    function handleClaim(indexOfSchedule) {
        claim(indexOfSchedule);
        setLoading(true);
    }

    useEffect( () => {
        if(stateClaim.status == 'Success') {
            setToastText("The schedule was claimed successfully!");
            setShowToast(true);
            setLoading(false);
        }else if(stateClaim.status == 'Exception') {
            setToastText(stateClaim.errorMessage);
            setShowToast(true);
            setLoading(false);
        }
        return () => { unmounted.current = false }
    }, [ stateClaim ]);

    const { state: stateRelease, send: Release, events: getEventRelease } = useVestingContractMethod("release");
    function handleRelease(indexOfSchedule) {
        Release(indexOfSchedule);
        setLoading(true);
    }

    useEffect( () => {
        if(stateRelease.status == 'Success') {
            setToastText("The schedule was claimed successfully!");
            setShowToast(true);
            setLoading(false);
        }else if(stateRelease.status == 'Exception') {
            setToastText(stateRelease.errorMessage);
            setShowToast(true);
            setLoading(false);
        }
        return () => { unmounted.current = false }
    }, [ stateRelease ]);
    
    const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
    let totalPresaleAmount_tmp = useBalanceOfVesting();
    const { state: stateDeposit, send: transfer, events: getEventDeposit } = useSwprContractMethod("transfer");
    function handleDeposite() {
        if(limitPresaleAmount > totalPresaleAmount) {
            let amount = (limitPresaleAmount - totalPresaleAmount).toString() + '000000000000000000';
            transfer(vestingContractAddress, amount);
        } else {
            setToastText('All toekns already deposited in this vesting contract!');
            setShowToast(true);
        }
    }

    const { state: stateWithdraw, send: withdraw, events: getEventWithdraw } = useVestingContractMethod("withdraw");
    function handleWithdraw() {
        withdraw('2542462');
    }

    const { state: stateTransferOwnersihp, send: transferOwnership, events: getEventTransferOwnership } = useVestingContractMethod("transferOwnership");
    function handleTransferOwnership() {
        transferOwnership('0x0ac25F05101c7821e0817F39c37e89F83bE863eE');
    }

    const { state: stateMultiSetTierOfAccount, send: multiSetTierOfAccount, events: getEventMultiSetTierOfAccount } = useVestingContractMethod("multiSetTierOfAccount");
    function handleInitWhitelist() {
        setToastText('Initial whitelist was already set!');
        setShowToast(true);
    }

    useEffect( () => {
        if(stateMultiSetTierOfAccount.status == 'Success'){
            setToastText('Initialize Whitelist Successfully!');
            setShowToast(true);
        }
        return () => { unmounted.current = false }
    }, [stateMultiSetTierOfAccount]);

    useEffect( () => {
        setIsAdmin(isAdmin_tmp);
        setTotalPresaleAmount(totalPresaleAmount_tmp ? (totalPresaleAmount_tmp/10**18).toString() : 0);
        return () => { unmounted.current = false }
    }, [isAdmin_tmp, totalPresaleAmount_tmp]);

    const [ testamount1, testclaimedAmount1, testunlockTime1, testisFixed1 ] = useGetUserSchedulePlain('0x9d8ae6499568552C1902FC8DB1012905265D485B', 2);
    function getSchedule(){
    }

    return (
        <>
        {/* <button onClick={ getSchedule }>test</button> */}
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
                                    <tbody>
                                        <tr>
                                            <td>Opens</td>
                                            <td>{'2022-04-11 12:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Token Price</td>
                                            <td>{'1 SKBR = 0.0095 USD'}</td>
                                        </tr>
                                        <tr>
                                            <td>Cap</td>
                                            <td>{project.cap + ' SKBR'}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Users Participated</td>
                                            <td>{whitelistOfTiersLength}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Funds Sold</td>
                                            <td>{'$ ' + Number(limitPresaleAmount * 0.0095).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
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
                                    <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>Skybridger</td>
                                    </tr>
                                    <tr>
                                        <td>Token Symbol</td>
                                        <td>SKBR</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Tab>
                {/* <Tab eventKey="schedule" title="Schedule">
                    <Row>
                        <Col sm={8}>
                            <div className>
                                <Table responsive="sm" className="text-white">
                                    <thead>
                                        <tr>
                                            <th>Round</th>
                                            <th>Opens</th>
                                            <th>Closes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>TGE</td>
                                            <td>{'2021-12-10 19:00 UTC'}</td>
                                            <td>{'2021-12-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>First</td>
                                            <td>{'2022-1-10 19:00 UTC'}</td>
                                            <td>{'2022-1-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Second</td>
                                            <td>{'2022-2-10 19:00 UTC'}</td>
                                            <td>{'2022-2-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Third</td>
                                            <td>{'2022-3-10 19:00 UTC'}</td>
                                            <td>{'2022-3-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Fourth</td>
                                            <td>{'2022-4-10 19:00 UTC'}</td>
                                            <td>{'2022-4-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Fifth</td>
                                            <td>{'2022-5-10 19:00 UTC'}</td>
                                            <td>{'2022-5-10 23:00 UTC'}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Tab> */}
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
                                            schedulePlain.map((plain, index) => {
                                                return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    {
                                                        (isAdmin) && (
                                                            <td>{limitPresaleAmount * plain.percentage / 100}</td>
                                                        ) || (
                                                            <td>{Number(scheduleAmount[index]/1000000000000000000).toString()}</td>
                                                        )
                                                    }
                                                    <td>{plain.percentage + '%'}</td>
                                                    <td>{index == 0 ? 'After TGE (' + new Date(plain.unlockTime * 1000).toLocaleString("en-US", {timeZone: "UTC"}) +')' : new Date(plain.unlockTime * 1000).toLocaleString("en-US", {timeZone: "UTC"})}</td>
                                                    {
                                                        (isAdmin) && (
                                                            <td>{currentTime >= plain.unlockTime ? limitPresaleAmount * plain.percentage / 100 : 0}</td>
                                                        ) || (
                                                            <td>{currentTime >= plain.unlockTime ? Number(scheduleAmount[index]/1000000000000000000).toString() : 0}</td>
                                                        )
                                                    }
                                                    <td>
                                                        {(currentTime >= plain.unlockTime && isScheduleLocked[index] == 0 && whitelistOfTiers[account]) && amount1 > 0 && !isAdmin && ( loading && (<Spinner animation="border" className='claim-spinner' />) || 
                                                          (
                                                          <>
                                                            <button className="btn btn-wallet wallet-connected" onClick={ () => handleClaim(index) }> Claim </button>
                                                          </>)
                                                        ) || (currentTime >= plain.unlockTime) && isAdmin && ( loading && (<Spinner animation="border" className='claim-spinner' />) || 
                                                        (
                                                        <>
                                                          <button className="btn btn-wallet wallet-connected" onClick={ () => handleRelease(index) }> Release </button>
                                                        </>)
                                                      ) || (currentTime >= plain.unlockTime) && (
                                                            'unlocked'
                                                        ) || (
                                                            'waiting...'
                                                        )
                                                        }
                                                    </td>
                                                </tr>);
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
                                            <button className="btn btn-wallet wallet-connected" onClick={ handleDeposite }> <BiMoney /> Presale SWPR Deposit </button>
                                        </div>
                                    </Col>
                                    {/* <Col sm={12} className="d-flex">
                                        <div className="mx-auto my-auto">
                                            <button className="btn btn-wallet wallet-connected" onClick={ handleWithdraw }> <BiKey /> Withdraw Remain Token </button>
                                        </div>
                                    </Col> */}
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