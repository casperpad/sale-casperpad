import { CasperContractClient, helpers } from "casper-js-client-helper";

const { setClient, contractSimpleGetter } = helpers;

class FactoryClient extends CasperContractClient {
  async setContractHash(hash) {
    const { contractPackageHash, namedKeys } = await setClient(
      this.nodeAddress,
      hash,
      ["balances", "allowances"]
    );
    this.contractHash = hash;
    this.contractPackageHash = contractPackageHash;
    this.namedKeys = namedKeys;
  }

  async queryContract(key) {
    return await contractSimpleGetter(this.nodeAddress, this.contractHash, [
      key,
    ]);
  }
}

export default FactoryClient;
