// http://95.217.34.115:7777/rpc
// http://3.136.227.9:7777/rpc
// http://159.65.118.250:7777/rpc

export const NODE_ADDRESS =
  process.env.REACT_APP_CASPER_NODE_ADDRESS ||
  "https://staging.casper-pad.io/api/cors?url=http://159.65.118.250:7777/rpc";
// "https://picaswap.io/.netlify/functions/cors?url=http://159.65.118.250:7777/rpc";
// "http://192.168.116.53:11101/rpc";

export const CHAIN_NAME =
  process.env.REACT_APP_CASPER_CHAIN_NAME || "casper-test";

export const FACTORY_CONTRACT_HASH =
  "hash-354d66d67c652bddd250242c696f8f615c16779fbf9d8144060ba295e9e767f9";
