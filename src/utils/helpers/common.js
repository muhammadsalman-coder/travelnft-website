// import hash from "object-hash";
import CHAINS from "../constants/chains";

const getEllips = (str) => {
  if (str) {
    return `${str.slice(0, 6)}...${str.slice(-12)}`;
  }
  return "";
};

const getChainNames = (chainId) => {
  return CHAINS.find((chain) => chain.chainId === chainId)?.title;
};

const convertNumberToCurrencyFormat = (number) => {
  return Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "USD",
  }).format(number);
};

const convertNumber = (number) => {
  return Intl.NumberFormat("en-US", { maximumSignificantDigits: 5 }).format(
    number
  );
};

// const getCollectionHash = (user, contract) => {
//   const hashVal = hash({ user, contract });
//   return `${hashVal.substr(0, 5)}${hashVal.substr(
//     hashVal.length - 5,
//     hashVal.length
//   )}`.toUpperCase();
// };

const toDataURL = async (url) => {
  console.log("toDataURL url [error]", url);
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "*");
    // headers.append('Access-Control-Allow-Credentials', 'true');
    return fetch(url, { method: "GET", headers: headers, mode: "no-cors" })
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            console.log("reader-------", reader);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);

            console.log("reader-------", reader);
          })
      );
  } catch (err) {
    console.log("toDataURL url [error]", err);
  }
};

const dataURLtoFile = (dataurl, filename) => {
  console.log("dataurlmy", dataurl);
  try {
    var arr = dataurl?.split(","),
      mime = arr[0]?.match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    console.log("arr[0]?.match(/:(.*?);/)", arr[0]?.match(/:(.*?);/));
    console.log("arr[0]?.match(/:(.*?);/)--------", arr);
    return new File([u8arr], filename, { type: mime });
  } catch (err) {
    console.log("dataURLtoFile helpers error", err);
  }
};

export {
  getEllips,
  getChainNames,
  convertNumber,
  convertNumberToCurrencyFormat,
  // getCollectionHash,
  toDataURL,
  dataURLtoFile,
};
