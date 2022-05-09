import {
  Signer,
  DeployUtil,
  CasperClient,
} from 'casper-js-sdk';

import { utils, constants } from 'casper-js-client-helper';

import { NODE_ADDRESS, CASPERIDO_CONTRACT_HASH, CHAIN_NAME } from './constants';

const { DEFAULT_TTL } = constants;

const signDeploy = async (deploy, publicKey) => {
  const deployJSON = DeployUtil.deployToJson(deploy);
  const publicKeyHex = publicKey.toHex();
  const signedDeployJSON = await Signer.sign(
    deployJSON,
    publicKeyHex,
    publicKeyHex
  );
  const signedDeploy = DeployUtil.deployFromJson(signedDeployJSON).unwrap();
  return signedDeploy;
}

const contractCallFn = async({
  nodeAddress,
  contractHash,
  publicKey,
  chainName,
  entryPoint,
  runtimeArgs,
  paymentAmount,
  ttl = DEFAULT_TTL,
  dependencies = [],
}) => {
  const client = new CasperClient(nodeAddress);
  const contractHashAsByteArray = utils.contractHashToByteArray(contractHash);

  const dependenciesBytes = dependencies.map((d) => {
    Uint8Array.from(Buffer.from(d, "hex"));
  });

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      publicKey,
      chainName,
      1,
      ttl,
      dependenciesBytes
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      entryPoint,
      runtimeArgs
    ),
    DeployUtil.standardPayment(paymentAmount)
  );

  deploy = await signDeploy(deploy, publicKey);

  return await client.putDeploy(deploy);
}

export async function contractCallWithSigner({
  publicKey,
  paymentAmount,
  entryPoint,
  runtimeArgs,
  cb,
  ttl = DEFAULT_TTL,
  dependencies = [],
}) {
  //if(!this.contractHash) throw Error("Invalid Contract Hash");
  const deployHash = contractCallFn({
    contractHash: CASPERIDO_CONTRACT_HASH.slice(5),
    nodeAddress: NODE_ADDRESS,
    chainName: CHAIN_NAME,
    publicKey,
    entryPoint,
    runtimeArgs,
    paymentAmount,
    ttl,
    dependencies,
  });

  if(deployHash !== null) {
    cb && cb(deployHash);
    return deployHash;
  } else {
    throw Error("Invalid Deploy");
  }
}

export const format = (big) => {
  console.log(big)
  if (big && big.div) {
    return big.div(10**9).toNumber() 
  } else {
    return big
  }
}