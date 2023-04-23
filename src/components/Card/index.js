import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import { useWeb3React } from "@web3-react/core";
import {useContracts} from "../../utils/hooks/use-connectors"
import Web3 from "web3";
const Card = ({ className, item,activeIndex }) => {
   // 23March work
  // console.log("activeIndex in Card/index.js: ", activeIndex);
  const {account} = useWeb3React();
  const {contracts} = useContracts();
  const [staticPrice, setStaticPrice] = useState("0.0001");

 
  const handleBuy = async(tokenId)=> {
    if(contracts && account){
      try {
    let res = await contracts.RoyaltyContract.methods.buy(tokenId)
    .send({from: account, value: Web3.utils.toWei(item.price, "ether"), gas: 300000});
       console.log("res: ", res);
      }catch(e){console.log("error on purchase: ", e)}
    } else console.log("Please set contracts and account first");
  } 
  // Ending with problem on  handleSell
  const handleSell = async(tokenId)=> {
    if(contracts && account){
      try {
        // let p = Web3.utils.toWei(staticPrice,"ether");
    let res = await contracts.RoyaltyContract.methods.sell(2, Web3.utils.toWei(staticPrice,"ether"))
    .send({from: account, gas: 300000});
       console.log("res: ", res);
      }catch(e){console.log("error on sell: ", e)}
    } else console.log("Please set contracts and account first");
  } 


  const [visible, setVisible] = useState(false);
  console.log("dataa in card", item);
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>

        <img srcSet={`${item?.image2x} 2x`} src={item?.imageUrl} alt="Card" />

        <div className={styles.control}>
          <div
            className={cn(
              { "status-green": item?.category === "green" },
              styles.category
            )}
          >
            {item?.categoryText}
          </div>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="heart" size="20" />
          </button>

          {activeIndex == 1 ? <button className={cn("button-small", styles.button)} onClick={()=> handleSell(item.tokenId)}>
          <Link to={`/asset/${item?.tokenId}`} style = {{color: 'white', textDecoration: 'none'}}> <span>Sell</span> </Link>

            <Icon name="scatter-up" size="16" />
          </button> : item.owner == account ? null : <button className={cn("button-small", styles.button)} onClick={()=> handleBuy(item.tokenId)}>
            <span>Buy</span>
            <Icon name="scatter-up" size="16" />
          </button>
          }  
        </div>
      </div>
      <Link className={styles.link} to={item.tokenId}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item?.name}</div>
            <div className={styles.price}>{activeIndex == 1 ? null : `${item?.price} BNB` }</div>

          </div>
          <div className={styles.line}>
            <div className={styles.users}>
              {item?.users?.map((x, index) => (
                <div className={styles.avatar} key={index}>
                  <img src={x?.avatar} alt="Avatar" />
                </div>
              ))}
            </div>
            <div className={styles.counter}>{item?.counter}</div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            <Icon name="candlesticks-up" size="20" />
            Highest bid <span>{item?.highestBid}</span>
          </div>
          <div
            className={styles.bid}
            dangerouslySetInnerHTML={{ __html: item?.bid }}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
