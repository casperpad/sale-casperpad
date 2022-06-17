import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider, getDefaultProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { abi as buyOnlyContractAbi } from "../../contracts/abi/CasperPadSale.json";
import { useEffect, useMemo, useState } from "react";

const contractInterface = new ethers.utils.Interface(buyOnlyContractAbi);

export default function useBuyOnlyContract(address) {
  const { library } = useWeb3React();
  const provider = useMemo(() => {
    if (library) return new Web3Provider(library.provider);
    else return getDefaultProvider(3);
  }, [library]);
  const [participants, setParticipants] = useState(0);
  const [totalVested, setTotalVested] = useState(0);
  const [merkleRoot, setMerkleRoot] = useState();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const contract = new Contract(address, contractInterface, provider);

  useEffect(() => {
    async function fetchData() {
      try {
        const participants = await contract.participants();
        const totalVested = await contract.totalVested();
        const merkleRoot = await contract.merkleRoot();
        setParticipants(participants.toString());
        setTotalVested(totalVested.toString());
        setMerkleRoot(merkleRoot);
        setLoading(false);
        setLoaded(true);
      } catch (err) {
        setLoading(false);
        setLoaded(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const isStableCoin = async (address) => {
    return await contract.isStableCoin(address);
  };

  const addVest = async (proof, amount, payCurrency, tierAmount) => {
    try {
      const tx = await contract
        .connect(provider.getSigner())
        .addVest(proof, amount, payCurrency, tierAmount);

      return tx;
    } catch (err) {
      if (err.message) throw err;
      const firstErrorIndex = err.message.indexOf("{");
      const lastErrorIndex = err.message.lastIndexOf("}}}");
      const originalErr = err.message.substring(
        firstErrorIndex,
        lastErrorIndex + 3
      );
      const parsedError = JSON.parse(originalErr);
      throw parsedError;
    }
  };

  const vestedAmount = async (address) => {
    return await contract.vestedAmount(address);
  };

  return {
    loading,
    loaded,
    participants,
    totalVested,
    merkleRoot,
    isStableCoin,
    addVest,
    vestedAmount,
  };
}
