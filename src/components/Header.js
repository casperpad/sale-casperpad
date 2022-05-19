import React, { useState } from 'react';

import logo from '../assets/logo.png';
import { FaAlignJustify, ImStarEmpty, ImStarFull } from 'react-icons/all';
import MyModal from './modal/Modal';
import useNetworkStatus from '../store/useNetworkStatus';

const Header =() => {
    const [isOpen, setIsOpen] = useState(false);
    const [star, setStar] = useState(true);
    const [isToggle, setIsToggle] = useState(false);

    const {
        casperConnected,
        binanceConnected,
        casperAddress,
        binanceAddress,
        showBinanceProjects,
        showCasperProjects,
    } = useNetworkStatus();

    function handleToggle(){
        setIsToggle(!isToggle);
    };

    function handleStar(){
        setStar(!star);
    }

    function connectWallet(){
        setIsOpen(true);
    }

    return (
        <>
        <section className="header">
            <nav className="navbar">
                <a className="cursor-pointer" href="https://casper-pad.io">
                    <img src={logo} alt="logo"></img>
                    <span className='title'>CasperPad</span>
                </a>
                <div className="nav-center">
                    <ul className={isToggle ? "nav-links show-nav" : "nav-links"}>
                        {(  ((!binanceConnected && !casperConnected)
                            || (binanceConnected && !showBinanceProjects)
                            || (casperConnected && !showCasperProjects)
                            ) && (
                            <li className=" d-flex">
                                <button className="btn btn-wallet wallet-default my-auto" onClick={connectWallet}>
                                    Connect Wallet
                                </button>
                            </li>
                        )) || ((
                            <li>
                                <button className="btn btn-wallet wallet-connected" onClick={connectWallet}>
                                    {binanceConnected && showBinanceProjects && String(binanceAddress).substring(0, 5) + " . . . " + String(binanceAddress).slice(-3) }
                                    {(binanceConnected && casperConnected && showBinanceProjects && showCasperProjects) && <br/> }
                                    {casperConnected && showCasperProjects && String(casperAddress).substring(0, 5) + " . . . " + String(casperAddress).slice(-3) }
                                </button>
                            </li>
                        ))}
                        <li><a className="btn-wallet wallet-default my-auto" href="/">Home</a></li>
                        {/* <li><Link to="/staking">Staking</Link></li>
                        <li><Link to="/error">Error</Link></li> */}
                    </ul>
                    <ul className="nav-mobile">
                        <li>
                            <button type="button" className="nav-btn" onClick={handleToggle}><FaAlignJustify className="nav-icon" /></button>
                        </li>
                        {<li>{star ?
                            <button type="button" className="nav-btn" onClick={handleStar}>
                                <ImStarEmpty className="nav-icon" />
                            </button>
                            : <button type="button" className="nav-btn" onClick={handleStar}>
                                <ImStarFull className="nav-icon" />
                            </button>}
                        </li>}
                    </ul>
                </div>
            </nav>
            <MyModal isOpen = { isOpen } setIsOpen = {setIsOpen} onlyOneToast = {false}/>
        </section>
        </>
    );
}

export default Header;
