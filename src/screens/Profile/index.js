import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Followers from "./Followers";

// data
import { bids } from "../../mocks/bids";
import { isStepDivisible } from "react-range/lib/utils";

// 17March work
import { useContracts } from "../../utils/hooks/use-connectors";
import { useWeb3React } from "@web3-react/core";
// 18March work
import axios from "axios";

import Web3 from "web3";

const navLinks = [
  "On Sale",
  "Collectibles",
  "Created",
  "Likes",
  "Following",
  "Followers",
];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
];

const following = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const followers = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const Profile = () => {
  // 17March
  const { contracts } = useContracts();
  const { account } = useWeb3React();

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  let [collectible, setcollectible] = useState([]);
  const [isOnSale, setisOnSale] = useState([]);

  // const [bids, setBids] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [onSale, setOnSale] = useState([]);

  console.log("nfts---", nfts);
  console.log("onSale---", onSale);
  console.log("activeIndex in profile/index.js: ", activeIndex);
  // 17March WORK

  useEffect(() => {
    async function fetchCollectibles() {
      // 1st CALL
      let ownedTokens = await contracts?.RoyaltyContract?.methods
        .walletOfOwner(account)
        .call();
      console.log("ownedTokens: ", ownedTokens);

      if (ownedTokens?.length > 0) {
        // 2nd CALL
        let tempOnSell = [];
        let tempNft = [];
        for (let i = 0; i < ownedTokens.length; i++) {
          // console.log("in loop")
          let uri = await contracts.RoyaltyContract.methods
            .tokenURI(ownedTokens[i])
            .call();
          console.log(`uri of NFT ${ownedTokens[i]}: `, uri);

          let result = await axios.get(uri); // metadata of NFT's

          console.log(`metadata of NFT ${ownedTokens[i]}: `, result.data);
          // let obj = {...result.data, tokenId: ownedTokens[i]}
          // console.log('object ye raha--', obj)
          // tempNft.push(obj);

          //24March
          // 1- Get onSale status
          // 2- Get price if NFT is onSale
          let isOnSale = await contracts.RoyaltyContract.methods
            .isListed(ownedTokens[i])
            .call();
          console.log("isOnSale: ", isOnSale);
          if (isOnSale) {
            // get price
            let onSalePrice = await contracts.RoyaltyContract.methods
              .getPrice(ownedTokens[i])
              .call();
            console.log("onSalePrice: ", onSalePrice);
            let onSaleObj = {
              ...result.data,
              tokenId: ownedTokens[i],
              owner: account,
              price: onSalePrice,
            };
            console.log("obj: ", onSaleObj);
            tempOnSell.push(onSaleObj);
          }

          console.log(`metadata of NFT ${ownedTokens[i]}: `, result.data);
          let tempObj = {
            ...result.data,
            tokenId: ownedTokens[i],
            owner: account,
          };
          tempNft.push(tempObj);

          // if(result.data.onSale){
          //   let obj = {...result.data, tokenId: ownedTokens[i], owner: account}
          //   tempOnSell.push(obj);
          //   // onSale.push(result.data);
          // }
        }
        setOnSale(tempOnSell);
        setNfts(tempNft);
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

  return (
    <div className={styles.profile}>
      <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage: "url(/images/content/bg-profile.jpg)",
        }}
      >
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => setVisible(true)}
            >
              <span>Edit cover photo</span>
              <Icon name="edit" size="16" />
            </button>
            <Link
              className={cn("button-stroke button-small", styles.button)}
              to="profile-edit"
            >
              <span>Edit profile</span>
              <Icon name="image" size="16" />
            </Link>
          </div>
          <div className={styles.file}>
            <input type="file" />
            <div className={styles.wrap}>
              <Icon name="upload-file" size="48" />
              <div className={styles.info}>Drag and drop your photo here</div>
              <div className={styles.text}>or click to browse</div>
            </div>
            <button
              className={cn("button-small", styles.button)}
              onClick={() => setVisible(false)}
            >
              Save photo
            </button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <User className={styles.user} item={socials} />
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                  <Items class={styles.items} items={onSale} />
                )}
                {activeIndex === 1 && (
                  <Items
                    class={styles.items}
                    items={nfts}
                    activeIndex={activeIndex}
                  />
                )}
                {activeIndex === 2 && (
                  <Items class={styles.items} items={bids.slice(0, 2)} />
                )}
                {activeIndex === 3 && (
                  <Items class={styles.items} items={bids.slice(0, 3)} />
                )}
                {activeIndex === 4 && (
                  <Followers className={styles.followers} items={following} />
                )}
                {activeIndex === 5 && (
                  <Followers className={styles.followers} items={followers} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
