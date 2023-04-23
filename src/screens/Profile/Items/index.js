import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card";
import Loader from "../../../components/LoaderCircle";
import Spinner from "../../../components/Spinner/Spinner";

const Items = ({ className, items, activeIndex }) => {
  console.log("items in onSale: ", items);
  return (
    <div className={cn(styles.items, className)}>
      <div className={styles.list}>
        {items?.map((x, index) => (
          <Card
            className={styles.card}
            item={x}
            key={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>
      <Spinner className={styles.loader} />
    </div>
  );
};

export default Items;
