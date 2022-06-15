import React, { useState, useEffect, useRef } from 'react';

import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill, BiMoney, BsClockHistory } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
// import tokenLogo from '../../assets/img/CasperPad_Logo.png';
import tokenLogo from '../../assets/img/Swappery_Logo.png';
import MyModal from '../modal/Modal';
import BuyModalSeed from '../modal/BuyModalSeed';
import { useEthers, useTokenBalance } from "@usedapp/core";
import { Container, Row, Col } from 'react-bootstrap';
import { 
    useLockedAmount,
    useSoldAmount,
    useGetUserSchedulePlain,
    useGetParticipants,
    useBalanceOfVesting,
    useGetTierOfAccount
} from '../../util/interactSeed';
import { 
    swprTokenAddress, 
    busdTokenAddress,
    whitelistOfTiers,
    saleStartTime,
    saleEndTime,
    preSaleAmount 
} from '../../contract_info/vestingDataSeed';
const { toChecksumAddress } = require('ethereum-checksum-address');

export default function TokenDetailSeed() {
    const unmounted = useRef(true);
    const project = {
        name: 'SWPR',
        status: 'Closed',
        message: 'The Swappery is the first cross-chain Decentralized Exchange (DEX), built for the Casper Network (https://casper.network/en/network). Their platform will give thousands of Casper holders the opportunity to make great use of their Casper tokens.'
    };

    const currentTime = Math.round(new Date().getTime()/1000);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenBuy, setIsOpenBuy] = useState(false);
    const {account, chainId} = useEthers();
    const swprBalance = useTokenBalance(swprTokenAddress, account) / 10 ** 18;
    const busdBalance = useTokenBalance(busdTokenAddress, account) / 10 ** 18;

    const [status, setStatus] = useState('Opened');
    const [lockedUSDAmount, setLockedUSDAmount] = useState(0);
    const [lockedSWPRAmount, setLockedSWPRAmount] = useState(0);
    const [remainSWPRAmount, setRemainSWPRAmount] = useState(0);
    const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
    const [balanceOfVesting, setBalanceOfVesting] = useState(0);
    const [lockedTokenAmount, setLockedTokenAmount] = useState(0);
    const [soldAmount, setSoldAmount] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [tier, setTier] = useState(0);
    
    // const [ lockedAmount, setLockedAmount ] = useState(0);
    const totalPresaleAmount_tmp = preSaleAmount * 10 ** 18;
    let balanceOfVesting_tmp = useBalanceOfVesting();
    let lockedTokenAmount_tmp = useLockedAmount();
    let soldAmount_tmp = useSoldAmount();
    let maxAmountOfTier = useGetTierOfAccount(account);
    const [ participants ] = useGetParticipants();

    let isScheduleLocked = [];
    const [ amount0, claimedAmount0, unlockTime0, isFixed0 ] = useGetUserSchedulePlain(account, 0);
    const [ amount1, claimedAmount1, unlockTime1, isFixed1 ] = useGetUserSchedulePlain(account, 1);
    const [ amount2, claimedAmount2, unlockTime2, isFixed2 ] = useGetUserSchedulePlain(account, 2);
    const [ amount3, claimedAmount3, unlockTime3, isFixed3 ] = useGetUserSchedulePlain(account, 3);
    const [ amount4, claimedAmount4, unlockTime4, isFixed4 ] = useGetUserSchedulePlain(account, 4);
    const [ amount5, claimedAmount5, unlockTime5, isFixed5 ] = useGetUserSchedulePlain(account, 5);
    isScheduleLocked.push(claimedAmount0);
    isScheduleLocked.push(claimedAmount1);
    isScheduleLocked.push(claimedAmount2);
    isScheduleLocked.push(claimedAmount3);
    isScheduleLocked.push(claimedAmount4);
    isScheduleLocked.push(claimedAmount5);

    const [daysWl, setDaysWl] = useState();
    const [hoursWl, setHoursWl] = useState();
    const [minsWl, setMinsWl] = useState();
    const [secsWl, setSecsWl] = useState();

    let tmp_day_wl = parseInt((saleStartTime - Math.round(new Date().getTime()/1000)) / 3600 / 24);
    let tmp_hour_wl = parseInt((saleStartTime - Math.round(new Date().getTime()/1000)) / 3600) - tmp_day_wl * 24;
    let tmp_min_wl = parseInt((saleStartTime - Math.round(new Date().getTime()/1000)) / 60) - tmp_day_wl * 24 * 60 - tmp_hour_wl * 60;
    let tmp_sec_wl = parseInt((saleStartTime - Math.round(new Date().getTime()/1000))) - tmp_day_wl * 24 * 3600 - tmp_hour_wl * 3600 - tmp_min_wl * 60;

    setInterval(myTimer, 1000);
    function myTimer() {
        tmp_day_wl = parseInt((saleStartTime - Math.round(new Date().getTime()/1000)) / 3600 / 24);
        tmp_hour_wl = parseInt((saleStartTime - Math.round(new Date().getTime()/1000)) / 3600) - tmp_day_wl * 24;
        tmp_min_wl = parseInt((saleStartTime - Math.round(new Date().getTime()/1000)) / 60) - tmp_day_wl * 24 * 60 - tmp_hour_wl * 60;
        tmp_sec_wl = parseInt((saleStartTime - Math.round(new Date().getTime()/1000))) - tmp_day_wl * 24 * 3600 - tmp_hour_wl * 3600 - tmp_min_wl * 60;

        setDaysWl(tmp_day_wl)
        setHoursWl(tmp_hour_wl)
        setMinsWl(tmp_min_wl)
        setSecsWl(tmp_sec_wl)
    }
    
    useEffect( () => {
        setSoldAmount(soldAmount_tmp ? Number((soldAmount_tmp/10**18)).toFixed(5) : 0);
        setLockedTokenAmount(lockedTokenAmount_tmp ? (Number(lockedTokenAmount_tmp/10**18)).toFixed(5) : 0);
        setTotalPresaleAmount(totalPresaleAmount_tmp ? Number((totalPresaleAmount_tmp/10**18)).toFixed(5) : 0);
        setLockedUSDAmount(Number(lockedTokenAmount * 0.008).toFixed(5));
        setRemainSWPRAmount(Number(totalPresaleAmount - soldAmount).toFixed(5));
        setProgressValue(Number(soldAmount * 100 / totalPresaleAmount).toFixed(5));
        setTier(maxAmountOfTier ? Number((maxAmountOfTier*0.008)).toFixed(5) : 0);
        setBalanceOfVesting(balanceOfVesting_tmp);

        return () => { unmounted.current = false }
    }, [totalPresaleAmount_tmp, lockedTokenAmount_tmp, soldAmount_tmp, maxAmountOfTier, lockedTokenAmount]);

    function connectWallet(){
        setIsOpen(true);
    }

    function handleBuyToken() {
        setIsOpenBuy(true);
    }

    return (
        <>
            <Container className='mb-5'>
                <Row>
                    <Col sm={5}>
                        <section className="mt-auto">
                            <div className="toekn-detail-header d-flex mt-5">
                                <div className="tokenLogo mr-5">
                                    <img src={tokenLogo} alt="project profile"></img>
                                </div>
                                <div className="custom-card-title">
                                    <h2 className="text-white mb-auto  tokenLogoTitle">The Swappery</h2>
                                </div>
                            </div>
                            <div className="custom-card-header">
                                <div>
                                    <div className="grid-box">
                                        <div className="text-white my-0 ml-3" style={{fontSize: '1.5rem'}}>{project.name}</div>
                                    </div>
                                    <div className="buyBtnContainer d-flex">
                                        <span className="status" style={{ backgroundColor: `${project.status === 'Coming' ? 'rgb(240 185 19 / 26%)' : project.status === 'Open' ? 'rgb(92 184 92 / 26%)' : 'rgb(255 0 0 / 25%)'}`, color: `${project.status === 'Coming' ? '#f1b90c' : project.status === 'Open' ? '#5cb85c' : 'red'}` }}>
                                            <BsCircleFill style={{ fontSize: '.6rem', verticalAlign: 'middle' }} />
                                            {project.status === 'Coming' ? ' Opens in TBA' : project.status === 'Open' ? ' Opened' : ' Closed'}
                                        </span> &nbsp;
                                        <span className="status">BUSD</span> &nbsp;
                                        <span className="status">USDC</span>
                                    </div>
                                    <hr/>
                                    <div className="text-white">
                                        <div className="mb-4">
                                            {project.message}
                                        </div>
                                        {!account && (
                                            <button className="btn btn-wallet wallet-connected" onClick={connectWallet}> Connect Wallet </button>
                                        )}
                                        
                                        { ( whitelistOfTiers[toChecksumAddress(account)] && amount0 == 0 && currentTime >= saleStartTime) && (
                                            <button className="btn btn-wallet wallet-connected mx-auto" onClick={ handleBuyToken }> <BiMoney /> Confirm Vesting </button>
                                        ) || (whitelistOfTiers[toChecksumAddress(account)] && currentTime <= saleEndTime && currentTime < saleStartTime) && ( <button className="btn btn-wallet wallet-connected mx-auto mb-2" disabled> <BsClockHistory /> {tmp_day_wl} Days {tmp_hour_wl} Hours {tmp_min_wl} Mins {tmp_sec_wl} Sec</button>
                                        )}
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
                                <div style={{paddingRight: '3rem'}}> {!swprBalance ? ('-') : (swprBalance + ' SWPR')} </div>
                                <div> { Number(tier).toFixed(2) + ' USD'} </div>
                                <div style={{paddingRight: '3rem'}}> {} </div>
                                <div> { Number(tier / 0.008).toFixed(2) + ' SWPR'} </div>
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
                                <div> {lockedTokenAmount + ' SWPR'} </div>
                                <div> {remainSWPRAmount + ' SWPR'} </div>
                            </div>
                            <div className="grid-box text-white">
                                <div> {lockedUSDAmount + ' USD'} </div>
                            </div>
                            <hr className="bg-gray-100" />
                            <div className="custom-card-footer detail-bar">
                                <div className="custom-progress-bar">
                                    <div className="progress-title">
                                        <span>Progress</span>
                                        <span>Participants <span style={{ color: 'white', fontWeight: 'bold' }}>{Number(participants)}</span></span>
                                    </div>
                                    <ProgressBar now={progressValue} variant="pro" />
                                    <div className="progress-title">
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{progressValue}%</span>
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{soldAmount + '/' + totalPresaleAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
            <MyModal isOpen = { isOpen } setIsOpen = {setIsOpen} onlyOneToast = {true}/>
            <BuyModalSeed isOpenBuy = { isOpenBuy } setIsOpenBuy = {setIsOpenBuy} onlyOneToast = {false}/>
        </>
    );
}