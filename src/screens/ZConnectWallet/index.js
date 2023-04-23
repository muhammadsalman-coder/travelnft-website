import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./ConnectWallet.module.sass";
import Icon from "../../components/Icon";
import Checkbox from "../../components/Checkbox";
import CHAINS from "../../utils/constants/chains";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import WalletConnectionModal from "../../components/WalletConnectionModal";
import { useHistory } from "react-router-dom";
import { useEagerConnect } from "../../utils/hooks/use-connectors";
import { Redirect } from "react-router-dom";
// const menu = [
//   {
//     title: "BSC",
//     color: "#45B26B",
//   },
//   {
//     title: "Ethereum ",
//     color: "#EF466F",
//   },
// ];

const Connect = () => {
  const history = useHistory();
  const [age, setAge] = useState(true);
  const [conditions, setConditions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(CHAINS[0]);
  const { account, chainId, active } = useWeb3React();
  const [selectedChainId, setSelectedChainId] = useState();
  const [selectedConnectorName, setSelectedConnectorName] = useState();
  const [networkSelected, setNetworkSelected] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  console.log("account on connection page", account);
  // if (account) {
  //   history.push("/");
  // }
  const connectMetaMask = async () => {
    await login();
    // if (Web3.givenProvider) {
    //   try {
    //     let res = await Web3.givenProvider.enable();
    //     console.log("res: ", res);
    //     // const response = await axios.post("/admin-login", { address: res[0] });
    //     // console.log("response", response);
    //     if (res[0]) {
    //       // sessionStorage.setItem("tkn", response.data);
    //       // console.log("tkn", response.data);
    //       // checking();
    //       return history.push("/");
    //     }
    //     // localStorage.setItem("response", response.status);
    //   } catch (e) {
    //     if (e?.response?.data) {
    //       alert(`Connection Failed! ${e.response.data}`);
    //     } else {
    //       alert("something went wrong");
    //     }
    //   }
    // } else alert("please install metamask first");
  };

  const { login, logout } = useEagerConnect(
    // selectedChainId,
    97,
    selectedConnectorName
  );
  console.log("historysdf", history.location.pathname);

  useEffect(() => {
    if (account) {
      window.sessionStorage.setItem("account", account);
      if (history.location.pathname == "/connect-wallet") {
        // alert("work");
        history.push("/");
      }
    } else {
      window.sessionStorage.clear();
    }
  }, [account]);

  useEffect(() => {
    if (networkSelected) {
      login();
      setNetworkSelected(false);
    }
  }, [networkSelected, login]);

  const onChainSelectHandler = (value) => {
    if (age) {
      if (conditions) {
        setSelectedChainId(value.chainId);
        setOpenModal(true);
      } else {
        alert("Accept Terms & Services");
      }
    } else {
      alert("User Must be Atlest 13 year old");
    }
    // console.log("onChainSelectHandler", value);
  };

  const onWalletConnectHandler = (connectorName, connectUsing) => () => {
    console.log("connectorName", connectorName, "connectUsing", connectUsing);

    setSelectedConnectorName(connectorName);
    setOpenModal(false);
    setNetworkSelected(true);
    if (connectUsing === 1) {
      connectMetaMask();
    }
  };

  const onCloseHandler = () => {
    setSelectedChainId(null);
    setOpenModal(false);
  };

  const chain = useMemo(() => {
    if (chainId) {
      return CHAINS.find((c) => c.chainId === chainId);
    }
    return null;
  }, [chainId]);
  return (
    <>
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.head}>
            <Link className={styles.back} to="/">
              <Icon name="arrow-prev" size="24" />
              <div className={cn("h2", styles.stage)}>
                Wallet Connection Is Currently Unavailable
                <br />
                Connect your wallet
              </div>
            </Link>
          </div>
          <div className={styles.body}>
            <div className={styles.menu}>
              {CHAINS.map((x, index) => (
                <div
                  className={cn(
                    { [styles.active]: x?.chainId === selectedOption?.chainId },
                    styles.link
                  )}
                  key={index}
                  // onClick={() => {
                  //   setSelectedOption(index);
                  // }}
                >
                  <div
                    className={styles.icon}
                    style={{ backgroundColor: x.color }}
                  >
                    <Icon name="wallet" size="24" />
                    <Icon name="check" size="18" fill={x.color} />
                  </div>
                  <span>{x.title}</span>
                  <div className={styles.arrow}>
                    <Icon name="arrow-next" size="14" />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.wrapper}>
              <div className={styles.bg}>
                <img
                  srcSet="/images/content/connect-bg@2x.jpg 2x"
                  src="/images/content/connect-bg.jpg"
                  alt="Connect wallet"
                />
              </div>
              <div className={styles.item}>
                <div className={cn("h3", styles.title)}>Scan to connect</div>
                <div className={styles.text}>Powered by UI8.Wallet</div>
                <div className={styles.box}>
                  <div className={styles.code}>
                    <img src="/images/content/qr-code.png" alt="Qr-code" />
                  </div>
                </div>
                <button className={cn("button-stroke", styles.button)}>
                  Don’t have a wallet app?
                </button>
              </div>
              <div className={styles.item}>
                <div className={cn("h3", styles.title)}>Terms of service</div>
                <div className={styles.text}>
                  Please take a few minutes to read and understand{" "}
                  <span>Stacks Terms of Service</span>. To continue, you’ll need
                  to accept the terms of services by checking the boxes.
                </div>
                <div className={styles.preview}>
                  <img
                    srcSet="/images/content/connect-pic@2x.jpg 2x"
                    src="/images/content/connect-pic.jpg"
                    alt="Connect wallet"
                  />
                </div>
                <div className={styles.variants}>
                  <Checkbox
                    className={styles.checkbox}
                    value={age}
                    onChange={() => setAge(!age)}
                    content="I am at least 13 year old"
                  />
                  <Checkbox
                    className={styles.checkbox}
                    value={conditions}
                    onChange={() => setConditions(!conditions)}
                    content="I agree Stack terms of service"
                  />
                </div>
                <div className={styles.btns}>
                  <button className={cn("button-stroke", styles.button)}>
                    Cancel
                  </button>
                  <button
                    className={cn("button", styles.button)}
                    onClick={() => {
                      onChainSelectHandler(selectedOption);
                    }}
                  >
                    Get started now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WalletConnectionModal
        open={openModal}
        chainId={selectedChainId}
        onConfirm={onWalletConnectHandler}
        onClose={onCloseHandler}
      />
    </>
  );
};

export default Connect;
