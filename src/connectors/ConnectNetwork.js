import { useWeb3React } from "@web3-react/core";

const ConnectNetwork = () => {
  const { chainId } = useWeb3React();

  const networkParams = {
    songbird: {
      chainId: `0x${chainId.toString(16)}`,
      chainName: "Songbird Canary Testnet",
      nativeCurrency: {
        name: "Songbird",
        symbol: "SGB",
        decimals: 18,
      },
      rpcUrls: ["https://songbird.towolabs.com/rpc"],
      blockExplorerUrls: ["https://songbird-explorer.flare.network/"],
    },
  };

  return networkParams;
};

export default ConnectNetwork;
