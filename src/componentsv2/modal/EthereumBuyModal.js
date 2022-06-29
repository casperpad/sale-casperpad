import React, { useState, useCallback, useEffect, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import useERC20 from "@hooks/binance/erc20";
import { useWeb3React } from "@web3-react/core";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EthereumBuyModal = (props) => {
  const {
    isOpen,
    handleClose,
    tokenSymbol,
    tokenPrice,
    minAccountAllocation,
    maxAccountAllocation,
    handleAddVest,
    payToken,
    contractAddress,
  } = props;

  const [payCurrency, setPayCurrency] = useState(payToken[0].address);
  const [payCurrnecyBalance, setPayCurrencyBalance] = useState();
  const [payTokenAmount, setPayTokenAmount] = useState(0);
  const [buyTokenAmount, setBuyTokenAmount] = useState(0);
  const [allowanceAmount, setAllowanceAmount] = useState();
  const [loading, setLoading] = useState(false);

  const { account } = useWeb3React();
  const {
    balanceOf,
    approve,
    decimals,
    allowance,
    loading: tokenDataLoading,
  } = useERC20(payCurrency);
  const handlePayTokenChange = useCallback((value) => {}, []);

  useEffect(() => {
    async function fetchBalance() {
      if (account === undefined || decimals === undefined) return;
      setLoading(true);
      const balance = await balanceOf(account);
      setPayCurrencyBalance(formatUnits(balance, decimals));
      setLoading(false);
    }
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, payCurrency, decimals]);

  useEffect(() => {
    async function fetchAllowance() {
      if (account === undefined || decimals === undefined) return;
      const allowanceAmount = await allowance(account, contractAddress);
      setAllowanceAmount(formatUnits(allowanceAmount, decimals));
    }
    fetchAllowance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, payCurrency, contractAddress, decimals]);

  const shouldApprovePayToken = useMemo(() => {
    if (
      tokenDataLoading ||
      allowanceAmount === undefined ||
      payTokenAmount === "" ||
      payTokenAmount === 0
    )
      return false;
    return BigNumber.from(parseUnits(allowanceAmount, decimals)).lt(
      parseUnits(payTokenAmount, decimals)
    );
  }, [allowanceAmount, payTokenAmount, decimals, tokenDataLoading]);

  const handleAddVestOnClick = useCallback(async () => {
    if (payTokenAmount < minAccountAllocation) return;
    try {
      // if allowanceAmount < tokenAmount require approve
      if (shouldApprovePayToken) {
        const tx = await approve(
          contractAddress,
          parseUnits(payTokenAmount, decimals)
        );
        console.log(tx);
        toast.info(`Transaction submitted ${tx.hash}`);
        await tx.wait();
        toast.info("Approve Success");
        setAllowanceAmount(payTokenAmount);
      }

      const tx = await handleAddVest(
        payCurrency,
        parseUnits(payTokenAmount, decimals)
      );
      toast.info(`Transaction submitted ${tx.hash}`);
      await tx.wait();

      toast.info("Vest added successfully");
    } catch (err) {
      console.error(err);
    }
  }, [
    payTokenAmount,
    minAccountAllocation,
    shouldApprovePayToken,
    handleAddVest,
    payCurrency,
    decimals,
    approve,
    contractAddress,
  ]);

  return (
    <>
      <Modal show={isOpen} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Vesting</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <SkeletonTheme baseColor="#ffffff10" highlightColor="#ffffff20">
            <div className="outer bg-black absolute top-0 left-0 h-full w-full z-20 opacity-80"></div>

            <div
              className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center"
              onClick={() => handleClose()}
            >
              <div
                className="inner max-w-screen-sm flex-grow  text-white  bg-gradient-to-br from-yellow-200 to-yellow-700 p-1 opacity-100 rounded-3xl"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div
                  data-bs-dismiss="modal"
                  id="wallet-connect-caspersigner"
                  className="c-list border-b px-3 py-2 d-flex align-items-center"
                >
                  <div className="text-white m-auto">
                    Your MIN buyable amount is:{" "}
                    {minAccountAllocation.toFixed(2)} USD!
                    <br />
                    Your MAX buyable amount is:{" "}
                    {maxAccountAllocation.toFixed(2)} USD!
                    <br />
                  </div>
                </div>
                <div className="border-b px-3 py-2 d-flex align-items-center justify-around gap-2">
                  <select
                    className="w-full h-12 px-3 py-1.5 bg-white rounded transition ease-in-out m-0 focus:outline-none"
                    value={payCurrency}
                    onChange={(e) => setPayCurrency(e.target.value)}
                  >
                    {payToken.map((token) => {
                      return (
                        <option key={token.address} value={token.address}>
                          {token.symbol}
                        </option>
                      );
                    })}
                  </select>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <div className="ml-2">{`You have ${payCurrnecyBalance} USD`}</div>
                  )}
                </div>
                <div
                  data-bs-dismiss="modal"
                  className="c-list border-b px-3 py-2 d-flex align-items-center"
                >
                  <div className="text-white m-auto"> USD</div>
                  <div>
                    <input
                      className="form-control"
                      type="number"
                      step={0.001}
                      min={0}
                      max={parseFloat(maxAccountAllocation)}
                      value={payTokenAmount}
                      onChange={(e) => {
                        if (e.target.value.length > 10) return;
                        const value = parseFloat(e.target.value);
                        const allocation = parseFloat(maxAccountAllocation);
                        if (value > allocation || value < 0) return;
                        setPayTokenAmount(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div
                  data-bs-dismiss="modal"
                  id="wallet-connect-caspersigner"
                  className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer"
                >
                  <button
                    className="btn btn-wallet wallet-connected m-auto"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-wallet wallet-connected m-auto"
                    onClick={handleAddVestOnClick}
                  >
                    {shouldApprovePayToken ? "Approve" : "Vest"}
                  </button>
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EthereumBuyModal;
