import { ethers } from 'ethers';
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from '@usedapp/core';

import { 
  swprTokenAddress, 
  vestingContractAddress, 
  busdTokenAddress, 
  whitelistOfTiers,
  usdtTokenAddress 
} from '../contract_info/vestingData';

const vestingContractAbi = require('../contract_info/vesting_contract_abi.json');
const swprContractAbi = require('../contract_info/swpr_contract_abi.json');
// const busdContractAbi = require('../contract_ABI/swpr_contract_abi.json');
// const usdtContractAbi = require('../contract_ABI/swpr_contract_abi.json');
const busdContractAbi = require('../contract_info/busd_contract_abi.json');
const usdtContractAbi = require('../contract_info/usdt_contract_abi.json');

const vestingContractInterface = new ethers.utils.Interface(vestingContractAbi);
const swprContractInterface = new ethers.utils.Interface(swprContractAbi);
const busdContractInterface = new ethers.utils.Interface(busdContractAbi);
const usdtContractInterface = new ethers.utils.Interface(usdtContractAbi);

const vestingContract = new Contract(vestingContractAddress, vestingContractInterface);
const swprContract = new Contract(swprTokenAddress, swprContractInterface);
const busdContract = new Contract(busdTokenAddress, busdContractInterface);
const usdtContract = new Contract(usdtTokenAddress, usdtContractInterface);

/** functions for the vesting contract */
//get status of contract hook
export function useLockedAmount() {
    const [amount] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'locked',
      args: [swprTokenAddress],
    }) ?? [];
    return amount;
}

export function useSoldAmount() {
    const [amount] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'getTotalSoldAmount',
      args: [],
    }) ?? [];
    return amount;
}

export function useGetTierOfAccount(account) {
    // const [maxAmount] = useContractCall({
    //   abi: vestingContractInterface,
    //   address: vestingContractAddress,
    //   method: 'getTierOfAccount',
    //   args: [account],
    // }) ?? [];
    const maxAmount = whitelistOfTiers[account];
    return maxAmount;
}

export function useIsAdmin(account) {
    const [isAdmin] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'admins',
      args: [account],
    }) ?? [];
    return isAdmin;
}

export function useGetSchedulePlain(index) {
    const [percentage, unlockTime, isSent] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'schedulePlain',
      args: [index],
    }) ?? [];
    return [percentage, unlockTime, isSent];
}

export function useGetUserSchedulePlain(account, index) {
  const [amount, claimedAmount, unlockTime, isFixed] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'schedules',
    args: [account, index],
  }) ?? [];
  return [amount, claimedAmount, unlockTime, isFixed];
}

export function useGetParticipants() {
  const [participants] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'getParticipants',
    args: [],
  }) ?? [];
  return [participants];
}

export function useGetTreasuryWallet() {
  const [treasuryAddress] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'getTreasuryWallet',
    args: [],
  }) ?? [];
  return [treasuryAddress];
}
// send transaction hook
export function useVestingContractMethod(methodName) {
    const { state, send, events } = useContractFunction(vestingContract, methodName, {});
    return { state, send, events };
}

export function useSwprContractMethod(methodName) {
    const { state, send, events } = useContractFunction(swprContract, methodName, {});
    return { state, send, events };
}

export function useUsdtContractMethod(methodName) {
  const { state, send, events } = useContractFunction(usdtContract, methodName, {});
  return { state, send, events };
}

export function useBusdContractMethod(methodName) {
  const { state, send, events } = useContractFunction(busdContract, methodName, {});
  return { state, send, events };
}
/** the end for the vesting */

/** functions for the swpr token contract */
export function useBalanceOfVesting() {
    const [amount] = useContractCall({
      abi: swprContractInterface,
      address: swprTokenAddress,
      method: 'balanceOf',
      args: [vestingContractAddress],
    }) ?? [];
    return amount;
}
/** the end for the swpr */