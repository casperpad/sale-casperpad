import CasperpadClient from "./casperpad-client";
import { NODE_ADDRESS, CHAIN_NAME, CASPERIDO_CONTRACT_HASH } from "./constants";

import { CLPublicKey } from "casper-js-sdk";

export const initClient = async () => {
  const casperpadClient = new CasperpadClient(
    NODE_ADDRESS,
    CHAIN_NAME,
    undefined
  );
  await casperpadClient.setContractHash(CASPERIDO_CONTRACT_HASH.slice(5));

  return casperpadClient;
};

export const getAccountHashString = (casperAddress) => {
  if (casperAddress === "") return "";
  const publicKey = CLPublicKey.fromHex(casperAddress);
  const accountHash = publicKey.toAccountHashStr().slice(13);
  return accountHash;
};
