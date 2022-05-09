import {
  CasperContractClient,
  helpers,
  utils,
} from 'casper-js-client-helper';

import { concat } from "@ethersproject/bytes";
import blake from "blakejs";

import {
  CLKey,
  CLAccountHash,
  CLValueBuilder,
  CLValueParsers,
  CLPublicKey,
  RuntimeArgs,
  decodeBase16,
} from 'casper-js-sdk';

import {
  contractCallWithSigner,
} from './utils';

const {
  setClient,
  contractSimpleGetter,
} = helpers;

class CasperpadClient extends CasperContractClient {

  async setContractHash(hash) {
    const { contractPackageHash, namedKeys } = await setClient(
      this.nodeAddress,
      hash,
      [
        "projects",
      ]
    );
    this.contractHash = hash;
    this.contractPackageHash = contractPackageHash;
    this.namedKeys = namedKeys;
  }

  async queryContract(key) {
    return await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      [key],
    );
  }

  async getProjectUrefById(project_id) {
    const key = CLValueBuilder.string(project_id);
    const keyBytes = CLValueParsers.toBytes(key).unwrap();
    const itemKey = Buffer.from(keyBytes).toString("base64");
    const result = await utils.contractDictionaryGetter(
      this.nodeAddress,
      itemKey,
      this.namedKeys["projects"],
    );
    return result;
  }

  async getDataByFieldName(project_uref, field_name) {
    const name_field = CLValueBuilder.string(field_name);
    const finalBytes = concat([CLValueParsers.toBytes(name_field).unwrap()]);
    const blaked = blake.blake2b(finalBytes, undefined, 32);
    const encodedBytes = Buffer.from(blaked).toString("hex");
    const result = await utils.contractDictionaryGetter(
      this.nodeAddress,
      encodedBytes,
      CLValueBuilder.uref(project_uref.data, project_uref.accessRights).toFormattedStr()
    );
    return result;
  }

  async queryContractDictionary(publicKey, namedKey) {
    const key = new CLKey(new CLAccountHash(publicKey.toAccountHash()));
    const keyBytes = CLValueParsers.toBytes(key).unwrap();
    const itemKey = Buffer.from(keyBytes).toString("base64");
    const result = await utils.contractDictionaryGetter(
      this.nodeAddress,
      itemKey,
      this.namedKeys[namedKey],
    );
    return result;
  }

  async isAdmin(account) {
    const ownerHash = this.queryContract("owner");
    const owner = utils.toAccountHashString(ownerHash.data);
    return account === owner;
  }

  async setOwner(address) {
    const publicKey = CLPublicKey.fromHex(address);
    const deployHash = await contractCallWithSigner({
      publicKey,
      paymentAmount: 0.1 * 10 ** 9,
      entryPoint: "transfer_ownership",
      runtimeArgs: RuntimeArgs.fromMap({
        owner: CLValueBuilder.key(
          CLValueBuilder.byteArray(CLPublicKey.fromHex("01356d4dffe4fcd6a86e171c3c3c1c01cd1f1a7d476a9bb7ad05dd6713889f3e70").toAccountHash())
        ).data,
      }),
      cb: deployHash => this.addPendingDeploy("transfer_ownership", deployHash),
    });
    return deployHash;
  }
}

export default CasperpadClient;