import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
import Dropdown from "../../components/Dropdown";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Switch from "../../components/Switch";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Preview from "./Preview";
import Cards from "./Cards";
import FolowSteps from "./FolowSteps";

import { useWeb3React } from "@web3-react/core";
import { useFormik } from "formik";
import uploadMedia from "../../utils/helpers/apis/pinata-upload-media";
import uploadJson from "../../utils/helpers/apis/pinata-upload-json";

import FILE_TYPES, {
  VIDEO_TYPES,
  AUDIO_TYPES,
  IMAGE_TYPES,
} from "../../utils/constants/file-types";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useContracts } from "../../utils/hooks/use-connectors";
import Web3 from "web3";
import { BLOCK_EXPLORER_URLS } from "../../utils/helpers/connectors";
const royaltiesOptions = ["10%", "20%", "30%"];

const items = [
  {
    title: "Create collection",
    color: "#4BC9F0",
  },
  {
    title: "Crypto Legend - Professor",
    color: "#45B26B",
  },
  {
    title: "Crypto Legend - Professor",
    color: "#EF466F",
  },
  {
    title: "Legend Photography",
    color: "#9757D7",
  },
];

const validationSchema = yup.object({
  name: yup
    .string("Enter name")
    .min(3, "Name should be of minimum 3 characters length")
    .required("Name is required"),
  description: yup
    .string("Enter description")
    .min(8, "Description should be of minimum 8 characters length")
    .required("Description is required"),
});

const Upload = () => {
  const { contracts } = useContracts();
  console.log("contracts: ", contracts);
  const { account, chainId } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [selectedfile, setSelectedfile] = useState(null);
  const [mediaFile, setMediaFile] = useState("");
  const [mediaType, setMediaType] = useState("");

  const [royalties, setRoyalties] = useState(royaltiesOptions[0]);
  const [sale, setSale] = useState(true);
  // const [price, setPrice] = useState(0);
  const [locking, setLocking] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);

  const [visiblePreview, setVisiblePreview] = useState(false);
  // console.log("Price: ", price);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState(1);

  const handleFile = (e) => {
    // console.log("selectedfile in handleFile: ",e.target.files[0]);
    setSelectedfile(e.target.files[0]);
    if (VIDEO_TYPES.includes(e.target.files[0].type)) {
      setMediaType(FILE_TYPES.VIDEO);
    } else if (IMAGE_TYPES.includes(e.target.files[0].type)) {
      setMediaType(FILE_TYPES.IMAGE);
    } else if (AUDIO_TYPES.includes(e.target.files[0].type)) {
      setMediaType(FILE_TYPES.AUDIO);
    }
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  console.log("mediaFile", mediaFile);
  console.log("mediaType", mediaType);
  // console.log("");
  // const formik = useFormik({
  // initialValues: {
  //   name: "",
  //   description: "",
  //   royalties: "",
  //   price: "",
  //    // onSale: sale,
  // },
  // validationSchema,
  // onSubmit: async (values) => {
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("handleSubmit starts");
    // setLoading(true);
    console.log("selectedfile in formik: ", selectedfile);
    const fileHash = await uploadMedia(selectedfile);
    console.log("fileHash: ", await fileHash);
    const metadata = {
      imageUrl: `https://gateway.pinata.cloud/ipfs/${fileHash}`,
      name: name,
      description: description,
      royalties: royalties,
      // price: price,
      // onSale: sale,
    };

    if (!fileHash) {
      // error
      setLoading(false);
      toast("File Upload Error", { type: "error" });
      return;
    }

    const json = {
      pinataMetadata: {
        name: `metadata-${name}`,
        keyvalues: {
          createdBy: account,
        },
      },
      pinataContent: metadata,
    };

    const jsonHash = await uploadJson(json);
    if (!jsonHash) {
      setLoading(false);
      toast("Metadata Upload Error", { type: "error" });
    }

    console.log("jsonHash: ", jsonHash);
    mint(jsonHash);

    console.log("handleSubmit ends");
  }

  // });

  const mint = async (jsonHash) => {
    if (account && contracts.RoyaltyContract) {
      let MINT_FEE = await contracts.RoyaltyContract.methods.MINT_FEE().call();
      // console.log("MINT_FEE: ", Web3.utils.fromWei(MINT_FEE, "ether"));
      let { transactionHash } = await contracts.RoyaltyContract.methods
        .mint(jsonHash)
        .send({ from: account, value: MINT_FEE, gas: 385000 });
      console.log("transactionHash: ", transactionHash);

      toast(
        <a href={`${BLOCK_EXPLORER_URLS[chainId]}tx/${transactionHash}`}>
          Successfully Minted! Check transaction
        </a>,
        { type: "success" }
      );
    } else console.log("Account Not found");
  };

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create single collectible
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Switch to Multiple
              </button>
            </div>
            <form className={styles.form} action="" onSubmit={handleSubmit}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload file</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <input
                      className={styles.load}
                      type="file"
                      onChange={(e) => handleFile(e)}
                    />
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                    </div>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Item Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Item name"
                      name="Item"
                      type="text"
                      // value={formik.values.name}
                      //  onChange={formik.handleChange}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='e. g. Redeemable Bitcoin Card with logo"'
                      required
                    />
                    <TextInput
                      className={styles.field}
                      label="Description"
                      name="Description"
                      type="text"
                      // onChange={formik.handleChange}
                      // value={formik.values.description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      required
                    />
                    <div className={styles.row}>
                      <div className={styles.col}>
                        <div className={styles.field}>
                          <div className={styles.label}>Royalties</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={royalties}
                            setValue={setRoyalties}
                            options={royaltiesOptions}
                          />
                        </div>
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Size"
                          name="Size"
                          type="text"
                          onChange={(e) => {
                            setSize(e.target.value);
                          }}
                          value={size}
                          // onChange={formik.handleChange}
                          // value={formik.values.size}
                          placeholder="e. g. Size"
                          required
                        />
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Propertie"
                          name="Propertie"
                          type="text"
                          // onChange={formik.handleChange}
                          // value={formik.values.propertie}
                          placeholder="e. g. Propertie"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.options}>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Put on sale</div>
                    <div className={styles.text}>
                      You’ll receive bids on this item
                    </div>
                  </div>
                  <Switch value={sale} setValue={setSale} />
                </div>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Instant sale price</div>
                    <div className={styles.text}>
                      Enter the price for which the item will be instantly sold
                    </div>
                  </div>
                  {/* <Switch value={price} setValue={setPrice} /> */}
                  <TextInput
                    className={styles.field}
                    label="Price"
                    name="Price"
                    type="text"
                    // onChange={formik.handleChange}
                    // value={formik.values.price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e. g. 1 BSC"
                    required
                    // onChange={(e)=> setPrice(e.target.value)}
                  />
                </div>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Unlock once purchased</div>
                    <div className={styles.text}>
                      Content will be unlocked after successful transaction
                    </div>
                  </div>
                  <Switch value={locking} setValue={setLocking} />
                </div>
                <div className={styles.category}>Choose collection</div>
                <div className={styles.text}>
                  Choose an exiting collection or create a new one
                </div>
                <Cards className={styles.cards} items={items} />
              </div>
              <div className={styles.foot}>
                <button
                  className={cn("button-stroke tablet-show", styles.button)}
                  onClick={() => setVisiblePreview(true)}
                  type="button"
                >
                  Preview
                </button>
                <button
                  className={cn("button", styles.button)}
                  // onClick={() => setVisibleModal(true)}
                  // type="button" hide after form customization
                  type="submit"
                >
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </button>
                {/* <div className={styles.saving}>
                  <span>Auto saving</span>
                  <Loader className={styles.loader} />
                </div> */}
              </div>
            </form>
          </div>

          <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            onClose={() => setVisiblePreview(false)}
            mediaFile={mediaFile}
            mediaType={mediaType}
            data={{ name, description, price, size }}
            fileType={selectedfile?.type}
          />
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowSteps className={styles.steps} />
      </Modal>
    </>
  );
};

export default Upload;
