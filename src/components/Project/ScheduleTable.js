import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Spinner from "react-bootstrap/Spinner";

import { initClient } from "../../xWeb3";
import useNetworkStatus from "../../store/useNetworkStatus";
import { CasperClient } from "casper-js-sdk";
import { NODE_ADDRESS } from "../../xWeb3/constants";

const ScheduleTable = (props) => {
  const {
    schedule,
    contractAddress,
    index,
    tokenSymbol,
    tokenPrice,
    vestAmount,
    verified,
    fetchData,
    scheduleClaimed,
  } = props;

  const { casperAddress, userDataLoading } = useNetworkStatus();

  const [scheduleAmount, setScheduleAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [time, setTime] = useState(0);
  const [pending, setPending] = useState(false);

  const currentTime = Date.now();

  useEffect(() => {
    setTime(schedule.time);
    setPercentage(schedule.percent);
    setScheduleAmount(((vestAmount / tokenPrice) * percentage) / 100);
  }, [percentage, schedule, tokenPrice, vestAmount]);

  const handleClaim = async () => {
    setPending(true);
    try {
      const casperpadClient = await initClient(contractAddress);
      const deployHash = await casperpadClient.claim(casperAddress, time);
      const interval = setInterval(async () => {
        const client = new CasperClient(NODE_ADDRESS);
        const [, deployResult] = await client.getDeploy(deployHash);
        if (deployResult.execution_results.length !== 0) {
          clearInterval(interval);
          setPending(false);
          if (deployResult.execution_results[0].result.Success) {
            fetchData();
          }
        }
      }, 5000);
    } catch (err) {
      setPending(false);
    }
  };

  return (
    <tr>
      <SkeletonTheme baseColor="#ffffff10" highlightColor="#ffffff20">
        <td>{index + 1}</td>
        <td>
          {userDataLoading ? <Skeleton /> : scheduleAmount + " " + tokenSymbol}
        </td>
        <td>{percentage + "%"}</td>
        <td>{new Date(time).toLocaleString("en-US")}</td>
        <td>
          {userDataLoading ? (
            <Skeleton />
          ) : (
            (currentTime >= time && scheduleClaimed ? scheduleAmount : 0) +
            " " +
            tokenSymbol
          )}
          {}
        </td>
        <td>
          {userDataLoading ? (
            <Skeleton />
          ) : (
            (pending && <Spinner animation="border" />) ||
            (currentTime >= time &&
              scheduleClaimed === 0 &&
              verified &&
              vestAmount && (
                <>
                  <button
                    className="btn btn-wallet wallet-connected"
                    onClick={() => handleClaim()}
                  >
                    {" "}
                    Claim{" "}
                  </button>
                </>
              )) ||
            (currentTime >= time && "unlocked") ||
            "waiting..."
          )}
        </td>
      </SkeletonTheme>
    </tr>
  );
};

export default ScheduleTable;
