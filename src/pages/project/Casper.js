import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CLPublicKey } from "casper-js-sdk";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { utils } from "casper-js-client-helper";

import Loading from "../../components/Project/Loading";
import TokenDetailCASPER from "../../components/Project/TokenDetailCASPER";
import ProjectDetailCASPER from "../../components/Project/ProjectDetailCASPER";

import { initClient, initErc20Client, getAccountHashString } from "../../xWeb3";
import useNetworkStatus from "../../store/useNetworkStatus";

export default function Casper() {
  const contractHash = useParams().address;
  const [info, setInfo] = useState(undefined);
  const [merkleRoot, setMerkleRoot] = useState("");
  const [openTime, setOpenTime] = useState(0);
  const [tier, setTier] = useState(0);
  const [vestAmount, setVestAmount] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [balance, setBalance] = useState(-1);
  const [status, setStatus] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scheduleClaimed, setScheduleClaimed] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [proof, setProof] = useState("");
  const [verified, setVerified] = useState(false);
  const [whitelist, setWhitelist] = useState([]);

  const { casperAddress, setUserDataLoading } = useNetworkStatus();

  const verify = (account, root) => {
    if (!whitelist) {
      setTier(0);
      return false;
    }
    const accountTier = whitelist.find((tier) => tier.account === account);
    if (!accountTier || casperAddress === "") {
      setTier(0);
      return false;
    }
    setTier(accountTier.amount / 10 ** 9);
    const elements = whitelist.map((tier) => `${tier.account}_${tier.amount}`);
    const leaves = elements.map(keccak256);
    const tree = new MerkleTree(leaves, keccak256);

    const rootTocheck = root ? root : tree.getRoot();

    const leaf = keccak256(`${accountTier.account}_${accountTier.amount}`);
    const proof = tree.getProof(leaf);

    setProof(proof);

    return tree.verify(proof, leaf, rootTocheck);
  };

  async function fetchData() {
    setLoading(true);
    setLoaded(false);
    try {
      const casperpadClient = await initClient(contractHash);

      const response = await Promise.all([
        casperpadClient.queryContract("info"),
        casperpadClient.queryContract("merkle_root"),
        casperpadClient.queryContract("launch_time"),
        casperpadClient.queryContract("auction_start_time"),
        casperpadClient.queryContract("auction_end_time"),
        casperpadClient.queryContract("schedules"),
        casperpadClient.queryContract("auction_token_capacity"),
        casperpadClient.queryContract("sold_amount"),
        casperpadClient.queryContract("total_participants"),
        casperpadClient.queryContract("auction_token").catch((err) => {
          return "";
        }),
      ]);

      const info = JSON.parse(response[0]);
      setInfo(info);
      setMerkleRoot(response[1]);
      setOpenTime(response[2].toNumber());
      setSchedules(response[5]);
      setStartTime(response[3].toNumber());
      setEndTime(response[4].toNumber());

      const tokenAddress =
        response[9] === ""
          ? response[9]
          : utils.toAccountHashString(response[9]);
      setTokenAddress(tokenAddress);

      const totalPresaleAmount = response[6] / 10 ** info.token.decimals;
      setTotalPresaleAmount(totalPresaleAmount);

      const soldAmount = response[7] / 10 ** 9 / info.token.price;
      setSoldAmount(soldAmount);
      setParticipants(response[8].toNumber());
      setProgressValue((soldAmount * 100) / totalPresaleAmount);

      const startTime = response[3].toNumber();
      const endTime = response[4].toNumber();

      if (Date.now() < startTime) setStatus("Coming");
      else if (Date.now() < endTime) setStatus("Opened");
      else setStatus("Closed");

      fetchCustomData();

      setLoaded(true);
    } catch (err) {}
    setLoading(false);
  }

  const fetchCustomData = useCallback(async () => {
    setIsAdmin(false);
    setTier(0);
    setBalance(-1);
    setVestAmount(0);

    if (casperAddress === "") return;
    const verified = verify(getAccountHashString(casperAddress), merkleRoot);
    setVerified(verified);

    setUserDataLoading(true);

    try {
      const [casperpadClient, erc20Client] = await Promise.all([
        initClient(contractHash),
        initErc20Client(tokenAddress).catch((err) => {
          return null;
        }),
      ]);

      let balance = -1;

      if (erc20Client) {
        const publicKey = CLPublicKey.fromHex(casperAddress);

        try {
          balance = await erc20Client.balanceOf(publicKey);
        } catch (err) {
          balance = -1;
        }
      }

      const promises = schedules.map(async (schedule, index) => {
        return await casperpadClient
          .claim_of(
            getAccountHashString(casperAddress),
            schedule[0].data.toNumber()
          )
          .catch((err) => {
            return 0;
          });
      });

      const claimed = await Promise.all(promises);
      setScheduleClaimed(claimed);

      const vestAmount = await casperpadClient
        .order_of(getAccountHashString(casperAddress))
        .catch((err) => {
          return 0;
        });
      setVestAmount(vestAmount.val.data / 10 ** 9);
      setBalance(balance / 10 ** info.token.decimals);
    } catch (err) {}

    setUserDataLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [casperAddress]);

  useEffect(() => {
    async function fetchTierData() {
      try {
        const res = await fetch(
          `${window.location.origin}/tiers/${contractHash}.json`
        );
        const data = await res.json();
        setWhitelist(data.tiers);
      } catch (err) {}
    }

    fetchTierData();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchCustomData(casperAddress);
  }, [casperAddress, fetchCustomData]);

  if (loading || !loaded)
    return <Loading loading={loading} loaded={loaded} fetchData={fetchData} />;

  return (
    <>
      <TokenDetailCASPER
        info={info}
        balance={balance}
        tier={tier}
        vestAmount={vestAmount}
        totalPresaleAmount={totalPresaleAmount}
        soldAmount={soldAmount}
        status={status}
        participants={participants}
        startTime={startTime}
        endTime={endTime}
        progressValue={progressValue}
        verified={verified}
        proof={proof}
        contractAddress={contractHash}
        fetchData={fetchData}
      />
      <ProjectDetailCASPER
        info={info}
        vestAmount={vestAmount}
        isAdmin={isAdmin}
        openTime={openTime}
        totalPresaleAmount={totalPresaleAmount}
        soldAmount={soldAmount}
        participants={participants}
        schedules={schedules}
        scheduleClaimed={scheduleClaimed}
        verified={verified}
        fetchData={fetchData}
        contractAddress={contractHash}
      />
    </>
  );
}
