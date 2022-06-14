import React, { useEffect, useState } from "react";
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

  const { casperAddress } = useNetworkStatus();

  const [scheduleAmount, setScheduleAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [time, setTime] = useState(0);
  const [pending, setPending] = useState(false);

  const currentTime = Date.now();

  useEffect(() => {
    setTime(schedule[0].data.toNumber());
    setPercentage(schedule[1].data.toNumber() / 100);
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
      <td>{index + 1}</td>
      <td>{scheduleAmount + " " + tokenSymbol}</td>
      <td>{percentage + "%"}</td>
      <td>{new Date(time).toLocaleString("en-US")}</td>
      <td>
        {currentTime >= time && scheduleClaimed ? scheduleAmount : 0}
        {" " + tokenSymbol}
      </td>
      <td>
        {(pending && <Spinner animation="border" />) ||
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
          "waiting..."}
      </td>
    </tr>
  );
};

export default ScheduleTable;