/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { Toast } from "react-bootstrap";

import useNetworkStatus from "../../store/useNetworkStatus";
import { initPublicClient } from "../../xWeb3";

import { CasperClient } from "casper-js-sdk";
import { NODE_ADDRESS } from "../../xWeb3/constants";

const BuyModal = (props) => {
  const {
    isOpen,
    setIsOpen,
    tokenSymbol,
    vestAmount,
    tokenPrice,
    contractAddress,
    minAmount,
    maxAmount,
    fetchData,
  } = props;
  const [isOpenVest, setIsOpenVest] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [buyCsprAmount, setBuyCsprAmount] = useState(0);
  const [buyTokenAmount, setBuyTokenAmount] = useState(0);
  const [toastText, setToastText] = useState("");
  const [loading, setLoading] = useState(false);

  const { casperConnected, casperAddress } = useNetworkStatus();

  useEffect(() => {
    if (!isOpen) return;
    let min = minAmount - vestAmount;
    min = min > 0 ? min : 0;
    handleCsprChange(min);
  }, [isOpen]);

  useEffect(() => {
    if (!casperConnected) setIsOpen(false);
  }, [casperAddress]);

  const handleClose = () => setIsOpen(false);
  const handleCloseVest = () => setIsOpenVest(false);

  const handleCsprChange = (val) => {
    if (val.length > 11) return;
    let csprAmount = Number(val);
    let min = minAmount - vestAmount;
    let max = maxAmount - vestAmount;
    min = min > 0 ? min : 0;
    if (val < 0 || val > max) csprAmount = buyCsprAmount;
    setBuyCsprAmount(csprAmount);
    setBuyTokenAmount(csprAmount / tokenPrice);
  };

  const handleTokenChange = (val) => {
    if (val.length > 11) return;
    let csprAmount = Number(val) * tokenPrice;
    let min = minAmount - vestAmount;
    let max = maxAmount - vestAmount;
    min = min > 0 ? min : 0;
    if (val < 0 || val > max) csprAmount = buyCsprAmount;
    setBuyCsprAmount(csprAmount);
    setBuyTokenAmount(csprAmount / tokenPrice);
  };

  async function handleVest() {
    let min = minAmount - vestAmount;
    min = min > 0 ? min : 0;

    if (buyCsprAmount < min) {
      setToastText(`You have to vest more than ${min} CSPR!`);
      setShowToast(true);
      return;
    }

    setBuyTokenAmount(Number(buyTokenAmount).toFixed(3));
    setBuyCsprAmount(Number(buyCsprAmount).toFixed(3));

    try {
      setLoading(true);
      const casperpadClient = await initPublicClient(contractAddress);
      const deployHash = await casperpadClient.createOrder(
        casperAddress,
        Number(buyCsprAmount) * 10 ** 9
      );
      const interval = setInterval(async () => {
        const casperClient = new CasperClient(NODE_ADDRESS);
        const [, deployResult] = await casperClient.getDeploy(deployHash);
        if (deployResult.execution_results.length !== 0) {
          clearInterval(interval);
          setLoading(false);
          handleClose();
          if (deployResult.execution_results[0].result.Success) {
            setIsOpenVest(true);
            fetchData();
          } else if (deployResult.execution_results[0].result.Failure) {
            setToastText("Vest failed!");
            setShowToast(true);
          }
        }
      }, 5000);
    } catch (err) {
      setLoading(false);
      setToastText("Vest failed!");
      setShowToast(true);
      handleClose();
    }
  }

  return (
    <>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={7000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Notice</strong>
          <small className="mr-auto"></small>
        </Toast.Header>
        <Toast.Body>{toastText}</Toast.Body>
      </Toast>
      <Modal show={isOpen} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Vesting</Modal.Title>
        </Modal.Header>
        {(loading && <Spinner animation="border" />) || (
          <Modal.Body className="text-center">
            <div className="outer bg-black absolute top-0 left-0 h-full w-full z-20 opacity-80"></div>

            <div
              className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center"
              onClick={() => handleClose()}
            >
              <div
                className="inner max-w-screen-sm flex-grow  text-white  bg-gradient-to-br from-yellow-200 to-yellow-700 p-1 opacity-100 rounded-3xl"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {casperConnected && (
                  <>
                    <div
                      data-bs-dismiss="modal"
                      id="wallet-connect-caspersigner"
                      className="c-list border-b px-3 py-2 d-flex align-items-center"
                    >
                      <div className="text-white m-auto">
                        Your MIN buyable amount is:{" "}
                        {minAmount - vestAmount > 0
                          ? minAmount - vestAmount
                          : 0}
                        CSPR! <br />
                        Your MAX buyable amount is: {maxAmount - vestAmount}
                        CSPR! <br />
                      </div>
                    </div>
                    <div
                      data-bs-dismiss="modal"
                      id="wallet-connect-caspersigner"
                      className="c-list border-b px-3 py-2 d-flex align-items-center"
                    >
                      <div className="text-white m-auto"> CSPR</div>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          step={0.001}
                          value={buyCsprAmount}
                          onChange={(e) => handleCsprChange(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      data-bs-dismiss="modal"
                      id="wallet-connect-caspersigner"
                      className="c-list border-b px-3 py-2 d-flex align-items-center"
                    >
                      <div className="text-white m-auto"> {tokenSymbol}</div>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          step={0.001}
                          min={0}
                          value={buyTokenAmount}
                          onChange={(e) => handleTokenChange(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      data-bs-dismiss="modal"
                      id="wallet-connect-caspersigner"
                      className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer"
                    >
                      <button
                        className="btn btn-wallet wallet-connected m-auto"
                        onClick={handleClose}
                      >
                        {" "}
                        Cancel{" "}
                      </button>
                      <button
                        className="btn btn-wallet wallet-connected m-auto"
                        onClick={handleVest}
                      >
                        {" "}
                        &nbsp;Vest&nbsp;
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>

      <Modal show={isOpenVest} onHide={handleCloseVest} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Vest {tokenSymbol} Token</Modal.Title>
        </Modal.Header>
        {(loading && <Spinner animation="border" />) || (
          <Modal.Body className="text-center">
            <div className="outer bg-black absolute top-0 left-0 h-full w-full z-20 opacity-80"></div>

            <div
              className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center"
              onClick={() => handleCloseVest()}
            >
              <div
                className="inner max-w-screen-sm flex-grow  text-white  bg-gradient-to-br from-yellow-200 to-yellow-700 p-1 opacity-100 rounded-3xl"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {casperConnected && (
                  <>
                    <div
                      data-bs-dismiss="modal"
                      id="wallet-connect-caspersigner"
                      className="c-list border-b px-3 py-2 d-flex align-items-center"
                    >
                      <div className="text-white m-auto">
                        {" "}
                        Vest added successfully!{" "}
                      </div>
                    </div>
                    <div
                      data-bs-dismiss="modal"
                      id="wallet-connect-caspersigner"
                      className="c-list border-b px-3 py-2 d-flex align-items-center"
                    >
                      <div className="text-white m-auto"> CSPR</div>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          value={buyCsprAmount}
                          disabled
                        />
                      </div>
                    </div>
                    <div
                      data-bs-dismiss="modal"
                      id="wallet-connect-caspersigner"
                      className="c-list border-b px-3 py-2 d-flex align-items-center"
                    >
                      <div className="text-white m-auto"> {tokenSymbol}</div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={buyTokenAmount}
                          disabled
                        />
                      </div>
                    </div>
                    <div
                      data-bs-dismiss="modal"
                      id="wallet-connect-caspersigner"
                      className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer"
                    >
                      <button
                        className="btn btn-wallet wallet-connected m-auto"
                        onClick={handleCloseVest}
                      >
                        {" "}
                        Close{" "}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default BuyModal;
