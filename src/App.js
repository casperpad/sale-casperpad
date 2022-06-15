/* eslint-disable react-hooks/exhaustive-deps */
import { Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Signer } from "casper-js-sdk";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Staking from "./pages/Staking";
import Error from "./pages/Error";
import Project from "./pages/Project";

import useNetworkStatus from "./store/useNetworkStatus";

import "./App.css";

function App() {
  const { setCasperAddress, setBinanceAddress } = useNetworkStatus();
  const { chainId, account } = useEthers();

  useEffect(() => {
    if (chainId !== 56 && chainId !== 97) return;
    setBinanceAddress(account);
  }, [account, chainId]);

  useEffect(() => {
    window.addEventListener("signer:disconnected", () => {
      setCasperAddress("");
    });
    window.addEventListener("signer:locked", () => {
      setCasperAddress("");
    });
    window.addEventListener("signer:connected", async (msg) => {
      let address = await Signer.getActivePublicKey().catch((error) => {
        Signer.sendConnectionRequest();
      });
      setCasperAddress(address);
    });
    window.addEventListener("signer:unlocked", async (msg) => {
      let address = await Signer.getActivePublicKey().catch((error) => {
        Signer.sendConnectionRequest();
      });
      setCasperAddress(address);
    });
    window.addEventListener("signer:activeKeyChanged", async () => {
      let address = await Signer.getActivePublicKey().catch((error) => {
        Signer.sendConnectionRequest();
      });
      setCasperAddress(address);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Projects />
        </Route>
        <Route path="/project/:network/:address">
          <Project />
        </Route>
        <Route exact path="/staking/">
          <Staking />
        </Route>
        <Route exact path="/error/">
          <Error />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
