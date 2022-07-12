import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import ConnectNetwork from "./connectors/ConnectNetwork";
import { connectors } from "./connectors/connector";
import { truncateAddress } from "./utils";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from "react-bootstrap";

function App() {
  const { chainId, account, activate, deactivate } = useWeb3React();

  const setUpNetwork = async () => {
    const provider = window.ethereum;

    if (provider) {
      const chainId = parseInt(String(19), 10);
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
            },
          ],
        });
        return true;
      } catch (error) {
        try {
          let currentParamsItem;
          currentParamsItem = ConnectNetwork;

          await provider.request({
            method: "wallet_addEthereumChain",
            params: [currentParamsItem],
          });
          return true;
        } catch (error2) {
          console.error("Failed to setup the network in Metamask:", error2);
          return false;
        }
      }
    } else {
      console.error(
        "Can't setup the network on metamask because window.ethereum is undefined"
      );
      return false;
    }
  };

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);

    setUpNetwork();
  }, [chainId, account, activate]);

  return (
    <div className="App">
      <div>
        <div>
          <p>
            {`Connection Status: `} {account ? "Connected" : "Disconnected"}
          </p>

          {account && (
            <>
              <p>Network Name: Songbird Canary Testnet</p>
              <p>{`Account: ${truncateAddress(account)}`}</p>
              <p>{`Network ID: ${chainId}`}</p>
            </>
          )}
        </div>
      </div>
      {!account ? (
        <Button
          onClick={() => {
            activate(connectors.injected);
            setProvider("injected");
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button onClick={disconnect} className="mt-4">
          Disconnect
        </Button>
      )}
    </div>
  );
}

export default App;
