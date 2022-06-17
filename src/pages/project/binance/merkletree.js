import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { BigNumber } from "@ethersproject/bignumber";

const encodeUint256 = (integer) => {
  return BigNumber.from(integer).toHexString().substring(2).padStart(64, "0");
};

export const generateLeaf = (address, tierAmount) => {
  return keccak256(`${address}${encodeUint256(tierAmount)}`);
};

export const generateLeaves = (investors, tier) => {
  const leaves = investors.map((investor) => {
    return generateLeaf(investor.address, tier[investor.tier]);
  });
  return leaves;
};

export const getMerkleProof = (investors, tier, address) => {
  const leaves = generateLeaves(investors, tier);

  const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
  const investor = investors.find((investor) => investor.address === address);
  if (investor === undefined) return undefined;
  return merkleTree.getHexProof(
    keccak256(`${investor.address}${encodeUint256(tier[investor.tier])}`)
  );
};
