import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CLPublicKey } from "casper-js-sdk";
import { utils } from "casper-js-client-helper";

import Loading from "../../components/Project/Loading";
import TokenDetailCasperPublic from "../../components/Project/TokenDetailCasperPublic";
import ProjectDetailCasperPublic from "../../components/Project/ProjectDetailCasperPublic";

import {
  initPublicClient,
  initErc20Client,
  getAccountHashString,
} from "../../xWeb3";
import useNetworkStatus from "../../store/useNetworkStatus";
import { CASPER_CHAIN } from "../../config/casper";

export default function Casper() {
  const contractHash = useParams().contractHash;
  const [info, setInfo] = useState(undefined);

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
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const { casperAddress, setUserDataLoading } = useNetworkStatus();

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

      const casperpadClient = await initPublicClient(contractHash);

      const response = await Promise.all([
        casperpadClient.queryContract("sold_amount"),
        casperpadClient.queryContract("total_participants"),
        casperpadClient.queryContract("auction_token").catch((err) => {
          return "";
        }),
        casperpadClient.queryContract("min_order_amount"),
        casperpadClient.queryContract("max_order_amount"),
      ]);

      const tokenAddress =
        response[2] === ""
          ? response[2]
          : utils.toAccountHashString(response[2]);
      setTokenAddress(tokenAddress);

      const totalPresaleAmount = Number(info.token.capacity);
      setTotalPresaleAmount(totalPresaleAmount);

      const soldAmount = response[0] / 10 ** 9 / info.token.price;
      setSoldAmount(soldAmount);
      setParticipants(response[1].toNumber());
      setProgressValue((soldAmount * 100) / totalPresaleAmount);

      setMinAmount(response[3] / 10 ** 9);
      setMaxAmount(response[4] / 10 ** 9);

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
    setBalance(-1);
    setVestAmount(0);

    if (casperAddress === "") return;

    setUserDataLoading(true);

    try {
      const [casperpadClient, erc20Client] = await Promise.all([
        initPublicClient(contractHash),
        initErc20Client(tokenAddress).catch((err) => {
          return null;
        }),
      ]);

      const publicKey = CLPublicKey.fromHex(casperAddress);

      const promises = await Promise.all(
        info.schedules.map(async (schedule) => {
          return casperpadClient
            .claim_of(getAccountHashString(casperAddress), schedule.time)
            .catch((err) => {
              return 0;
            });
        })
      );

      const [balance, vestAmount, claimed] = await Promise.all([
        erc20Client
          ? erc20Client.balanceOf(publicKey).catch((err) => {
              return -1;
            })
          : -1,
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
    } catch (err) {
      console.error(err);
    }

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
      <TokenDetailCasperPublic
        info={info}
        balance={balance}
        vestAmount={vestAmount}
        totalPresaleAmount={totalPresaleAmount}
        soldAmount={soldAmount}
        status={status}
        participants={participants}
        progressValue={progressValue}
        contractAddress={contractHash}
        minAmount={minAmount}
        maxAmount={maxAmount}
        fetchData={fetchData}
      />
      <ProjectDetailCasperPublic
        info={info}
        vestAmount={vestAmount}
        isAdmin={isAdmin}
        totalPresaleAmount={totalPresaleAmount}
        soldAmount={soldAmount}
        participants={participants}
        scheduleClaimed={scheduleClaimed}
        fetchData={fetchData}
        contractAddress={contractHash}
      />
    </>
  );
}
