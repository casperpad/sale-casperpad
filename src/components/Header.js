import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import logo from "../assets/logo.png";
import { FaAlignJustify, ImStarEmpty, ImStarFull } from "react-icons/all";
import MyModal from "./modal/Modal";
import useNetworkStatus from "../store/useNetworkStatus";
import { toHex, networkParams, CHAIN_ID } from "../util/web3React";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [star, setStar] = useState(true);
  const [isToggle, setIsToggle] = useState(false);

  const { casperConnected, casperAddress } = useNetworkStatus();
  const {
    account: binanceAddress,
    active: binanceConnected,
    library,
    chainId,
  } = useWeb3React();

  const switchNetwork = useCallback(
    async (network) => {
      if (library === undefined) return;
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(network) }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [networkParams[toHex(network)]],
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
    [library]
  );

  useEffect(() => {
    switchNetwork(CHAIN_ID);
  }, [chainId, switchNetwork]);

  function handleToggle() {
    setIsToggle(!isToggle);
  }

  function handleStar() {
    setStar(!star);
  }

  function connectWallet() {
    setIsOpen(true);
  }

  return (
    <header className="header">
      <nav className="navbar">
        <a className="cursor-pointer" href="https://casper-pad.io">
          <img src={logo} alt="logo"></img>
          <span className="title">CasperPad</span>
        </a>
        <div className="nav-center">
          <ul className={isToggle ? "nav-links show-nav" : "nav-links"}>
            {casperConnected || binanceConnected ? (
              <li>
                <button
                  className="btn btn-wallet wallet-connected"
                  onClick={connectWallet}
                >
                  {binanceConnected &&
                    String(binanceAddress).substring(0, 5) +
                      " . . . " +
                      String(binanceAddress).slice(-3)}
                  {binanceConnected && casperConnected && <br />}
                  {casperConnected &&
                    String(casperAddress).substring(0, 5) +
                      " . . . " +
                      String(casperAddress).slice(-3)}
                </button>
              </li>
            ) : (
              <li className=" d-flex">
                <button
                  className="btn btn-wallet wallet-default my-auto"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              </li>
            )}

            <li>
              <Link className="btn-wallet wallet-default my-auto" to="/">
                Home
              </Link>
            </li>
            {/* <li><Link to="/staking">Staking</Link></li>
                        <li><Link to="/error">Error</Link></li> */}
          </ul>
          <ul className="nav-mobile">
            <li>
              <button type="button" className="nav-btn" onClick={handleToggle}>
                <FaAlignJustify className="nav-icon" />
              </button>
            </li>
            {
              <li>
                {star ? (
                  <button
                    type="button"
                    className="nav-btn"
                    onClick={handleStar}
                  >
                    <ImStarEmpty className="nav-icon" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="nav-btn"
                    onClick={handleStar}
                  >
                    <ImStarFull className="nav-icon" />
                  </button>
                )}
              </li>
            }
          </ul>
        </div>
      </nav>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} onlyOneToast={false} />
    </header>
  );
};

export default Header;
