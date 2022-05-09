import CasperpadClient from './casperpad-client';
import {
  NODE_ADDRESS,
  CHAIN_NAME,
  CASPERIDO_CONTRACT_HASH
} from './constants';

export const initClient = async() => {
  const casperpadClient = new CasperpadClient(NODE_ADDRESS, CHAIN_NAME, undefined);
  await casperpadClient.setContractHash(CASPERIDO_CONTRACT_HASH.slice(5));

  return casperpadClient;
}