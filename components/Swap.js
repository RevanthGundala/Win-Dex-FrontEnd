import { abi, contractAddresses } from "../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Select from "react-select";
import { tokens } from "../next.config";
import { FaArrowCircleDown } from "react-icons/fa";
import { React, useEffect, useState } from "react";
import Link from "next/link";
// useEffect(() => {
//   if (input) {
//   } else {
//         buttonMessage = <div>Enter an amount</div>;
//
//   }
// });

// document.getElementById(/* selectedToken /*) == false ? return("Select a token")
// document.getElementById(/* Number of Tokens /* ) == false ? return("Enter an amount")
// document.getElementById(/* Number of tokens /*) <= Number of tokens in metamask ? return("Not enough tokens available")
// else  return Swap (clickable button)

export default function Swap() {
  const [amountOfTokenToBeSwapped, setAmountOfTokenToBeSwapped] = useState(0);
  const [amountOfTokenToBeReceived, setAmountOfTokenToBeReceived] = useState(0);
  const [tokenToBeSwapped, setTokenToBeSwapped] = useState(null);
  const [tokenToBeReceived, setTokenToBeReceived] = useState(null);
  const [isDisabled, setDisabled] = useState(true);
  const [buttonMessage, setButtonMessage] = useState(<div>Select a Token</div>);

  const getAmountOfToken = (event) => {
    setAmountOfTokenToBeSwapped(event.target.value);
    getTokenToBeReceived();
  };

  async function getTokenToBeReceived() {
    const amountOtherToken = (await getAmountOtherToken()).toString();
    setAmountOfTokenToBeReceived(amountOtherToken);
  }

  const formatOptionLabelSwap = (token) => {
    return (
      <div
        className="token-option"
        onClick={() => {
          setTokenToBeSwapped(token.label);
        }}
      >
        <img className="h-32" src={token.image} alt="token-image" />
        <span>{token.label}</span>
      </div>
    );
  };

  const formatOptionLabelReceived = (token) => {
    return (
      <div
        className="token-option"
        onClick={() => {
          setTokenToBeReceived(token.label);
        }}
      >
        <img className="h-32" src={token.image} alt="token-image" />
        <span>{token.label}</span>
      </div>
    );
  };

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const pairAddress = contractAddresses[chainId];

  console.log(`Contract Address: ${abi}`);

  const [liquidityTokenA, setLiquidityTokenA] = useState("0");
  const [liquidityTokenB, setLiquidityTokenB] = useState("0");
  const [tradingFee, setTradingFee] = useState("0");

  const { runContractFunction: swap } = useWeb3Contract({
    abi: abi,
    contractAddress: pairAddress,
    functionName: "swap",
    params: { tokenToBeSwapped, amountOfTokenToBeSwapped },
  });
  const { runContractFunction: getTradingFee } = useWeb3Contract({
    abi: abi,
    contractAddress: pairAddress,
    functionName: "getTradingFee",
    params: {},
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

  const { runContractFunction: getAmountOtherToken } = useWeb3Contract({
    abi: abi,
    contractAddress: pairAddress,
    functionName: "getAmountOtherToken",
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

  function updateMessage() {
    console.log(`Token to be Swapped: ${tokenToBeSwapped}`);
    console.log(`Token to be Received: ${tokenToBeReceived}`);
    console.log(`Amount of Token To Be Swapped: ${amountOfTokenToBeSwapped}`);
    console.log(`Amount of Token To Be Received: ${amountOfTokenToBeReceived}`);

    if (tokenToBeSwapped == null || tokenToBeReceived == null) {
      setDisabled(true);
      setButtonMessage(<div>Select a Token</div>);
    } else if (liquidityTokenA == 0 || liquidityTokenB == 0) {
      setDisabled(false);
      setButtonMessage(<div>Add Liquidity</div>);
    } else if (amountOfTokenToBeSwapped == 0) {
      setDisabled(true);
      setButtonMessage(<div>Enter an Amount</div>);
    }
    // else if(isDisabled && (amountOfTokenToBeSwapped < ))
    else if (
      amountOfTokenToBeSwapped < liquidityTokenA ||
      amountOfTokenToBeReceived < liquidityTokenB
    ) {
      setDisabled(true);
      setButtonMessage(<div>Not Enough Liquidity</div>);
    } else {
      setDisabled(false);
      setButtonMessage(<div>Swap</div>);
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    updateMessage();
  }, [tokenToBeReceived, tokenToBeSwapped, amountOfTokenToBeSwapped]);

  return (
    <div>
      <div className="bg-gray-700 h-screen flex justify-center py-32">
        <div className="bg-gray-400 text-gray-50 text-center text-2xl h-80 w-1/2 rounded-full">
          <div className="flex flex-col items-center">
            Swap
            <input
              className="shadow appearance-none border rounded-full mt-2 mb-2 h-16 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="0.0"
              onChange={getAmountOfToken}
              disabled={
                buttonMessage === <div>Add Liquidity</div> ? true : false
              }
            />
            <FaArrowCircleDown />
            <button
              className="shadow appearance-none border rounded-full w-60 bg-white mt-2 mb-2 h-16 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="0.0"
              disabled={true}
            >
              {amountOfTokenToBeReceived}
            </button>
            <div>
              <button
                type="button"
                disabled={isDisabled}
                className=" border w-32 rounded-full mt-2 h-16 bg-white text-red-700 leading-tight focus:outline-none focus:shadow-outline"
                onClick={() => {
                  if (buttonMessage == <div>Swap</div>) {
                    swap();
                  } else {
                    console.log("hi");
                  }
                }}
              >
                {buttonMessage}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end pb-120">
            <Select
              value={tokens.value}
              options={tokens}
              formatOptionLabel={formatOptionLabelSwap}
            />
            <Select
              value={tokens.value}
              options={tokens}
              formatOptionLabel={formatOptionLabelReceived}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
