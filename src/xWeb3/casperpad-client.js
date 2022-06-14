import { CasperContractClient, helpers, utils } from "casper-js-client-helper";

import {
  CLAccountHash,
  CLValueBuilder,
  CLPublicKey,
  RuntimeArgs,
  CLU256,
  CLU512,
  decodeBase16,
} from "casper-js-sdk";

import {
  installWasmFile,
  contractCallWithSigner,
  keyAndValueToHex,
} from "./utils";

const { setClient, contractSimpleGetter } = helpers;

const PRE_INVEST_WASM_PATH = "/pre_create_order.wasm";

class CasperpadClient extends CasperContractClient {
  async setContractHash(hash) {
    const { contractPackageHash, namedKeys } = await setClient(
      this.nodeAddress,
      hash,
      [
        "auction_end_time",
        "auction_start_time",
        "auction_token_capacity",
        "auction_token_price",
        "pay_token",
        "claims",
        "creator",
        "factory_contract",
        "info",
        "launch_time",
        "merkle_root",
        "orders",
        "reentrancy_guard",
        "schedules",
        "total_participants",
        "sold_amount",
      ]
    );
    this.contractHash = hash;
    this.contractPackageHash = contractPackageHash;
    this.namedKeys = namedKeys;
  }

  async queryContractDictionary(dictionary, key) {
    const result = await utils.contractDictionaryGetter(
      this.nodeAddress,
      key,
      this.namedKeys[dictionary]
    );
    return result;
  }

  async order_of(account) {
    return await this.queryContractDictionary("orders", account);
  }

  async claim_of(account, time) {
    const clAccount = CLValueBuilder.key(
      new CLAccountHash(decodeBase16(account))
    );
    const clTime = CLValueBuilder.u64(time);
    const key = keyAndValueToHex(clAccount, clTime);
    return await this.queryContractDictionary("claims", key);
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
    const ownerHashHex = await this.queryContract("creator");
    const ownerHash = utils.toAccountHashString(ownerHashHex);
    return accountHash === ownerHash;
  }

  async createOrder(address, csprAmount, proof, tier) {
    const publicKey = CLPublicKey.fromHex(address);

    const converted_proof = proof.map((proofItem) => {
      return CLValueBuilder.tuple2([
        CLValueBuilder.string(Buffer.from(proofItem.data).toString("hex")),
        CLValueBuilder.u8(proofItem.position === "left" ? 0 : 1),
      ]);
    });

    const deployHash = await installWasmFile({
      publicKey,
      paymentAmount: 7 * 10 ** 9,
      runtimeArgs: RuntimeArgs.fromMap({
        tier: new CLU256(tier),
        amount: new CLU512(csprAmount),
        proof: CLValueBuilder.list(converted_proof),
        ido_contract_hash: CLValueBuilder.string(
          `contract-${this.contractHash}`
        ),
      }),
      pathToContract: PRE_INVEST_WASM_PATH,
    });
    return deployHash;
  }

  async claim(address, time) {
    const publicKey = CLPublicKey.fromHex(address);

    const deployHash = await contractCallWithSigner({
      publicKey,
      contractHash: this.contractHash,
      paymentAmount: 2 * 10 ** 9,
      entryPoint: "claim",
      runtimeArgs: RuntimeArgs.fromMap({
        schedule_time: CLValueBuilder.u64(time),
      }),
      cb: (deployHash) => this.addPendingDeploy("claim", deployHash),
    });
    return deployHash;
  }
}

export default CasperpadClient;
