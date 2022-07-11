import { useNotification } from "web3uikit";
import { abi, contractAddresses } from "../constants/index.js";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { useNotification } from "web3uikit";

export default function Swap() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const pairAddress = contractAddresses["4"] || " ";

  const [liquidityTokenA, setLiquidityTokenA] = useState("0");
  const [liquidityTokenB, setLiquidityTokenB] = useState("0");
  const [tradingFee, setTradingFee] = useState("0");

  const dispatch = useNotification();

  const tokenToBeSwapped = document.getElementById("tokenToBeSwapped").value;
  const amountOfToken = document.getElementById("amountOfToken").value;
  const { runContractFunction: swap } = useWeb3Contract({
    abi: abi,
    contractAddress: pairAddress,
    functionName: "swap",
    params: { tokenToBeSwapped, amountOfToken },
  });
  const { runContractFunction: getLiquidityTokenA } = useWeb3Contract({
    abi: abi,
    contractAddress: pairAddress,
    functionName: "getLiquidityTokenA",
    params: {},
  });

  const { runContractFunction: getLiquidityTokenB } = useWeb3Contract({
    abi: abi,
    contractAddress: pairAddress,
    functionName: "getLiquidityTokenB",
    params: {},
  });

  const { runContractFunction: getTradingFee } = useWeb3Contract({
    abi: abi,
    contractAddress: pairAddress,
    functionName: "getTradingFee",
    params: {},
  });

  async function updateUI() {
    const tradingFeeFromCall = (await getTradingFee()).toString();
    const liquidityTokenAFromCall = (await getLiquidityTokenA()).toString();
    const liquidityTokenBFromCall = (await getLiquidityTokenB()).toString();

    setTradingFee(tradingFeeFromCall);
    setLiquidityTokenA(liquidityTokenAFromCall);
    setLiquidityTokenB(liquidityTokenBFromCall);
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  };

  const handleNewNotification = function () {
    dispatch({
      type: "info",
      message: "Tx complete",
      title: "Tx notification",
      position: "topR",
      icon: "bell",
    });
  };
}
