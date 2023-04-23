import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hero.module.sass";
import Dropdown from "../../../components/Dropdown";
import Icon from "../../../components/Icon";
import Item from "./Item";
import Items from "../../Profile/Items";

const items = [
  {
    title: "General",
    icon: "home",
    content: [
      {
        question: "What is Travel Coin?",
        answer: "Travel Coin is a place where you can buy, trade, sell, and auction of Travel related NFTs"
      },
      {
        question: "What is the Travel Coin Token?",
        answer: "This token can be traded and redeemed for items specifically at travelcoin.tv"
      },
      {
        question: "Do you sell Travel Packages?",
        answer: "This is currently being developed. Please be sure to check back again soon."
      },
    ],
  },
  {
    title: "Support",
    icon: "circle-and-square",
    content: [
      {
        question: "Can we use other networks besides Cardano.",
        answer: "SportzCoin is powered by Cardano and we have no plans to support any other blockchain."
      },
      {
        question: "What wallets are supported",
        answer: "Any cardano wallet will work. That means Adalite.io, Yoroi, and Daedalus."
        +"We recommend using those services with a Hardware wallet like the Trezor Model T or Ledger devices."
      },
    ],
  },
  {
    title: "Login",
    icon: "pen",
    content: [
      {
        question: "Connect Wallet is not working",
        answer: "Currently this feature is not enabled. Please check back in with us soon."
      },
    ],
  },
];

const Hero = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [direction, setDirection] = useState(options[0]);

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <h1 className={cn("h2", styles.title)}>Frequently asked questions</h1>
          <div className={styles.info}>
            Find answers to the most common questions asked.

          </div>
          <Dropdown
            className={cn("mobile-show", styles.dropdown)}
            value={direction}
            setValue={setDirection}
            options={options}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.nav}>
              {items.map((x, index) => (
                <div
                  className={cn(styles.link, {
                    [styles.active]: x.title === direction,
                  })}
                  onClick={() => setDirection(x.title)}
                  key={index}
                >
                  <Icon name={x.icon} size="16" />
                  <span>{x.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            {items
              .find((x) => x.title === direction)
              .content.map((x, index) => (
                <Item className={styles.item} question={x.question} key={index} answer={x.answer}/>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
