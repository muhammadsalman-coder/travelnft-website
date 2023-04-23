import React from "react";
import styles from "./Contact.module.sass";
import cn from "classnames";
import { Link } from "react-router-dom";
import ContactForm from "../../components/ZContactForm";

const About = () => {
  return (
    <>
      <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <h1 className={cn("h2", styles.title)}>About Us</h1>
          <div className={styles.info}>
            Travel Coin is a place to buy, sell, & trade travel related NFTs.
            If you have a question, please try searching the <Link  to="/faq">FAQ</Link> first.
          </div>
          <br/>
          <h1 className={cn("h2", styles.title)}>How it works</h1>
          <div className={styles.info}>
            NFTs stands for Non-Fungible Token which means it's unique. Having an NFT in your cardano wallet proves
            you are the owner of that NFT.
          </div>
          <br/>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
