import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Signer } from "casper-js-sdk";

import Projects from "./pages/Projects";
import Error from "./pages/Error";
import Project from "./pages/project";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background";

import useNetworkStatus from "./store/useNetworkStatus";

import "./App.css";

function App() {
  const { setCasperAddress, setBinanceAddress } = useNetworkStatus();
  const { chainId, account } = useEthers();

  useEffect(() => {
    if (chainId !== 56 && chainId !== 97) return;
    setBinanceAddress(account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Background />
      <Routes>
        <Route exact path="/" element={<Projects />} />
        <Route path="/project/*" element={<Project />} />
        <Route exact path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
