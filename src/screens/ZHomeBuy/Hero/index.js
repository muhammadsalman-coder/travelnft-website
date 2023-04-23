import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styles from "./Hero.module.sass";
import Icon from "../../../components/Icon";
import Player from "../../../components/ZPlayer";
import Modal from "../../../components/Modal";
import Connect from "../../../components/Connect";
// import Bid from "../../../components/Bid";
/*
const items = [
  {
    title: "Featured NFT 1",
    creator: "Greg Smith",
    forsale: false,
    currency: "3618.36 ADA",
    line1: "Collectible Pack 1",
    line2: "A collection of Basketball NFTs",
    price: "$3,618.36",
    avatar: "/images/content/avatar-4.jpg",
    image: "/ZImages/featurebasketball.jpg",
    image2x: "/ZImages/featurebasketball.jpg",
    status: "SOLD",
  },
  {
    title: "A New NFT Home",
    creator: "Not Owned",
    forsale: true,
    currency: "4125477.92 ADA",
    line1: "Collectible Pack 2",
    line2: "A collection of Football NFTs",
    price: "$2,477.92",
    avatar: "/images/content/avatar-7.jpg",
    image: "/ZImages/featurefootball.jpg",
    image2x: "/ZImages/featurefootball.jpg",
    status: "Buy Now",
  },
];
*/
const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Hero = ({items}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
  };

  const [visibleModalBid, setVisibleModalBid] = useState(false);

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
            <h2 className={cn("h3", styles.title)}>
              Featured
            </h2>
            <br/>
            <br/>
          <div className={styles.wrapper}>
            <Slider className="creative-slider" {...settings}>
              {items.map((x, index) => (
                <div className={styles.slide} key={index}>
                  <div className={styles.row}>
                    <Player className={styles.player} item={x} />
                    <div className={styles.details}>
                      <div className={cn("h1", styles.subtitle)}>{x.title}</div>
                      <div className={styles.line}>
                        <div className={styles.item}>
                          <div className={styles.avatar}>
                            <img src={x.avatar} alt="Avatar" />
                          </div>
                          <div className={styles.description}>
                            <div className={styles.category}>Owner</div>
                            <div className={styles.text}>{x.creator}</div>
                          </div>
                        </div>
                        <div className={styles.item}>
                          {x.forsale === true &&
                          <>
                          <div className={styles.icon}>
                            <Icon name="stop" size="24" />
                          </div>
                          
                          <div className={styles.description}>
                            <div className={styles.category}>Instant price</div>
                            <div className={styles.text}>1234 ADA</div>
                          </div>
                          </>
                          }
                        </div>
                      </div>
                      <div className={styles.wrap}>
                        <div className={styles.info}>Details</div><br/>
                        <div className={styles.info}>{x.line1}</div>
                        <div className={styles.info}>{x.line2}</div> <br/>
                        
                        {/*
                        <div className={styles.timer}>
                          <div className={styles.box}>
                            <div className={styles.number}>19</div>
                            <div className={styles.time}>Hrs</div>
                          </div>
                          <div className={styles.box}>
                            <div className={styles.number}>24</div>
                            <div className={styles.time}>mins</div>
                          </div>
                          <div className={styles.box}>
                            <div className={styles.number}>19</div>
                            <div className={styles.time}>secs</div>
                          </div>
                        </div>
                        */}
                      </div>
                      <div className={styles.btns}>
                        <button
                          className={cn("button", styles.button)}
                          onClick={() => setVisibleModalBid(true)}
                          disabled
                        >
                          {x.status}
                        </button>
                        {/*
                        <Link
                          className={cn("button-stroke", styles.button)}
                          to="/item"
                        >
                          View item
                        </Link>
                        */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        <Connect />
      </Modal>
    </>
  );
};

export default Hero;
