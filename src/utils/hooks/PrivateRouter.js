import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router";
// import { useEffect } from "react";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const { account, chainId, active } = useWeb3React();
  console.log("account1231", account);
  console.log("wokrings2", account);
  console.log("wokrings1", !!account);
  useEffect(() => {
    setTimeout(() => {
      if (account) {
        window.sessionStorage.setItem("account", account);
      } else {
        window.sessionStorage.clear();
      }
    }, 2000);
  }, [account]);

  return (
    <Route
      {...rest}
      component={(props) => {
        let account2 = window.sessionStorage.getItem("account");
        if (account2) {
          console.log("working21", account);
          return <Component {...props} />;
        } else {
          console.log("working2", account);
          // alert("work2");
          return <Redirect to={`/connect-wallet`} />;
        }
      }}
    />
  );
};
export default PrivateRouter;
