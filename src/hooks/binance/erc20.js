import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider, getDefaultProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { abi as erc20Abi } from "../../contracts/abi/ERC20.json";
import { useEffect, useMemo, useState } from "react";

const erc20Interface = new ethers.utils.Interface(erc20Abi);

export default function useERC20(address) {
  const { library } = useWeb3React();
  const provider = useMemo(() => {
    if (library) return new Web3Provider(library.provider);
    else return getDefaultProvider(3);
  }, [library]);
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [decimals, setDecimals] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [loading, setLoading] = useState(true);
  const contract = new Contract(address, erc20Interface, provider);

  useEffect(() => {
    async function fetchData() {
      const name = await contract.name();
      setName(name);
      const symbol = await contract.symbol();
      setSymbol(symbol);
      const decimals = await contract.decimals();
      setDecimals(decimals);
      const totalSupply = await contract.totalSupply();
      setTotalSupply(totalSupply);
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const balanceOf = async (address) => {
    return await contract.balanceOf(address);
  };

  const approve = async (spender, amount) => {
    if (library === undefined) throw Error("Wallet Not connected");
    const provider = new Web3Provider(library.provider);
    return await contract
      .connect(provider.getSigner())
      .approve(spender, amount);
  };

  const allowance = async (owner, spender) => {
    return await contract.allowance(owner, spender);
  };

  return {
    loading,
    name,
    symbol,
    decimals,
    totalSupply,
    balanceOf,
    approve,
    allowance,
  };
}
