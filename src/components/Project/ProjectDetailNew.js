import React, { useEffect, useState, useRef } from 'react';

import { BiMoney, BiKey } from 'react-icons/all';
import { Container, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import member_1 from '../../assets/img/team_member_1.jpg';
import { useEthers } from "@usedapp/core";
import { Toast } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import { 
    useIsAdmin,
    useVestingContractMethod, 
    useBalanceOfVesting,
    useTempSoldAmount,
    useGetUserSchedulePlain,
    useSoldAmount,
    useSwprContractMethod
} from '../../util/interactNew';
import { 
    vestingContractAddress, 
    whitelistOfTiers,
    whitelistOfTiersLength
} from '../../contract_info/vestingDataNew';
import { schedulePlain, preSaleAmount } from '../../contract_info/vestingDataNew';

export default function ProjectDetailNew() {
    const limitPresaleAmount = preSaleAmount;
    const unmounted = useRef(true);
    const project = {
        contractAddress: vestingContractAddress,
        picture: member_1,
        name: 'SWPR',
        status: 'Open',
        progress: 0,
        swap_rate: '0.01 USD',
        cap: 99948000,
        access: 'Public',
        message: 'Swapper will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };

    const currentTime = Math.round(new Date().getTime()/1000);
    const {account} = useEthers();
    const [isAdmin, setIsAdmin] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState('');
    const tmpSoldAmount = useTempSoldAmount();
    const [loading, setLoading] = useState(false);
    let isAdmin_tmp = useIsAdmin(account);
    let soldAmount_tmp = useSoldAmount();
    
    let isScheduleLocked = [];
    let scheduleAmount = [];
    for(let i = 0 ; i < 9 ; i ++) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [amount, claimedAmount] = useGetUserSchedulePlain(account, i);
        isScheduleLocked.push(claimedAmount);
        scheduleAmount.push(amount);
    }

    function toCheckAddress(addr){
        let address = String(addr);
        return address.toLowerCase();
    }

    const { state: stateClaim, send: claim } = useVestingContractMethod("claim");
    function handleClaim(indexOfSchedule) {
        claim(indexOfSchedule);
        setLoading(true);
    }

    useEffect( () => {
        if(stateClaim.status === 'Success') {
            setToastText("The schedule was claimed successfully!");
            setShowToast(true);
            setLoading(false);
        }else if(stateClaim.status === 'Exception') {
            setToastText(stateClaim.errorMessage);
            setShowToast(true);
            setLoading(false);
        }
        return () => { unmounted.current = false }
    }, [ stateClaim ]);
    
    const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
    let totalPresaleAmount_tmp = useBalanceOfVesting();
    const { send: transfer } = useSwprContractMethod("transfer");
    function handleDeposite() {
        if(limitPresaleAmount > totalPresaleAmount) {
            let amount = (limitPresaleAmount - totalPresaleAmount).toString() + '000000000000000000';
            transfer(vestingContractAddress, amount);
        } else {
            setToastText('The 10% toekns of total supply is already deposited in this vesting contract!');
            setShowToast(true);
        }
    }

    const { send: withdraw } = useVestingContractMethod("withdraw");
    function handleWithdraw() {
        let amount = '53459700'; //(totalPresaleAmount - soldAmount).toString();
        // console.log('totalPresaleAmount - soldAmount', amount)
        withdraw(amount);
    }

    const { state: stateMultiSetTierOfAccount } = useVestingContractMethod("multiSetTierOfAccount");

    useEffect( () => {
        if(stateMultiSetTierOfAccount.status === 'Success'){
            setToastText('Initialize Whitelist Successfully!');
            setShowToast(true);
        }
        return () => { unmounted.current = false }
    }, [stateMultiSetTierOfAccount]);

    useEffect( () => {
        setIsAdmin(isAdmin_tmp);
        setTotalPresaleAmount(totalPresaleAmount_tmp ? (totalPresaleAmount_tmp/10**18).toString() : 0);
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
                                            <td>{'2022-03-09 10:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Token Price</td>
                                            <td>{'1 SWPR = 0.01 USD'}</td>
                                        </tr>
                                        <tr>
                                            <td>Cap</td>
                                            <td>{project.cap + ' SWPR'}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Users Participated</td>
                                            <td>{whitelistOfTiersLength}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Funds Sold</td>
                                            <td>{'$ ' + Number(limitPresaleAmount * 0.01).toFixed(2)}</td>
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
                                        <td>Swapper</td>
                                    </tr>
                                    <tr>
                                        <td>Token Symbol</td>
                                        <td>SWPR</td>
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
                                                        {((currentTime >= plain.unlockTime && isScheduleLocked[index] === 0 && whitelistOfTiers[toCheckAddress(account)]) && ( (loading && (<Spinner animation="border" className='claim-spinner' />)) || 
                                                        ( <>
                                                            <button className="btn btn-wallet wallet-connected" onClick={ () => handleClaim(index) }> Claim </button>
                                                          </>)
                                                        )) || ((currentTime >= plain.unlockTime) && (
                                                            'unlocked'
                                                        )) || (
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
                                            <button className="btn btn-wallet wallet-connected" onClick={ handleDeposite }disabled> <BiMoney /> Presale SWPR Deposit </button>
                                        </div>
                                    </Col>
                                    <Col sm={12} className="d-flex">
                                        <div className="mx-auto my-auto">
                                            <button className="btn btn-wallet wallet-connected" onClick={ handleWithdraw }disabled> <BiKey /> Withdraw Remain Token </button>
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