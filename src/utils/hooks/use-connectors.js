import { useCallback, useState, useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import Web3 from "web3";

// import { ChainContext } from 'contexts/ChainContext';
import { RPC_URLS, connectionErrorHandler } from "../helpers/connectors";
import CONNECTOR_NAMES from "../constants/connectorNames";
// import ClosedSeaNFTABI from "../abis/closedSeaNFT";
// import ClosedSeaTokenABI from "../abis/closedSeaToken";
// import NftControllerABI from "../abis/nftController";
// import EthPriceChainlinkABI from "../abis/ethPriceChainlink";
import RoyaltyContractABI from "./RoyaltyContractABI"; 
import { artifacts } from "../../config";
import { useHistory } from "react-router";
// import test details (BSC Testnet)
// import { NFTAbi, NFTAddress, TokenAddress, TokenAbi } from "./data.js";

const useEagerConnect = (chainId = parseInt(process.env.REACT_APP_DEFAULT_CHAINID),connectorName = CONNECTOR_NAMES.injected) => {
  // process.env.REACT_APP_DEFAULT_CHAINID
  // parseInt(97)
  const history = useHistory();
  const { activate, deactivate, account } = useWeb3React();

  const connectors = useConnectors(chainId);

  // useEffect(() => {
  //   if (account) {
  //     history.push(`/profile/${account}`);
  //   }
  // }, [account]);
  console.log("connectorsconnectors 22", connectors);
  const login = useCallback(async () => {
    await activate(connectors[connectorName], (error) => {
      if (error) {
        connectionErrorHandler(
          error,
          activate,
          connectors[connectorName],
          chainId
        );
      }
    });
    console.log("connectorsconnectors 333", connectors);
    localStorage.setItem("chainId", chainId);
    localStorage.setItem("connectorName", connectorName);
  }, [activate, connectors, chainId, connectorName]);

  const logout = () => {
    deactivate();
    if (window.localStorage.getItem("walletconnect")) {
      connectors[CONNECTOR_NAMES.walletConnect].close();
      connectors[CONNECTOR_NAMES.walletConnect].walletConnectProvider = null;
    }
    localStorage.removeItem("chainId");
    localStorage.removeItem("connectorName");
  };

  return {
    login,
    logout,
  };
};

export const useConnectors = (chainId) => {
  const POLLING_INTERVAL = 12000;

  const injected = new InjectedConnector({ supportedChainIds: [chainId] });
  console.log("injected: ", injected);

  const walletConnect = new WalletConnectConnector({
    rpc: {
      1: { 1: RPC_URLS[1], 56: RPC_URLS[56], 137: RPC_URLS[137] },
    },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  });

  const connectors = {
    [CONNECTOR_NAMES.injected]: injected,
    [CONNECTOR_NAMES.walletConnect]: walletConnect,
  };

  return connectors;
};

const useContracts = () => {
  console.log("use Contracts Call shan sahikh");
  const [contracts, setContracts] = useState({});
  const [web3, setWeb3] = useState();

  const { chainId } = useWeb3React();
  console.log("chainId in useContracts", chainId);

  const connectContracts = useCallback(async () => {
    const { ethereum } = window;
    // console.log("etherum=====> ", ethereum); // comment by muhammad salman for fix on load wallet connection bug

    try {
      await ethereum?.enable();
    } catch (error) {
      console.log("[useContracts] error => ", error);
    }
    const web3Provider = new Web3(ethereum);
    console.log("web3Provider: ", web3Provider);
    // web3Provider.setProvider(RPC_URLS[chainId || process.env.REACT_APP_DEFAULT_CHAINID]);
    if (!ethereum?.chainId || !chainId) {
      web3Provider.setProvider(
        RPC_URLS[chainId || process.env.REACT_APP_DEFAULT_CHAINID]
      );
    }

    ///@notice Mainnet(BSC) IMPLEMENTATION start
    // const closedSeaNft = new web3Provider.eth.Contract(
    //   ClosedSeaNFTABI,
    //   artifacts.closedSeaNft[
    //     chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
    //   ]
    // );

    const RoyaltyContract = new web3Provider.eth.Contract(
      RoyaltyContractABI,
      artifacts.RoyaltyContract[
        chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
      ]
      );

    setWeb3(web3Provider);
    setContracts({
      RoyaltyContract
    });
  }, [chainId]);

  useEffect(() => {
    connectContracts();
  }, [connectContracts]);

  useEffect(() => {
    if (!chainId) {
      connectContracts();
    } else {
      setContracts({});
      setWeb3(null);
    }
  }, [chainId, connectContracts]);

  return { contracts, web3 };
};

export { useEagerConnect, useContracts };
