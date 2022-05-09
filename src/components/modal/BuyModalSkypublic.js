import React, { useState, useEffect, useRef } from 'react';
import { useEthers, useTokenBalance } from "@usedapp/core";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { Toast, Form } from 'react-bootstrap';

import { 
    swprTokenAddress, 
    vestingContractAddress, 
    busdTokenAddress, 
    usdtTokenAddress, 
    whitelistOfTiers
} from '../../contract_info/vestingDataSkypublic';
import {whitelist as whitelistNew} from '../../contract_info/whitelistSkyPublic';
import { 
    useGetTierOfAccount,
    useSwprContractMethod,
    useVestingContractMethod,
    useUsdtContractMethod,
    useBusdContractMethod,
    useGetFcfsLimitAmount,
    useGetWLEndTime,
    useGetLockedAmount
} from '../../util/interactSkypublic';

const { toChecksumAddress } = require('ethereum-checksum-address');
const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs');

const BuyModalNew = ({ isOpen, setIsOpen, onlyOneToast, isFixed}) => {
    const currentTime = Math.round(new Date().getTime()/1000);
    const unmounted = useRef(true);
    const [isOpenBuy, setIsOpenBuy] = useState(false);
    const [showToastBuy, setShowToastBuy] = useState(false);
    const [buyUsdAmount, setBuyUsdAmount] = useState();
    const [buySwprAmount, setBuySwprAmount] = useState(0);
    const [payCurrency, setPayCurrency] = useState(usdtTokenAddress);
    const [tier, setTier] = useState(0);
    const [toastTextBuy, setToastTextBuy] = useState('');
    const { account } = useEthers();
    const [root, setRoot] = useState('');
    const [proof, setProof] = useState([]);
    const [verified, setVerified] = useState();
    const [loading, setLoading] = useState(false);
    const [radioFlagUSDT, setRadioFlagUSDT] = useState();
    const [radioFlagBUSD, setradioFlagBUSD] = useState();

    const fcfsLimitAmount = Number(useGetFcfsLimitAmount() / 10 ** 18 * 0.01).toFixed(2);
    const startFcfsTime = Number(useGetWLEndTime()).toString();
    const fcfsLockedAmount = Number(useGetLockedAmount(account) / 10 ** 18 * 0.01).toString();

    useEffect( () => {
        setTier(maxAmountOfTier ? Number((maxAmountOfTier*0.01)).toFixed(3) : 0);
        
        if(isOpen){
            if(isFixed)
                setBuyUsdAmount(tier);
            else
                setBuyUsdAmount(fcfsLimitAmount - fcfsLockedAmount);
        }

        if(payCurrency == busdTokenAddress){
            setRadioFlagUSDT(false);
            setradioFlagBUSD(true);
        } else{
            setRadioFlagUSDT(true);
            setradioFlagBUSD(false);
        }

        return () => { unmounted.current = false }
    }, [isOpen]);

    useEffect( () => {
        if(payCurrency == busdTokenAddress){
            setRadioFlagUSDT(false);
            setradioFlagBUSD(true);
        } else{
            setRadioFlagUSDT(true);
            setradioFlagBUSD(false);
        }

        return () => { unmounted.current = false }
    }, [loading]);
    
    useEffect( () => {
        const leaves = whitelistNew.map((v) => keccak256(v));
        const tree = new MerkleTree(leaves, keccak256, { sort: true });
        const _root = tree.getHexRoot();
        const leaf = keccak256(account);
        const _proof = tree.getHexProof(leaf);
        
        setProof(_proof);
        setRoot(_root);

        const _verified = tree.verify(_proof, leaf, _root);
        setVerified(_verified);
        console.log('root', root)

    }, [account]);
    

    let maxAmountOfTier = useGetTierOfAccount(account);
    useEffect( () => {
        setTier(maxAmountOfTier ? Number((maxAmountOfTier*0.01)).toFixed(3) : 0);
        setBuyUsdAmount(tier);
        return () => { unmounted.current = false }
    }, [maxAmountOfTier, tier]);

    useEffect( () => {
        setBuySwprAmount(Number(buyUsdAmount * 100).toFixed(3));
        setTier(maxAmountOfTier ? Number((maxAmountOfTier * 0.01)).toFixed(3) : 0);
        
        return () => { unmounted.current = false }
    }, [ buyUsdAmount]);

    const handleClose = () => {
        setIsOpen(false);
    }
    const handleCloseBuy = () => setIsOpenBuy(false);

    const { state: stateApproveUsdt, send: approveUsdt, events: getEventApproveUsdt } = useUsdtContractMethod("approve");
    const { state: stateApproveBusd, send: approveBusd, events: getEventApproveBusd } = useBusdContractMethod("approve");
    function handleApprove() {
        var tmp_tier = parseFloat(tier);
        var tmp_buyUsdAmount = parseFloat(buyUsdAmount);
        if(tmp_buyUsdAmount > tmp_tier && isFixed){
            handleClose();
            setToastTextBuy("Your amount is more than your tier of whitelist!");
            setShowToastBuy(true);
        }else if(tmp_buyUsdAmount > fcfsLimitAmount - fcfsLockedAmount && !isFixed){
            handleClose();
            setToastTextBuy("Your amount is more than your FCFS limit amount!");
            setShowToastBuy(true);
        }else{
            let approveAmount = Number(buyUsdAmount * 100).toString() + '0000000000000000';
            // console.log('approveAmount', approveAmount)
            if(payCurrency == usdtTokenAddress){
                approveUsdt(vestingContractAddress, approveAmount);
            }else {
                approveBusd(vestingContractAddress, approveAmount);
            }        
            setLoading(true);
        }
    }

    useEffect( () => {
        if(stateApproveUsdt.status == 'Success' || stateApproveBusd.status == 'Success'){
            handleClose();
            setIsOpenBuy(true);
            setLoading(false);
            stateApproveUsdt.status = false;
            stateApproveBusd.status = false;
        } else if(stateApproveUsdt.status == 'Exception' || stateApproveBusd.status == 'Exception'){
            stateApproveUsdt.status = false;
            stateApproveBusd.status = false;
            setLoading(false);
        }
        return () => { unmounted.current = false }
    }, [ stateApproveUsdt, stateApproveBusd ]);

    function handleSwitchCurrency(currency) {
        if(currency == 'usdt'){
            setPayCurrency(usdtTokenAddress);
        }else {
            setPayCurrency(busdTokenAddress);
        }
    }

    const { state: stateAddVest, send: addVest, events: getEventAddVest } = useVestingContractMethod("addVest");
    function handleBuy() {
        if(currentTime < startFcfsTime){
            if(verified){
                addVest(proof, Math.round(buySwprAmount), isFixed, payCurrency);
                setLoading(true);
            }
        } else{
            addVest(proof, Math.round(buySwprAmount), isFixed, payCurrency);
            setLoading(true);
        }
    }

    useEffect( () => {
        if(stateAddVest.status == 'Success') {
            handleCloseBuy();
            setToastTextBuy("Congratulations! You have successfully took part of the Public Sale! TGE unlocks on 11.04.2022 at 14:00 UTC");
            setShowToastBuy(true);
            setLoading(false);
            stateAddVest.status = false;
        }else if(stateAddVest.status == 'Exception') {
            handleCloseBuy();
            setToastTextBuy(stateAddVest.errorMessage);
            setShowToastBuy(true);
            setLoading(false);
            stateAddVest.status = false;
        }
        return () => { unmounted.current = false }
    }, [ stateAddVest ]);

    return (
        <>
            <Toast onClose={() => setShowToastBuy(false)} show={showToastBuy} delay={7000} autohide>
            <Toast.Header>
                <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
                />
                <strong className="me-auto">Notice</strong>
                <small className="mr-auto"></small>
            </Toast.Header>
            <Toast.Body>{ toastTextBuy }</Toast.Body>
            </Toast>
            <Modal show={isOpen} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Approve</Modal.Title>
                </Modal.Header>
                {loading && (<Spinner animation="border" />)
                || (<Modal.Body className="text-center">
                    <div className="outer bg-black absolute top-0 left-0 h-full w-full z-20 opacity-80"></div>

                    <div className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center" onClick={() => handleClose()} >
                        <div className="inner max-w-screen-sm flex-grow  text-white  bg-gradient-to-br from-yellow-200 to-yellow-700 p-1 opacity-100 rounded-3xl" onClick={ (e) => { e.stopPropagation(); }} >
                            {account && (
                                <>
                                    <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                        {isFixed && (
                                            <div className="text-white m-auto"> Your MAX buyable amount is: ${tier}! <br/>(Note: You can only buy once! The BUY popup will show after clicking enable and confirming on MetaMask!)</div>
                                        ) || (
                                            <div className="text-white m-auto"> The Buyable Maximum Amount Of FCFS Is ${fcfsLimitAmount} and You Already bought ${fcfsLockedAmount} ! <br/></div>
                                        )}
                                    </div>
                                    <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                        <div className="text-white m-auto"> 
                                            <Form>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={radioFlagUSDT}
                                                    label="USDC"
                                                    name="group1"
                                                    type="radio"
                                                    id="inline-radio-1"
                                                    onClick={() => handleSwitchCurrency('usdt')}
                                                />
                                                <Form.Check
                                                    inline
                                                    defaultChecked={radioFlagBUSD}
                                                    label="BUSD"
                                                    name="group1"
                                                    type="radio"
                                                    id="inline-radio-2"
                                                    onClick={() => handleSwitchCurrency('busd')}
                                                />
                                            </Form>
                                        </div>
                                        <div>
                                        {isFixed && (
                                            <input className='form-control' type="number" step="0.01" max={ tier }  value={ buyUsdAmount } onChange={e => setBuyUsdAmount(e.target.value)} />
                                        ) || (
                                            <input className='form-control' type="number" step="0.01" max={ fcfsLimitAmount - fcfsLockedAmount } value={ buyUsdAmount } onChange={e => setBuyUsdAmount(e.target.value)} />
                                        )}
                                        </div>
                                    </div>
                                    <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                        <div className="text-white m-auto"> SKBR</div>
                                        <div>
                                            <input className='form-control' type="text" value={ buySwprAmount } disabled/>
                                        </div>
                                    </div>
                                    <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer">
                                        <button className="btn btn-wallet wallet-connected m-auto" onClick={ handleClose }> Cancel </button>
                                        <button className="btn btn-wallet wallet-connected m-auto" onClick={ handleApprove }> Enable</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Modal.Body>)
                }
            </Modal>

            <Modal show={isOpenBuy} onHide={handleCloseBuy} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Buy SKBR Token</Modal.Title>
                </Modal.Header>
                {loading && (<Spinner animation="border" />)
                || (
                <Modal.Body className="text-center">
                    
                    <div className="outer bg-black absolute top-0 left-0 h-full w-full z-20 opacity-80"></div>

                    <div className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center" onClick={() => handleCloseBuy()} >
                        <div className="inner max-w-screen-sm flex-grow  text-white  bg-gradient-to-br from-yellow-200 to-yellow-700 p-1 opacity-100 rounded-3xl" onClick={ (e) => { e.stopPropagation(); }} >
                            {account && (
                                <>
                                    <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                        <div className="text-white m-auto"> Approve Successfully! </div>
                                    </div>
                                    <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                        <div className="text-white m-auto"> USD</div>
                                        <div>
                                            <input className='form-control' type="number" value={ buyUsdAmount } disabled />
                                        </div>
                                    </div>
                                    <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                        <div className="text-white m-auto"> SKBR</div>
                                        <div>
                                            <input className='form-control' type="text" value={ buySwprAmount } disabled/>
                                        </div>
                                    </div>
                                    <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer">
                                        <button className="btn btn-wallet wallet-connected m-auto" onClick={ handleCloseBuy }> Cancel </button>
                                        <button className="btn btn-wallet wallet-connected m-auto" onClick={ handleBuy }> Buy </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Modal.Body>)}
            </Modal>
        </>
    );
  }
  
  export default BuyModalNew;