import { Signer, DeployUtil, CasperClient } from "casper-js-sdk";
import { utils, constants } from "casper-js-client-helper";
import { CLValueParsers } from "casper-js-sdk";

import { NODE_ADDRESS, CHAIN_NAME } from "./constants";

import { concat } from "@ethersproject/bytes";
import blake from "blakejs";

const { DEFAULT_TTL } = constants;

export const keyAndValueToHex = (key, value) => {
  const aBytes = CLValueParsers.toBytes(key).unwrap();
  const bBytes = CLValueParsers.toBytes(value).unwrap();

  const blaked = blake.blake2b(concat([aBytes, bBytes]), undefined, 32);
  const hex = Buffer.from(blaked).toString("hex");

  return hex;
};

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
};

const contractCallFn = async ({
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
    return Uint8Array.from(Buffer.from(d, "hex"));
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
};

export async function contractCallWithSigner({
  publicKey,
  contractHash,
  paymentAmount,
  entryPoint,
  runtimeArgs,
  cb,
  ttl = DEFAULT_TTL,
  dependencies = [],
}) {
  //if(!this.contractHash) throw Error("Invalid Contract Hash");
  const deployHash = contractCallFn({
    contractHash: contractHash,
    nodeAddress: NODE_ADDRESS,
    chainName: CHAIN_NAME,
    publicKey,
    entryPoint,
    runtimeArgs,
    paymentAmount,
    ttl,
    dependencies,
  });

  if (deployHash !== null) {
    cb && cb(deployHash);
    return deployHash;
  } else {
    throw Error("Invalid Deploy");
  }
}

export const installWasmFile = async ({
  publicKey,
  pathToContract,
  runtimeArgs,
  paymentAmount,
}) => {
  const client = new CasperClient(NODE_ADDRESS);

  const file = await fetch(pathToContract);
  const bytes = await file.arrayBuffer();
  const contractContent = new Uint8Array(bytes);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(publicKey, CHAIN_NAME),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      contractContent,
      runtimeArgs
    ),
    DeployUtil.standardPayment(paymentAmount)
  );

  deploy = await signDeploy(deploy, publicKey);

  return await client.putDeploy(deploy);
};
