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
import { CASPER_CHAIN } from "../../config/casper";

export default function Casper() {
  const contractHash = useParams().contractHash;
  const [info, setInfo] = useState(undefined);
  const [merkleRoot, setMerkleRoot] = useState("");

  const [tier, setTier] = useState(0);
  const [vestAmount, setVestAmount] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [balance, setBalance] = useState(-1);
  const [status, setStatus] = useState("");
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scheduleClaimed, setScheduleClaimed] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [proof, setProof] = useState("");
  const [verified, setVerified] = useState(false);
  const [whitelist, setWhitelist] = useState([]);
  const [tiers, setTiers] = useState([]);
  const { casperAddress, setUserDataLoading } = useNetworkStatus();

  const verify = (account, root) => {
    if (!whitelist) {
      setTier(0);
      return false;
    }
    const accountTier = whitelist.find(
      (investor) => investor.accountHash === account
    );
    if (!accountTier || casperAddress === "") {
      setTier(0);
      return false;
    }
    setTier(tiers[accountTier.tier] / 10 ** 9);
    const elements = whitelist.map(
      (investor) => `${investor.accountHash}_${tiers[investor.tier]}`
    );
    const leaves = elements.map(keccak256);
    const tree = new MerkleTree(leaves, keccak256, { sort: true });

    const rootTocheck = root ? root : tree.getRoot();

    const leaf = keccak256(
      `${accountTier.accountHash}_${tiers[accountTier.tier]}`
    );
    const proof = tree.getProof(leaf);

    setProof(proof);

    return tree.verify(proof, leaf, rootTocheck);
  };

  async function fetchData() {
    setLoading(true);
    setLoaded(false);

    try {
      const res = await fetch(
        `${window.location.origin}/projects/casper/${CASPER_CHAIN}/${contractHash}.json`
      );
      const data = await res.json();

      const info = data.info;
      setInfo(info);
      setWhitelist(data.investors);
      setTiers(data.tier);

      const casperpadClient = await initClient(contractHash);

      const response = await Promise.all([
        casperpadClient.queryContract("merkle_root"),
        casperpadClient.queryContract("auction_token_capacity"),
        casperpadClient.queryContract("sold_amount"),
        casperpadClient.queryContract("total_participants"),
        casperpadClient.queryContract("auction_token").catch((err) => {
          return "";
        }),
      ]);

      setMerkleRoot(response[0]);

      const tokenAddress =
        response[4] === ""
          ? response[4]
          : utils.toAccountHashString(response[4]);
      setTokenAddress(tokenAddress);

      const totalPresaleAmount = response[1] / 10 ** info.token.decimals;
      setTotalPresaleAmount(totalPresaleAmount);

      const soldAmount = response[2] / 10 ** 9 / info.token.price;
      setSoldAmount(soldAmount);
      setParticipants(response[3].toNumber());
      setProgressValue((soldAmount * 100) / totalPresaleAmount);

      if (Date.now() < info.startTime) setStatus("Coming");
      else if (Date.now() < info.endTime) setStatus("Opened");
      else setStatus("Closed");

      fetchCustomData();

      setLoaded(true);
    } catch (err) {
      console.error(err);
    }
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

      const publicKey = CLPublicKey.fromHex(casperAddress);

      const promises = info.schedules.map(async (schedule, index) => {
        return await casperpadClient
          .claim_of(getAccountHashString(casperAddress), schedule.time)
          .catch((err) => {
            return 0;
          });
      });

      const [balance, vestAmount, claimed] = await Promise.all([
        erc20Client.balanceOf(publicKey).catch((err) => {
          return -1;
        }),
        casperpadClient
          .order_of(getAccountHashString(casperAddress))
          .catch((err) => {
            return 0;
          }),
        promises,
      ]);

      setScheduleClaimed(claimed);
      setVestAmount(vestAmount.val.data / 10 ** 9);
      setBalance(balance === -1 ? -1 : balance / 10 ** info.token.decimals);
    } catch (err) {}

    setUserDataLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [casperAddress]);

  useEffect(() => {
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
        totalPresaleAmount={totalPresaleAmount}
        soldAmount={soldAmount}
        participants={participants}
        scheduleClaimed={scheduleClaimed}
        verified={verified}
        fetchData={fetchData}
        contractAddress={contractHash}
      />
    </>
  );
}
