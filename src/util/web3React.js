import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
export const CHAIN_ID = parseInt(process.env.REACT_APP_BSC_CHAIN_ID) || 97;

console.log(CHAIN_ID);

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
  // supportedChainIds: [CHAIN_ID],
});

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export { networkParams } from "./networks";
