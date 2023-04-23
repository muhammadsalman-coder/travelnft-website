import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/app.sass";
import { lazy, useEffect, Suspense } from "react";

import PrivateRouter from "./utils/hooks/PrivateRouter";
import { useEagerConnect } from "./utils/hooks/use-connectors";
import CONNECTOR_NAMES from "./utils/constants/connectorNames";
import { useWeb3React } from "@web3-react/core";
import Spinner from "./components/Spinner/Spinner";

const Page = lazy(() => import("./components/ZPage"));
const Home = lazy(() => import("./screens/ZHome"));
const Buy = lazy(() => import("./screens/ZHomeBuy"));
const Sell = lazy(() => import("./screens/ZHomeSell"));
const Auction = lazy(() => import("./screens/ZHomeAuction"));
const Faq = lazy(() => import("./screens/ZFaq"));
const Contact = lazy(() => import("./screens/ZContact"));
const ConnectWallet = lazy(() => import("./screens/ZConnectWallet"));
const About = lazy(() => import("./screens/ZAbout"));
const Customize = lazy(() => import("./screens/ZCustomize"));

const UploadVariants = lazy(() => import("./screens/UploadVariants"));
const UploadDetails = lazy(() => import("./screens/UploadDetails"));
const Activity = lazy(() => import("./screens/Activity"));
const Search01 = lazy(() => import("./screens/Search01"));
const Search02 = lazy(() => import("./screens/Search02"));
const Profile = lazy(() => import("./screens/Profile"));
const ProfileEdit = lazy(() => import("./screens/ProfileEdit"));
const Item = lazy(() => import("./screens/Item"));
const PageList = lazy(() => import("./screens/PageList"));
const Control = lazy(() => import("./components/ZControl"));

// import Upload from "./screens/UploadDetails";

function SingleMint() {
  return (
    <>
      <h2>Single Mint</h2>
    </>
  );
}
function MultipleMint() {
  return (
    <>
      <h2>Multiple Mint</h2>
    </>
  );
}

function App() {
  const { account, chainId, active } = useWeb3React();
  const { login } = useEagerConnect(
    parseInt(localStorage.getItem("chainId")) ||
      parseInt(process.env.REACT_APP_DEFAULT_CHAINID),
    CONNECTOR_NAMES.injected
  );

  useEffect(() => {
    if (!account && !!localStorage.getItem("chainId")) {
      login();
    }
  }, [account, login]);
  return (
    <Router>
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path="/"
            component={() => (
              <Page>
                <Home />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/buy"
            component={() => (
              <Page>
                <Home />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/sell"
            component={() => (
              <Page>
                <Home />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/asset/:tokenId"
            component={() => (
              <Page>
                <Item />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/auction"
            component={() => (
              <Page>
                <Home />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/faq"
            component={() => (
              <Page>
                <Faq />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/contact"
            component={() => (
              <Page>
                <Contact />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/customize"
            component={() => (
              <Page>
                <Customize />
              </Page>
            )}
          />

          <PrivateRouter
            exact
            path="/about"
            component={() => (
              <Page>
                <About />
              </Page>
            )}
          />
          <PrivateRouter
            path="/profile"
            component={() => (
              <Page>
                <Profile />
              </Page>
            )}
          />

          <Route
            exact
            path="/connect-wallet"
            component={() => (
              <Page>
                <ConnectWallet />
              </Page>
            )}
          />

          <PrivateRouter
            exact
            path="/mint-options"
            component={() => (
              <Page>
                <UploadVariants />
              </Page>
            )}
          />

          <PrivateRouter
            exact
            path="/mint-single"
            component={() => (
              <Page>
                <UploadDetails />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/mint-multiple"
            component={() => (
              <Page>
                <MultipleMint />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/marketplace"
            component={() => (
              <Page>
                <Search01 />
              </Page>
            )}
          />
          {/* <PrivateRouter
            exact
            path="/marketplace"
            component={() => (
              <Page>
                <Search01 />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/search"
            component={() => (
              <Page>
                <Search02 />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/profile-edit"
            component={() => (
              <Page>
                <ProfileEdit />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/page-list"
            component={() => (
              <Page>
                <PageList />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/activity"
            component={() => (
              <Page>
                <Activity />
              </Page>
            )}
          />
          <PrivateRouter
            exact
            path="/control"
            component={() => (
              <Page>
                <Control />
              </Page>
            )}
          /> */}
          {/* 
        <Route exact path="/upload-variants" render={() => (<Page><UploadVariants /></Page>)}/>
        <Route exact path="/upload-details" render={() => (<Page><UploadDetails /></Page>)}/>
        <Route exact path="/connect-wallet" render={() => (<Page><ConnectWallet /></Page>)}/>
        <Route exact path="/activity" render={() => (<Page><Activity /></Page>)}/>
        <Route exact path="/search01" render={() => (<Page><Search01 /></Page>)}/>
        <Route exact path="/search02" render={() => (<Page><Search02 /></Page>)}/>
        <Route exact path="/profile" render={() => (<Page><Profile /></Page>)}/>
        <Route exact path="/profile-edit" render={() => (<Page><ProfileEdit /></Page>)}/>
        <Route exact path="/item" render={() => (<Page><Item /></Page>)}/>
        <Route exact path="/pagelist" render={() => (<Page><PageList /></Page>)}/>
        */}
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
