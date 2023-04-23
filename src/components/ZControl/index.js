import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Control.module.sass";


const Control = ({ className, item }) => {
  return (
    <div className={cn(styles.control, className)}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.link} to="/"><span>Athletics</span></Link>
        <Link className={styles.link} to="/"><span>Esports</span></Link>
        <Link className={styles.link} to="/"><span>Extreme</span></Link>
        <Link className={styles.link} to="/"><span>Individual</span></Link>
        <Link className={styles.link} to="/"><span>Motor</span></Link>
        <Link className={styles.link} to="/"><span>Strategy</span></Link>
        <Link className={styles.link} to="/"><span>Team</span></Link>
        <Link className={styles.link} to="/"><span>Water</span></Link>
        <Link className={styles.link} to="/"><span>Events</span></Link>
      </div>
    </div>
  );
};

export default Control;
