import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";

const abi = require("../contract_info/vesting_contract_abi.json");

const contractInterface = new ethers.utils.Interface(abi);

function useGetParticipants(address) {
  const [participants] =
    useContractCall({
      abi: contractInterface,
      address,
      method: "participants",
      args: [],
    }) ?? [];
  return [participants];
}

export default function useBuyOnlyContract(address) {
  const contract = new Contract(address, contractInterface);
  const [participants] = useGetParticipants(address);
  const useBuyOnlyContractFunction = useContractFunction(
    contract,
    "addVest",
    {}
  );
  return { participants, useBuyOnlyContractFunction };
}
