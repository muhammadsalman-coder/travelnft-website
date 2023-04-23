import React, { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../ZHeader";
import Footer from "../ZFooter";
import { useWeb3React } from "@web3-react/core";
import { Redirect } from "react-router-dom";

import { useHistory } from "react-router-dom";
const Page = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  // const { account, chainId, active } = useWeb3React();
  // console.log("acccount in page", account);
  // useEffect(() => {
  //   if (account) {
  //   } else {
  //     history.push("/connect-wallet");
  //   }
  // }, [account]);
  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.inner}>{children}</div>

      <Footer />
    </div>
  );
};

export default withRouter(Page);
