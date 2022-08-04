/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

const tokens = [
  {
    value: "0",
    label: "ETH",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
  },
  {
    value: "1",
    label: "WBTC",
    image: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg?v=022",
  },
  {
    value: "2",
    label: "USDC",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022",
  },
  {
    value: "3",
    label: "LINK",
    image: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=023",
  },
];

module.exports = { nextConfig, tokens };
