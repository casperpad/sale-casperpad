/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { Toast } from "react-bootstrap";

import { whitelist as whitelistNew } from "../../contract_info/whitelistCASPER";

import useNetworkStatus from "../../store/useNetworkStatus";
import { initClient, getAccountHashString } from "../../xWeb3";

const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

const BuyModal = (props) => {
  const {
    isOpen,
    setIsOpen,
    projectId,
    projectName,
    tokenSymbol,
    tokenDecimals,
    cspr_token,
    token_cspr,
    tier,
    merkleRoot,
  } = props;
  const [isOpenVest, setIsOpenVest] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [buyCsprAmount, setBuyCsprAmount] = useState(0);
  const [buyTokenAmount, setBuyTokenAmount] = useState(0);
  const [toastText, setToastText] = useState("");
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState();

  const { casperConnected, casperAddress } = useNetworkStatus();

  useEffect(() => {
    if (!casperConnected) setIsOpen(false);
  }, [casperAddress]);

  const handleClose = () => setIsOpen(false);
  const handleCloseVest = () => setIsOpenVest(false);

  useEffect(() => {
    if (!isOpen) return;
    handleCsprChange(tier);

    const leaves = whitelistNew[projectId].map(keccak256);
    const tree = new MerkleTree(leaves, keccak256);

    const leaf = keccak256(getAccountHashString(casperAddress));
    const _proof = tree.getProof(leaf);

    setProof(_proof);

    const verified = tree.verify(_proof, leaf, merkleRoot);

    if (!verified) {
      setToastText("This wallet is not whitelisted");
      setShowToast(true);
      handleClose();
    }
  }, [isOpen]);

  const handleCsprChange = (val) => {
    if (Number(val) > tier) return;
    if (Number(val) < 0) val = 0;
    val = (Number(val) * 10000) % 10 !== 0 ? Number(val).toFixed(3) : val;
    setBuyCsprAmount(val);
    setBuyTokenAmount(
      ((Number(val) * cspr_token) / 10 ** tokenDecimals).toFixed(3)
    );
  };

  const handleTokenChange = (val) => {
    if (Number(val) < 0) val = 0;
    const csprAmount = (Number(val) * token_cspr) / 10 ** 9;
    if (csprAmount > tier) return;
    val = (Number(val) * 10000) % 10 !== 0 ? Number(val).toFixed(3) : val;
    setBuyTokenAmount(val);
    setBuyCsprAmount(Number(csprAmount).toFixed(3));
  };

  async function handleVest() {
    setBuyTokenAmount(Number(buyTokenAmount).toFixed(3));
    setBuyCsprAmount(Number(buyCsprAmount).toFixed(3));

    try {
      setLoading(true);
      const casperpadClient = await initClient();
      const deployHash = await casperpadClient.addInvest(
        projectName,
        Number(buyCsprAmount) * 10 ** 9,
        proof,
        casperAddress
      );
      console.log(deployHash);
      setLoading(false);
      setIsOpenVest(true);
    } catch (err) {
      setLoading(false);
      setToastText("Vest failed!");
      setShowToast(true);
    }
    handleClose();
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
                        {" "}
                        Your MAX buyable amount is: {tier}CSPR! <br />
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
                          min={0}
                          max={tier}
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
                        Vest Successfully!{" "}
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
