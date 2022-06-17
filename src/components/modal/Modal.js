/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Modal from "react-bootstrap/Modal";
import { Toast } from "react-bootstrap";
import metamask from "../../assets/icons/metamask.svg";
import caspersigner from "../../assets/icons/caspersigner.svg";

import useNetworkStatus from "../../store/useNetworkStatus";
import { Signer } from "casper-js-sdk";
import { injected } from "../../util/web3React";

const MyModal = ({ isOpen, setIsOpen, onlyOneToast }) => {
  const { casperConnected, casperAddress, setCasperAddress } =
    useNetworkStatus();

  const [showToast, setShowToast] = useState(false);
  const { account, activate, deactivate, active, chainId, library } =
    useWeb3React();

  const handleClose = () => setIsOpen(false);

  async function handleConnectWalletMeta() {
    await activate(injected);
    handleClose();
  }

  // function handleConnectWalletTrust() { activate(walletconnect); }

  function handleDisconnectWalletMeta() {
    deactivate();
    handleClose();
  }

  async function handleConnectWalletCasper() {
    const address = await Signer.getActivePublicKey().catch((error) => {
      Signer.sendConnectionRequest();
    });
    setCasperAddress(address);
    handleClose();
  }

  function handleDisconnectWalletCasper() {
    Signer.disconnectFromSite();
    setCasperAddress("");
    handleClose();
  }

  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connect Wallet</Modal.Title>
        </Modal.Header>
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
              {(active && (
                <>
                  <div
                    data-bs-dismiss="modal"
                    id="wallet-connect-metamask"
                    className="c-list border-b px-3 py-2 d-flex align-items-center"
                  >
                    <div className="text-white col-12 m-auto">
                      {" "}
                      <span style={{ wordBreak: "break-all" }}>{account}</span>
                    </div>
                  </div>
                  <div
                    data-bs-dismiss="modal"
                    id="wallet-connect-metamask"
                    className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer"
                  >
                    <a
                      href={"https://bscscan.com/address/" + account}
                      target="_blank"
                      className="text-white m-auto"
                      rel="noreferrer"
                    >
                      {" "}
                      View on BSCScan{" "}
                    </a>
                    <a
                      className="text-white m-auto"
                      onClick={handleDisconnectWalletMeta}
                    >
                      {" "}
                      Disconnect
                    </a>
                  </div>
                </>
              )) || (
                <>
                  <div
                    data-bs-dismiss="modal"
                    id="wallet-connect-metamask"
                    className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer"
                    onClick={handleConnectWalletMeta}
                  >
                    <div className="text-white mr-auto"> MetaMask</div>
                    <img
                      src={metamask}
                      width="30px"
                      className="me-2"
                      alt="casperpad"
                    />
                  </div>
                  {/* <div data-bs-dismiss="modal" id="wallet-connect-binance chain wallet" className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer" onClick={ handleConnectWalletMeta }>
                                <div className="text-white mr-auto"> Binance Chain Wallet</div>
                                <img src={binance} className="me-2" alt="casperpad" />
                            </div> */}
                  {/* <div data-bs-dismiss="modal" id="wallet-connect-binance chain wallet" className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer" onClick={ handleConnectWalletTrust }>
                                <div className="text-white mr-auto"> Wallet Connect</div>
                                <img src={walletconnect_img} className="me-2 trustwallet" alt="casperpad" />
                            </div> */}
                </>
              )}
              {(casperConnected && (
                <>
                  <div
                    data-bs-dismiss="modal"
                    id="wallet-connect-casper"
                    className="c-list border-b px-3 py-2 d-flex align-items-center"
                  >
                    <div className="text-white col-12 m-auto">
                      {" "}
                      <span style={{ wordBreak: "break-all" }}>
                        {casperAddress}
                      </span>
                    </div>
                  </div>
                  <div
                    data-bs-dismiss="modal"
                    id="wallet-connect-casper"
                    className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer"
                  >
                    <a
                      href={
                        "https://testnet.cspr.live/account/" + casperAddress
                      }
                      target="_blank"
                      className="text-white m-auto"
                      rel="noreferrer"
                    >
                      {" "}
                      View on CSPR{" "}
                    </a>
                    <a
                      className="text-white m-auto"
                      onClick={handleDisconnectWalletCasper}
                    >
                      {" "}
                      Disconnect
                    </a>
                  </div>
                </>
              )) || (
                <div
                  data-bs-dismiss="modal"
                  id="wallet-connect-casper"
                  className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer"
                  onClick={handleConnectWalletCasper}
                >
                  <div className="text-white mr-auto"> CasperSigner</div>
                  <img
                    src={caspersigner}
                    width="30px"
                    className="me-2"
                    alt="casperpad"
                  />
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
        <Toast.Body>
          Your wallet must connect to the Binance Smart Chain!
        </Toast.Body>
      </Toast>
    </>
  );
};

export default MyModal;
