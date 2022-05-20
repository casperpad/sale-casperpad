import { CasperContractClient, helpers, utils } from "casper-js-client-helper";

import { concat } from "@ethersproject/bytes";

import {
  CLKey,
  CLAccountHash,
  CLValueBuilder,
  CLValueParsers,
  CLPublicKey,
  RuntimeArgs,
  CLString,
  CLU512,
  decodeBase16,
} from "casper-js-sdk";

import { installWasmFile, contractCallWithSigner } from "./utils";
import { CASPERIDO_CONTRACT_HASH } from "./constants";

const { setClient, contractSimpleGetter } = helpers;

const PRE_INVEST_WASM_PATH = "/pre_invest.wasm";

class CasperpadClient extends CasperContractClient {
  async setContractHash(hash) {
    const { contractPackageHash, namedKeys } = await setClient(
      this.nodeAddress,
      hash,
      ["projects", "tiers", "invests", "claims"]
    );
    this.contractHash = hash;
    this.contractPackageHash = contractPackageHash;
    this.namedKeys = namedKeys;
  }

  async getTierDataOfAccount(accountHash, projectId, namedKey) {
    const finalBytes = concat([
      CLValueParsers.toBytes(
        new CLKey(new CLAccountHash(decodeBase16(accountHash)))
      ).unwrap(),
      CLValueParsers.toBytes(CLValueBuilder.string(projectId)).unwrap(),
    ]);

    const encodedBytes = Buffer.from(finalBytes).toString("base64");
    const result = await utils.contractDictionaryGetter(
      this.nodeAddress,
      encodedBytes,
      this.namedKeys[namedKey]
    );
    return result;
  }

  async getClaimedToken(accountHash, projectId, scheduleId) {
    const finalBytes = concat([
      CLValueParsers.toBytes(
        new CLKey(new CLAccountHash(decodeBase16(accountHash)))
      ).unwrap(),
      CLValueParsers.toBytes(CLValueBuilder.string(projectId)).unwrap(),
      CLValueParsers.toBytes(CLValueBuilder.u8(scheduleId)).unwrap(),
    ]);

    const encodedBytes = Buffer.from(finalBytes).toString("base64");
    const result = await utils.contractDictionaryGetter(
      this.nodeAddress,
      encodedBytes,
      this.namedKeys["claims"]
    );
    return result;
  }

  async getProjectUrefById(project_id) {
    const key = CLValueBuilder.string(project_id);
    const keyBytes = CLValueParsers.toBytes(key).unwrap();
    const itemKey = Buffer.from(keyBytes).toString("base64");
    const result = await utils.contractDictionaryGetter(
      this.nodeAddress,
      itemKey,
      this.namedKeys["projects"]
    );
    return result;
  }

  async getDataByFieldName(project_uref, field_name) {
    const name_field = CLValueBuilder.string(field_name);
    const finalBytes = concat([CLValueParsers.toBytes(name_field).unwrap()]);
    const encodedBytes = Buffer.from(finalBytes).toString("base64");
    const result = await utils.contractDictionaryGetter(
      this.nodeAddress,
      encodedBytes,
      CLValueBuilder.uref(
        project_uref.data,
        project_uref.accessRights
      ).toFormattedStr()
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
      this.namedKeys[namedKey]
    );
    return result;
  }

  async queryContract(key) {
    return await contractSimpleGetter(this.nodeAddress, this.contractHash, [
      key,
    ]);
  }

  async isAdmin(account) {
    const accountHash = CLPublicKey.fromHex(account)
      .toAccountHashStr()
      .slice(13);
    const ownerHashHex = await this.queryContract("owner");
    const ownerHash = utils.toAccountHashString(ownerHashHex);
    return accountHash === ownerHash;
  }

  async addInvest(projectId, csprAmount, proof, address) {
    const publicKey = CLPublicKey.fromHex(address);

    const converted_proof = proof.map((proofItem) => {
      return CLValueBuilder.tuple2([
        CLValueBuilder.string(Buffer.from(proofItem.data).toString("hex")),
        CLValueBuilder.u8(proofItem.position === "left" ? 0 : 1),
      ]);
    });

    const deployHash = await installWasmFile({
      publicKey,
      paymentAmount: 3.5 * 10 ** 9,
      runtimeArgs: RuntimeArgs.fromMap({
        id: new CLString(projectId),
        amount: new CLU512(csprAmount),
        proof: CLValueBuilder.list(converted_proof),
        ido_contract_hash: CLValueBuilder.key(
          CLValueBuilder.byteArray(
            decodeBase16(CASPERIDO_CONTRACT_HASH.slice(5))
          )
        ),
      }),
      pathToContract: PRE_INVEST_WASM_PATH,
    });
    return deployHash;
  }

  async claim(projectId, scheduleId, address) {
    const publicKey = CLPublicKey.fromHex(address);
    const deployHash = await contractCallWithSigner({
      publicKey,
      paymentAmount: 3 * 10 ** 9,
      entryPoint: "claim",
      runtimeArgs: RuntimeArgs.fromMap({
        id: CLValueBuilder.string(projectId),
        schedule_id: CLValueBuilder.u8(scheduleId),
      }),
      cb: (deployHash) => this.addPendingDeploy("claim", deployHash),
    });
    return deployHash;
  }
}

export default CasperpadClient;
