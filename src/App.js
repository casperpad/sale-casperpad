import { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Signer } from "casper-js-sdk";
import { ToastContainer } from "react-toastify";

import Projects from "./pages/Projects";
import Error from "./pages/Error";
import Project from "./pages/project";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background";

import useNetworkStatus from "./store/useNetworkStatus";
import { injected } from "./util/web3React";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { setCasperAddress } = useNetworkStatus();
  const { activate } = useWeb3React();

  useEffect(() => {
    activate(injected);
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
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
