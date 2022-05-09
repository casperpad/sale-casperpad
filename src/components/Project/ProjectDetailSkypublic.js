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
    useTempSoldAmount,
    useGetUserSchedulePlain,
    useGetTreasuryWallet,
    useSoldAmount,
    useSwprContractMethod
} from '../../util/interactSkypublic';
import { 
    vestingContractAddress, 
    whitelistOfTiers,
    whitelistOfTiersLength
} from '../../contract_info/vestingDataSkypublic';
import { schedulePlain, preSaleAmount } from '../../contract_info/vestingDataSkypublic';
const { toChecksumAddress } = require('ethereum-checksum-address');


export default function ProjectDetailNew() {
    const limitPresaleAmount = preSaleAmount;
    const unmounted = useRef(true);
    const project = {
        contractAddress: vestingContractAddress,
        picture: member_1,
        name: 'SKBR',
        status: 'Open',
        progress: 0,
        swap_rate: '0.01 USD',
        cap: 50000000,
        access: 'Public',
        message: 'Swapper will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };

    const currentTime = Math.round(new Date().getTime()/1000);
    const {account} = useEthers();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState('');
    const [soldAmount, setSoldAmount] = useState(0);
    const tmpSoldAmount = useTempSoldAmount();
    const [loading, setLoading] = useState(false);
    let isAdmin_tmp = useIsAdmin(account);
    let soldAmount_tmp = useSoldAmount();
    
    let isScheduleLocked = [];
    let scheduleAmount = [];
    const [ amount0, claimedAmount0, unlockTime0, isFixed0 ] = useGetUserSchedulePlain(account, 0);
    const [ amount1, claimedAmount1, unlockTime1, isFixed1 ] = useGetUserSchedulePlain(account, 1);
    const [ amount2, claimedAmount2, unlockTime2, isFixed2 ] = useGetUserSchedulePlain(account, 2);
    const [ amount3, claimedAmount3, unlockTime3, isFixed3 ] = useGetUserSchedulePlain(account, 3);
    const [ amount4, claimedAmount4, unlockTime4, isFixed4 ] = useGetUserSchedulePlain(account, 4);
    const [ amount5, claimedAmount5, unlockTime5, isFixed5 ] = useGetUserSchedulePlain(account, 5);
    const [ amount6, claimedAmount6, unlockTime6, isFixed6 ] = useGetUserSchedulePlain(account, 6);
    
    isScheduleLocked.push(claimedAmount0);
    isScheduleLocked.push(claimedAmount1);
    isScheduleLocked.push(claimedAmount2);
    isScheduleLocked.push(claimedAmount3);
    isScheduleLocked.push(claimedAmount4);
    isScheduleLocked.push(claimedAmount5);
    isScheduleLocked.push(claimedAmount6);
   
    scheduleAmount.push(amount0);
    scheduleAmount.push(amount1);
    scheduleAmount.push(amount2);
    scheduleAmount.push(amount3);
    scheduleAmount.push(amount4);
    scheduleAmount.push(amount5);
    scheduleAmount.push(amount6);
    

    const { state: stateAddVest, send: addVest, events: getEventOfAddVest } = useVestingContractMethod("addVest");
    function handleAddVest() {
        addVest("0xA5664dC01BB8369EDc6116d3B267d6014681dD2F", 5000000, true);
    }

    function toCheckAddress(addr){
        let address = String(addr);
        return address.toLowerCase();
    }

    const { state: stateSetTier, send: setTierOfAccount, events: getEventOfSetTier } = useVestingContractMethod("setTierOfAccount");
    function handleSetTier() {
        setTierOfAccount("0xbCeB94cF4579100B256eC7e5FdE4600631C3b0A5", 5000000);
    }

    const { state: SetTreasuryWallet, send: setTreasuryWallet, events: getEventOfSetTreasuryWallet } = useVestingContractMethod("setTreasuryWallet");
    let treasuryWallet = useGetTreasuryWallet();
    const [ amount_t, claimedAmount_t, unlockTime_t, isFixed_t ] = useGetUserSchedulePlain ('0x7e6daf98f514599745b2ef2a5740ddce0446485d', 0);
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
    
    const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
    let totalPresaleAmount_tmp = useBalanceOfVesting();
    const { state: stateDeposit, send: transfer, events: getEventDeposit } = useSwprContractMethod("transfer");
    function handleDeposite() {
        if(limitPresaleAmount > totalPresaleAmount) {
            let amount = (limitPresaleAmount - totalPresaleAmount).toString() + '000000000000000000';
            transfer(vestingContractAddress, amount);
        } else {
            setToastText('The 10% toekns of total supply is already deposited in this vesting contract!');
            setShowToast(true);
        }
    }

    const { state: stateWithdraw, send: withdraw, events: getEventWithdraw } = useVestingContractMethod("withdraw");
    function handleWithdraw() {
        let amount = '53459700'; //(totalPresaleAmount - soldAmount).toString();
        // console.log('totalPresaleAmount - soldAmount', amount)
        withdraw(amount);
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
        setSoldAmount(soldAmount_tmp ? Number(((soldAmount_tmp - tmpSoldAmount)/10**18)).toFixed(5) : 0);
        return () => { unmounted.current = false }
    }, [isAdmin_tmp, totalPresaleAmount_tmp, soldAmount_tmp, tmpSoldAmount]);

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
                                    <tbody>
                                        <tr>
                                            <td>Opens</td>
                                            <td>{'2022-04-10 12:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Token Price</td>
                                            <td>{'1 SKBR = 0.01 USD'}</td>
                                        </tr>
                                        <tr>
                                            <td>Cap</td>
                                            <td>{project.cap + ' SKBR'}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Users Participated</td>
                                            <td>1118</td>
                                        </tr>
                                        <tr>
                                            <td>Total Funds Sold</td>
                                            <td>{'$ ' + Number(50000000 * 0.01).toFixed(2)}</td>
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
                                                    <td>{index + 1}</td>
                                                    {/* <td>{Number(limitPresaleAmount * plain.percentage / 100).toFixed(5)}</td> */}
                                                    <td>{Number(scheduleAmount[index]/1000000000000000000).toString()}</td>
                                                    <td>{plain.percentage + '%'}</td>
                                                    <td>{new Date(plain.unlockTime * 1000).toLocaleString("en-US", {timeZone: "UTC"})}</td>
                                                    {/* <td>{currentTime >= plain.unlockTime ? limitPresaleAmount * plain.percentage / 100 : 0}</td> */}
                                                    <td>{currentTime >= plain.unlockTime ? Number(scheduleAmount[index]/1000000000000000000).toString() : 0}</td>
                                                    <td>
                                                        {(currentTime >= plain.unlockTime && isScheduleLocked[index] == 0 && whitelistOfTiers[toCheckAddress(account)]) && ( loading && (<Spinner animation="border" className='claim-spinner' />) || 
                                                        ( <>
                                                            <button className="btn btn-wallet wallet-connected" onClick={ () => handleClaim(index) }> Claim </button>
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
                                            <button className="btn btn-wallet wallet-connected" onClick={ handleDeposite }> <BiMoney /> Presale SKBR Deposit </button>
                                        </div>
                                    </Col>
                                    {/* <Col sm={12} className="d-flex">
                                        <div className="mx-auto my-auto">
                                            <button className="btn btn-wallet wallet-connected" onClick={ handleWithdraw }disabled> <BiKey /> Withdraw Remain Token </button>
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