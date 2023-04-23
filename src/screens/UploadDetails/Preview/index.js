import React from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import Icon from "../../../components/Icon";
import FILE_TYPES from "../../../utils/constants/file-types";
const Preview = ({
  className,
  onClose,
  mediaFile,
  mediaType,
  fileType,
  data,
}) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info}>Preview</div>
        <div className={styles.card}>
          <div className={styles.preview}>
            {/* <img
              srcSet="/images/content/card-pic-6.jpg"
              src="/images/content/card-pic-6@2x.jpg"
              alt="Card"
            /> */}
            {!!mediaFile ? (
              <>
                {(mediaType === FILE_TYPES.VIDEO ||
                  mediaType === FILE_TYPES.AUDIO) && (
                  <video
                    className={styles.video}
                    variant="rounded"
                    style={{ width: "100%" }}
                    controls
                  >
                    <source src={mediaFile} type={fileType} />
                  </video>
                )}
                {mediaType === FILE_TYPES.IMAGE && (
                  <img src={mediaFile} alt="img" className={styles.video} />
                )}
              </>
            ) : (
              "No File Selected Yet"
            )}
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>{data?.name}</div>
                <div className={styles.price}>{data?.price} BNB</div>
              </div>
              <div className={styles.line}>
                <div className={styles.title}>{data?.description}</div>
                {/* <div className={styles.price}>{data?.price} BNB</div> */}
              </div>
              {/* <div className={styles.line}>
                <div className={styles.users}>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-1.jpg" alt="Avatar" />
                  </div>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-3.jpg" alt="Avatar" />
                  </div>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-4.jpg" alt="Avatar" />
                  </div>
                </div>
                <div className={styles.counter}>3 in stock</div>
              </div> */}
            </div>
            <div className={styles.foot}>
              {/* <div className={styles.line}> */}
              <div className={styles.users}>
                <div className={styles.avatar}>
                  <img src="/images/content/avatar-1.jpg" alt="Avatar" />
                </div>
                <div className={styles.avatar}>
                  <img src="/images/content/avatar-3.jpg" alt="Avatar" />
                </div>
                <div className={styles.avatar}>
                  <img src="/images/content/avatar-4.jpg" alt="Avatar" />
                </div>
              </div>
              {/* </div> */}
              <div className={styles.counter}>{data?.size} in stock</div>
              {/* <div className={styles.status}>
                <Icon name="candlesticks-up" size="20" />
                Highest bid <span>0.001 ETH</span>
              </div>
              <div className={styles.bid}>
                New bid
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </div> */}
            </div>
          </div>
        </div>
        <button className={styles.clear}>
          <Icon name="circle-close" size="24" />
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Preview;
