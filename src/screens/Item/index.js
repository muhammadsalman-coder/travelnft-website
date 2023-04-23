import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import { useWeb3React } from "@web3-react/core";
import { useContracts } from "../../utils/hooks/use-connectors";
import Web3 from "web3";
import axios from "axios";
const navLinks = ["Info", "Owners", "History", "Bids"];

const categories = [
  {
    category: "black",
    content: "art",
  },
  {
    category: "purple",
    content: "unlockable",
  },
];

const users = [
  {
    name: "Raquel Will",
    position: "Owner",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "Selina Mayert",
    position: "Creator",
    avatar: "/images/content/avatar-1.jpg",
  },
];
const Item = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // --------------
  const { account } = useWeb3React();
  const { contracts } = useContracts();
  const [staticPrice, setStaticPrice] = useState("0.0001");
  const [nfts, setNfts] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [data, setdata] = useState([]);
  // -------------
  const { tokenId } = useParams();
  console.log("id ---", tokenId);
  console.log("nfts---", nfts);
  // -------------------------------
  // fetching nft data
  useEffect(() => {
    async function fetchCollectibles() {
      // 1st CALL
      // let result = await contracts.RoyaltyContract.methods.totalSupply().call();
      // console.log("result: ", result);

      // for(let i = 1; i <= result; i++) {

      // 2nd CALL
      // let owner = await contracts.RoyaltyContract.methods.ownerOf(i).call();
      // if(owner == account){
      //   // console.log(`owner of ${i} = `, owner);

      //   // - 18March WORK
      //   // 3rd CALL
      //   let uri = await contracts.RoyaltyContract.methods.tokenURI(i).call();
      //   console.log(`uri of NFT:${i} is: ${uri}`);

      //   // 4th CALL
      //   uri = uri.replace("ipfs://", "https://ipfs.io/ipfs/")
      //   console.log("udpated uri", uri);
      //   let NFTData = await axios.get(uri);
      //   console.log("NFTData: ", NFTData.data);
      // }

      // }

      // 1st CALL
      let ownedTokens = await contracts?.RoyaltyContract?.methods
        .walletOfOwner(account)
        .call();
      // console.log("ownedTokens: ", ownedTokens);

      if (ownedTokens?.length > 0) {
        // 2nd CALL
        let tempOnSell = [];
        let tempNft = [];
        //  for (let i = 0; i < ownedTokens.length; i++){
        // console.log("in loop")
        let uri = await contracts.RoyaltyContract.methods
          .tokenURI(tokenId)
          .call();
        // console.log(`uri of NFT ${ownedTokens[i]}: `, uri);

        let result = await axios.get(uri); // metadata of NFT's
        // console.log(`metadata of NFT ${ownedTokens[i]}: `, result.data);
        let obj = { ...result.data, tokenId: tokenId };
        console.log("obj is here", obj);
        tempNft.push(obj);

        // if(result.data.onSale){
        //   let obj = {...result.data, tokenId: ownedTokens[i]}
        //   tempOnSell.push(obj);
        // onSale.push(result.data);
        //   }
        // }
        setOnSale(tempOnSell);
        setNfts(tempNft[0]);
      } else console.log("User owned zero NFT's");
    }
    async function fetchOnSale() {
      if (contracts?.RoyaltyContract && account) {
        let ownedTokens = await contracts.RoyaltyContract.methods
          .walletOfOwner(account)
          .call();
        if (ownedTokens.length > 0) {
          for (let i = 0; i < ownedTokens.length; i++) {
            let res = await contracts.RoyaltyContract.methods
              .isListed(ownedTokens[i])
              .call();
            console.log(`NFT listed status: `, res);
            if (res) {
              let price = await contracts.RoyaltyContract.methods
                .getPrice(ownedTokens[i])
                .call();
              let inEther = Web3.utils.fromWei(price, "ether"); // Price of user NFT in ether
              console.log(`Price of NFT${ownedTokens[i]} is: `, inEther);
            } else console.log("Not Listed");
          }
        } else console.log("User does not own any NFT");
      } else console.log("Connect wallet first");
    }
    // if(activeIndex === 1 && account && contracts.RoyaltyContract){
    //   // alert("in collectibles");
    //   fetchCollectibles();
    // }
    //   else if(activeIndex === 0 && account && contracts.RoyaltyContract) {
    //     fetchOnSale();
    // }
    if (account) {
      fetchCollectibles();
    }
    // fetchOnSale();
    // setInterval(()=> {
    //   console.log("onSale: ", onSale);
    // },5000)
  }, [activeIndex, contracts, account]);
  // --------------------------------

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                {categories.map((x, index) => (
                  <div
                    className={cn(
                      { "status-black": x.category === "black" },
                      { "status-purple": x.category === "purple" },
                      styles.category
                    )}
                    key={index}
                  >
                    {x.content}
                  </div>
                ))}
              </div>
              <img
                srcSet={nfts?.imageUrl}
                // src="/images/content/item-pic.jpg"
                alt="Item"
              />
            </div>
            <Options className={styles.options} />
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>{nfts?.name}</h1>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                {nfts?.price} BNB
              </div>
              <div className={cn("status-stroke-black", styles.price)}>
                $4,429.87
              </div>
              <div className={styles.counter}>10 in stock</div>
            </div>
            <div className={styles.info}>
              This NFT Card will give you Access to Special Airdrops. To learn
              more about UI8 please visit{" "}
              <a
                href="https://ui8.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ui8.net
              </a>
            </div>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            <Users className={styles.users} items={users} />
            <Control className={styles.control} data={nfts} />
          </div>
        </div>
      </div>
    </>
  );
};

Item.defaultProps = {
  name: "Amazing Art",
};
export default Item;
