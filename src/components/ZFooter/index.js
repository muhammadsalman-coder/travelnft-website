import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Form from "../Form";
import Theme from "../Theme";

const items = [
  {
    title: "General",
    menu: [
      {
        title: "About Us",
        url: "/about",
      },
      {
        title: "Customized",
        url: "/customize",
      },
    ],
  },
  {
    title: "Info",
    menu: [
      {
        title: "FAQ",
        url: "/faq",
      },
      {
        title: "Contact Us",
        url: "/contact", 
      }
      /*
      {
        title: "Create item",
        url: "/upload-variants",
      },
      */
    ],
  },
];

const Footers = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    alert("We don't have a newsletter yet. Please be sure to check back with us soon.");
  };

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Link className={styles.logo} to="/">
              <Image
                className={styles.pic}
                src="/ZImages/logo-dark.png"
                srcDark="/ZImages/logo-light.png"
                alt="Fitness Pro"
              />
            </Link>
            <ul style={{marginLeft: "20%"}}>
              <li style={{display: "inline-block", width: "10%", marginRight: "20px"}}><img src="/ZImages/discordIcon.png" style={{width:"100%"}}/></li>
              <li style={{display: "inline-block", width: "10%", marginRight: "20px"}}><img src="/ZImages/twitterIcon.png" style={{width:"100%"}}/></li>
              <li style={{display: "inline-block", width: "10%", marginRight: "20px"}}><img src="/ZImages/instagramIcon.png" style={{width:"100%"}}/></li>
            </ul>
            {/**/}
            <div className={styles.version}>
              <div className={styles.details}>Dark theme</div>
              <Theme className="theme-big" />
            </div>
            
          </div>
          <div className={styles.col}>
            {items.map((x, index) => (
              <Group className={styles.group} item={x} key={index} />
            ))}
          </div>
          <div className={styles.col}>
            <div className={styles.category} style={{fontSize: "18px", fontWeight: "bold"}}>Powered By: </div>
            <div className={styles.text}>
            <img src="/ZImages/cardanologo.png" style={{width:"25%"}}/>
            </div>
            {/*
            <Form
              className={styles.form}
              value={email}
              setValue={setEmail}
              onSubmit={() => handleSubmit()}
              placeholder="Enter your email"
              type="email"
              name="email"
            />
            */}
          </div>
        </div>
        <div className={styles.foot}>

          <div className={styles.copyright}>
            Copyright © 2021  Travel Coin. All rights reserved. Invest Responsibly. <br/>
            Terms & Conditions. Privacy Policy.
          </div>
          <div className={styles.note}>
            We use cookies for better service. <a href="/#">Accept</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
