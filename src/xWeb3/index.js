import CasperpadClient from "./casperpad-client";
import CasperpadPublicClient from "./casperpad-public-client";
import FactoryClient from "./factory-client";
import { NODE_ADDRESS, CHAIN_NAME, FACTORY_CONTRACT_HASH } from "./constants";

import { CLPublicKey } from "casper-js-sdk";
import { ERC20Client } from "casper-erc20-js-client";

export const initFactoryClient = async () => {
  const factoryClient = new FactoryClient(NODE_ADDRESS, CHAIN_NAME, undefined);
  await factoryClient.setContractHash(FACTORY_CONTRACT_HASH.slice(5));

  return factoryClient;
};

export const initClient = async (contractHash) => {
  const casperpadClient = new CasperpadClient(
    NODE_ADDRESS,
    CHAIN_NAME,
    undefined
  );
  // await casperpadClient.setContractHash(contractHash);
  await casperpadClient.setContractHash(contractHash);

  return casperpadClient;
};

export const initPublicClient = async (contractHash) => {
  const casperpadClient = new CasperpadPublicClient(
    NODE_ADDRESS,
    CHAIN_NAME,
    undefined
  );
  // await casperpadClient.setContractHash(contractHash);
  await casperpadClient.setContractHash(contractHash);

  return casperpadClient;
};

export const initErc20Client = async (contractHash) => {
  const erc20Client = new ERC20Client(NODE_ADDRESS, CHAIN_NAME, undefined);
  await erc20Client.setContractHash(contractHash);

  return erc20Client;
};

export const getAccountHashString = (casperAddress) => {
  if (casperAddress === "") return "";
  const publicKey = CLPublicKey.fromHex(casperAddress);
  const accountHash = publicKey.toAccountHashStr().slice(13);
  return accountHash;
};
