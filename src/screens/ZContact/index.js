import React from "react";
import styles from "./Contact.module.sass";
import cn from "classnames";
import { Link } from "react-router-dom";
import ContactForm from "../../components/ZContactForm";

const Contact = () => {
  return (
    <>
      <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <h1 className={cn("h2", styles.title)}>Contact Us</h1>
          <div className={styles.info}>
            If you have a question, please try searching the <Link  to="/faq">FAQ</Link> first.
          </div>
          <br/>
          <ContactForm/>

        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
