import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import useDarkMode from "use-dark-mode";
import { getEllips } from "../../utils/helpers/common";
import { useWeb3React } from "@web3-react/core";
const nav = [
  {
    url: "/buy",
    title: "Buy",
  },
  {
    url: "/sell",
    title: "Sell",
  },
  // {
  //   url: "/auction",
  //   title: "Auction",
  // },
  {
    url: "/mint-options",
    title: "Mint",
  },
];

const Headers = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const { account } = useWeb3React();
  const handleSubmit = (e) => {
    alert(
      "The search feature doesn't work yet. Please be sure to check back again soon."
    );
    console.log(nav.length);
  };

  return (
    <>
      {/* 
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/ZImages/logo-dark.png"
            srcDark="/ZImages/logo-light.png"
            alt="Logo"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
        <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                //activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav>
        </div>
        <Notification className={styles.notification} />
        <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/connect-wallet"
        >
          Connect Wallet
        </Link>
      </div>
    </header>
    */}
      {/** */}
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand className={styles.logo} style={{ marginRight: "20px" }}>
            <Link to="/">
              <Image
                className={styles.pic}
                src="/ZImages/logo-dark.png"
                srcDark="/ZImages/logo-light.png"
                alt="logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.ham}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div
                className={cn(styles.wrapper, { [styles.active]: visibleNav })}
              >
                <form
                  className={styles.search}
                  action=""
                  onSubmit={() => handleSubmit()}
                >
                  <input
                    className={styles.input}
                    style={{ fontSize: "17px" }}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    placeholder="Search"
                    required
                  />
                  <button className={styles.result}>
                    <Icon name="search" size="20" />
                  </button>
                </form>
                <Notification className={styles.notification} />
                <nav className={styles.nav}>
                  {nav.map((x, index) => (
                    <Link
                      className={styles.link}
                      //activeClassName={styles.active}
                      to={x.url}
                      key={index}
                    >
                      {x.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </Nav>
            <Nav className="ml-auto">
              {account ? (
                <Link
                  className={cn("button-stroke button-small", styles.button)}
                  to="/profile"
                >
                  {getEllips(account)}
                </Link>
              ) : (
                <Link
                  className={cn("button-stroke button-small", styles.button)}
                  to="/connect-wallet"
                >
                  Connect Wallet
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
