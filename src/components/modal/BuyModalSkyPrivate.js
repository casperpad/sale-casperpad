import React, { useState, useEffect, useRef } from 'react';
import { useEthers } from "@usedapp/core";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { Toast, Form } from 'react-bootstrap';

import { 
    swprTokenAddress, 
    vestingContractAddress, 
    busdTokenAddress, 
    usdtTokenAddress, 
    whitelistOfTiers 
} from '../../contract_info/vestingDataSkyPrivate';
import {whitelist} from '../../contract_info/whitelistSkyPrivate';
import { 
    useGetTierOfAccount,
    useSwprContractMethod,
    useVestingContractMethod,
    useUsdtContractMethod,
    useBusdContractMethod
} from '../../util/interactSkyPrivate';

const { toChecksumAddress } = require('ethereum-checksum-address');
const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs');

const BuyModal = ({ isOpenBuy, setIsOpenBuy, onlyOneToast}) => {
    const unmounted = useRef(true);
    const [isOpen, setIsOpen] = useState(false);
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

    useEffect( () => {
        const leaves = whitelist.map((v) => keccak256(v));
        const tree = new MerkleTree(leaves, keccak256, { sort: true });
        const _root = tree.getHexRoot();
        const leaf = keccak256(account);
        const _proof = tree.getHexProof(leaf);
        
        setProof(_proof);
        setRoot(_root);

        console.log('_root', _root)
        const _verified = tree.verify(_proof, leaf, _root);
        setVerified(_verified);

    }, [account]);

    let maxAmountOfTier = useGetTierOfAccount(account);
    useEffect( () => {
        setTier(maxAmountOfTier ? Number((maxAmountOfTier * 0.01)).toFixed(3) : 0);
        setBuyUsdAmount(tier);
        return () => { unmounted.current = false }
    }, [maxAmountOfTier, tier]);

    useEffect( () => {
        setBuySwprAmount(Number(buyUsdAmount * 100).toFixed(3));
        setTier(maxAmountOfTier ? Number((maxAmountOfTier * 0.01)).toFixed(3) : 0);
        setPayCurrency(usdtTokenAddress);
        return () => { unmounted.current = false }
    }, [ buyUsdAmount]);

    const handleClose = () => {
        setIsOpen(false);
    }
    const handleCloseBuy = () => setIsOpenBuy(false);

    const { state: stateApproveUsdt, send: approveUsdt, events: getEventApproveUsdt } = useUsdtContractMethod("approve");
    const { state: stateApproveBusd, send: approveBusd, events: getEventApproveBusd } = useBusdContractMethod("approve");
    function handleApprove() {
        if(buyUsdAmount > tier){
            handleClose();
            setToastTextBuy("Your amount is more than your tier of whitelist!");
            setShowToastBuy(true);
        }else {
            let approveAmount = (buyUsdAmount * 10 ** 18).toString();
            if(payCurrency == usdtTokenAddress){
                approveUsdt(vestingContractAddress, approveAmount);
            }else {
                approveBusd(vestingContractAddress, approveAmount);
            }        
        }

        
    }

    useEffect( () => {
        if(stateApproveUsdt.status == 'Success' || stateApproveBusd.status == 'Success'){
            handleClose();
            setIsOpenBuy(true);
            stateApproveUsdt.status = false;
            stateApproveBusd.status = false;
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
        if(verified){
            addVest(proof, Math.round(buySwprAmount), true);
            setLoading(true);
        }
    }

    useEffect( () => {
        if(stateAddVest.status == 'Success') {
            handleCloseBuy();
            setToastTextBuy("The vesting schedule was added successfully!");
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
          <Modal.Body className="text-center">
              
          <div className="outer bg-black absolute top-0 left-0 h-full w-full z-20 opacity-80"></div>

            <div className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center">
                <div className="inner max-w-screen-sm flex-grow  text-white  bg-gradient-to-br from-yellow-200 to-yellow-700 p-1 opacity-100 rounded-3xl" onClick={ (e) => { e.stopPropagation(); }} >
                    {account && (
                        <>
                            <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                <div className="text-white m-auto"> Your MAX buyable amount is: ${tier}! <br/>(Note: You can only buy once! The BUY popup will show after clicking enable and confirming on MetaMask!)</div>
                            </div>
                            <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                <div className="text-white m-auto"> 
                                    <Form>
                                        <Form.Check
                                            inline
                                            defaultChecked={payCurrency == usdtTokenAddress ? true : false}
                                            label="USDC"
                                            name="group1"
                                            type="radio"
                                            id="inline-radio-1"
                                            onClick={() => handleSwitchCurrency('usdt')}
                                        />
                                        <Form.Check
                                            inline
                                            defaultChecked={payCurrency == busdTokenAddress ? true : false}
                                            label="BUSD"
                                            name="group1"
                                            type="radio"
                                            id="inline-radio-2"
                                            onClick={() => handleSwitchCurrency('busd')}
                                        />
                                    </Form>
                                </div>
                                <div>
                                    <input className='form-control' type="number" step="0.1" max={ tier }  value={ buyUsdAmount } onChange={e => setBuyUsdAmount(e.target.value)} />
                                </div>
                            </div>
                            <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                <div className="text-white m-auto"> SWPR</div>
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
          </Modal.Body>
        </Modal>

        <Modal show={isOpenBuy} onHide={handleCloseBuy} backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Vesting Schedule</Modal.Title>
          </Modal.Header>
          {loading && (<Spinner animation="border" />)
            || (
          <Modal.Body className="text-center">
              
          <div className="outer bg-black absolute top-0 left-0 h-full w-full z-20 opacity-80"></div>

            <div className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center">
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
                                <div className="text-white m-auto"> SWPR</div>
                                <div>
                                    <input className='form-control' type="text" value={ buySwprAmount } disabled/>
                                </div>
                            </div>
                            <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer">
                                <button className="btn btn-wallet wallet-connected m-auto" onClick={ handleCloseBuy }> Cancel </button>
                                <button className="btn btn-wallet wallet-connected m-auto" onClick={ handleBuy }> Confirm </button>
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
  
  export default BuyModal;