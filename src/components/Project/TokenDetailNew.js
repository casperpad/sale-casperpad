import React, { useState, useEffect, useRef } from 'react';

import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill, BiMoney, BsClockHistory } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
// import tokenLogo from '../../assets/img/CasperPad_Logo.png';
import tokenLogo from '../../assets/img/Swappery_Logo.png';
import MyModal from '../modal/Modal';
import BuyModalNew from '../modal/BuyModalNew';
import { useEthers, useTokenBalance } from "@usedapp/core";
import { Container, Row, Col, Toast } from 'react-bootstrap';

import { 
    useLockedAmount,
    useSoldAmount,
    useGetUserSchedulePlain,
    useGetParticipants,
    useBalanceOfVesting,
    useGetTierOfAccount,
    useIsSoldWhitelist,
    useTempSoldAmount,
    useVestingContractMethod, 
    useSwprContractMethod,
    useGetWLEndTime
} from '../../util/interactNew';
import { 
    swprTokenAddress, 
    busdTokenAddress, 
    usdtTokenAddress,
    whitelistOfTiers,
    whitelistOfTiersLength,
    saleStartTime,
    saleEndTime,
    preSaleAmount,
    startFcfsTime
} from '../../contract_info/vestingDataNew';


export default function TokenDetailNew() {
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
    const [isFixed, setIsFixed] = useState();
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState('');
    const [saleParticipants, setSaleParticipants] = useState(0);
    
    // const [ lockedAmount, setLockedAmount ] = useState(0);
    const totalPresaleAmount_tmp = preSaleAmount * 10 ** 18;
    const balanceOfVesting_tmp = useBalanceOfVesting();
    const lockedTokenAmount_tmp = useLockedAmount();
    const soldAmount_tmp = useSoldAmount();
    const tmpSoldAmount = useTempSoldAmount();
    const maxAmountOfTier = useGetTierOfAccount(account);
    const isSoldWhitelist = useIsSoldWhitelist(account);
    const [ participants ] = useGetParticipants();
    // const startFcfsTime = Number(useGetWLEndTime()).toString();

    let isScheduleLocked = [];
    const [ amount0, claimedAmount0, unlockTime0, isFixed0 ] = useGetUserSchedulePlain(account, 0);
    const [ amount1, claimedAmount1, unlockTime1, isFixed1 ] = useGetUserSchedulePlain(account, 1);
    const [ amount2, claimedAmount2, unlockTime2, isFixed2 ] = useGetUserSchedulePlain(account, 2);
    const [ amount3, claimedAmount3, unlockTime3, isFixed3 ] = useGetUserSchedulePlain(account, 3);
    const [ amount4, claimedAmount4, unlockTime4, isFixed4 ] = useGetUserSchedulePlain(account, 4);
    const [ amount5, claimedAmount5, unlockTime5, isFixed5 ] = useGetUserSchedulePlain(account, 5);
    const [ amount6, claimedAmount6, unlockTime6, isFixed6 ] = useGetUserSchedulePlain(account, 6);
    const [ amount7, claimedAmount7, unlockTime7, isFixed7 ] = useGetUserSchedulePlain(account, 7);
    const [ amount8, claimedAmount8, unlockTime8, isFixed8 ] = useGetUserSchedulePlain(account, 8);
    isScheduleLocked.push(claimedAmount0);
    isScheduleLocked.push(claimedAmount1);
    isScheduleLocked.push(claimedAmount2);
    isScheduleLocked.push(claimedAmount3);
    isScheduleLocked.push(claimedAmount4);
    isScheduleLocked.push(claimedAmount5);
    isScheduleLocked.push(claimedAmount6);
    isScheduleLocked.push(claimedAmount7);
    isScheduleLocked.push(claimedAmount8);

    const [daysFcfs, setDaysFcfs] = useState();
    const [hoursFcfs, setHoursFcfs] = useState();
    const [minsFcfs, setMinsFcfs] = useState();
    const [secsFcfs, setSecsFcfs] = useState();

    let tmp_day_fcfs = parseInt((startFcfsTime - Math.round(new Date().getTime()/1000)) / 3600 / 24);
    let tmp_hour_fcfs = parseInt((startFcfsTime - Math.round(new Date().getTime()/1000)) / 3600) - tmp_day_fcfs * 24;
    let tmp_min_fcfs = parseInt((startFcfsTime - Math.round(new Date().getTime()/1000)) / 60) - tmp_day_fcfs * 24 * 60 - tmp_hour_fcfs * 60;
    let tmp_sec_fcfs = parseInt((startFcfsTime - Math.round(new Date().getTime()/1000))) - tmp_day_fcfs * 24 * 3600 - tmp_hour_fcfs * 3600 - tmp_min_fcfs * 60;

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
        tmp_day_fcfs = parseInt((startFcfsTime - Math.round(new Date().getTime()/1000)) / 3600 / 24);
        tmp_hour_fcfs = parseInt((startFcfsTime - Math.round(new Date().getTime()/1000)) / 3600) - tmp_day_fcfs * 24;
        tmp_min_fcfs = parseInt((startFcfsTime - Math.round(new Date().getTime()/1000)) / 60) - tmp_day_fcfs * 24 * 60 - tmp_hour_fcfs * 60;
        tmp_sec_fcfs = parseInt((startFcfsTime - Math.round(new Date().getTime()/1000))) - tmp_day_fcfs * 24 * 3600 - tmp_hour_fcfs * 3600 - tmp_min_fcfs * 60;

        setDaysFcfs(tmp_day_fcfs)
        setHoursFcfs(tmp_day_fcfs)
        setMinsFcfs(tmp_day_fcfs)
        setSecsFcfs(tmp_day_fcfs)

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
        setSoldAmount(soldAmount_tmp ? Number(((soldAmount_tmp - tmpSoldAmount)/10**18)).toFixed(5) : 0);
        setLockedTokenAmount(lockedTokenAmount_tmp ? (Number((lockedTokenAmount_tmp - tmpSoldAmount)/10**18)).toFixed(5) : 0);
        setTotalPresaleAmount(totalPresaleAmount_tmp ? Number((totalPresaleAmount_tmp/10**18)).toFixed(5) : 0);
        setLockedUSDAmount(Number(lockedTokenAmount * 0.01).toFixed(5));
        setRemainSWPRAmount(Number(totalPresaleAmount - soldAmount).toFixed(5));
        setProgressValue(Number(soldAmount * 100 / totalPresaleAmount).toFixed(5));
        setTier(maxAmountOfTier ? Number((maxAmountOfTier*0.01)).toFixed(5) : 0);
        setBalanceOfVesting(balanceOfVesting_tmp);

        return () => { unmounted.current = false }
    }, [totalPresaleAmount_tmp, lockedTokenAmount_tmp, soldAmount_tmp, maxAmountOfTier, lockedTokenAmount, tmpSoldAmount]);

    useEffect( () => {
        let _participants = 0;
        if(participants < 250){
            _participants = Number(participants);
        }else if(participants >= 250 && participants < 1400){
            _participants = participants - parseInt((participants - 250) / 4);
        }else {
            _participants = 1125 + Number(participants) - 1400;
        }

        setSaleParticipants(_participants);
        
        return () => { unmounted.current = false }
    }, [participants]);

    function toCheckAddress(addr){
        let address = String(addr);
        return address.toLowerCase();
    }

    function connectWallet(){
        setIsOpen(true);
    }

    function handleBuyToken(flag) {
        if(flag && isSoldWhitelist){
            setToastText("You already bought your allocation!");
            setShowToast(true);
        }else{
            setIsFixed(flag);
            setIsOpenBuy(true);
        }
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
                                        {/* <span className="status" style={{ backgroundColor: `${project.status === 'Coming' ? 'rgb(240 185 19 / 26%)' : project.status === 'Open' ? 'rgb(92 184 92 / 26%)' : 'rgb(255 0 0 / 25%)'}`, color: `${project.status === 'Coming' ? '#f1b90c' : project.status === 'Open' ? '#5cb85c' : 'red'}` }}>
                                            <BsCircleFill style={{ fontSize: '.6rem', verticalAlign: 'middle' }} />
                                            {project.status === 'Coming' ? ' Opens in TBA' : project.status === 'Open' ? ' Opened' : ' Closed'}
                                        </span> &nbsp; */}
                                         <span className="status" style={{ backgroundColor:'rgb(255 0 0 / 25%)', color:'red' }}>
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

                                        {(whitelistOfTiers[toCheckAddress(account)] > 0 && currentTime <= saleEndTime && currentTime >= saleStartTime) && (
                                            <button className="btn btn-wallet wallet-connected mr-4 mb-2" onClick={ () => handleBuyToken(true) }> <BiMoney /> Buy SWPR (WhiteList) </button>
                                        ) || (whitelistOfTiers[toCheckAddress(account)] > 0 && currentTime <= saleEndTime && currentTime < saleStartTime) && ( <button className="btn btn-wallet wallet-connected mx-auto mb-2" disabled> <BsClockHistory /> {tmp_day_wl} Days {tmp_hour_wl} Hours {tmp_min_wl} Mins {tmp_sec_wl} Sec</button>
                                        )}

                                        {(whitelistOfTiers[toCheckAddress(account)] && currentTime >= startFcfsTime && currentTime <= saleEndTime && currentTime >= saleStartTime) && (
                                            <button className="btn btn-wallet wallet-connected mx-auto mb-2" onClick={ () => handleBuyToken(false) }> <BiMoney /> Buy SWPR ( FCFS ) </button>
                                        ) || (whitelistOfTiers[toCheckAddress(account)] && currentTime < startFcfsTime && currentTime <= saleEndTime && currentTime >= saleStartTime) && ( <button className="btn btn-wallet wallet-connected mx-auto mb-2" disabled> <BsClockHistory /> {tmp_day_fcfs} Days {tmp_hour_fcfs} Hours {tmp_min_fcfs} Mins {tmp_sec_fcfs} Sec</button>
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
                                {whitelistOfTiers[toCheckAddress(account)] && (
                                    <div> { Number(tier).toFixed(2) + ' USD'} </div>
                                ) || (
                                    <div> This wallet is not whitelisted </div>
                                )}
                                <div style={{paddingRight: '3rem'}}> {} </div>
                                {whitelistOfTiers[toCheckAddress(account)] && (
                                    <div> { Number(tier * 100).toFixed(2) + ' SWPR'} </div>
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
                                        <span>Participants <span style={{ color: 'white', fontWeight: 'bold' }}>{ saleParticipants }</span></span>
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
            <MyModal isOpen = { isOpen } setIsOpen = {setIsOpen} onlyOneToast = {true}/>
            <BuyModalNew isOpen = { isOpenBuy } setIsOpen = {setIsOpenBuy} onlyOneToast = {false} isFixed = {isFixed}/>
        </>
    );
}