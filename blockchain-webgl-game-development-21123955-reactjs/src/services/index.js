import axios from "axios";
import DeployABI from "src/ABI/DeployABI.json";

import Web3 from "web3";
import { toast } from "react-toastify";
import moment from "moment";
import { getContract, getWeb3Obj } from "../utils";
import apiConfig from "src/component/config/ApiConfig";
import { deployData } from "src/constants";
const web3 = (window.web3 = new Web3(window.ethereum));

var nfttokenContract = new web3.eth.Contract(DeployABI);
console.log("nfttokenContract", nfttokenContract);
export const approveTokenHandler = async (
  tokenId,
  tokenAddress,
  abi,
  library,
  account,
  contractAddress
) => {
  console.log("tokenId", tokenId);
  console.log("tokenAddress", tokenAddress);
  console.log("contractAddress", contractAddress);

  try {
    const appContract = getContract(tokenAddress, abi, library, account);
    console.log("appContract", appContract);
    const apr = await appContract.approve(contractAddress, tokenId);
    await apr.wait();
    return true;
  } catch (error) {
    console.log("error", error);
    toast.error(error.message);
    return false;
  }
};

export const getTokenId = async (contractAddress, abi, library, account) => {
  try {
    const tokenIDContract = await getContract(
      contractAddress,
      abi,
      library,
      account
    );
    const tokenID = await tokenIDContract.totalSupply();
    console.log("tokenID.toString()", tokenID.toString());
    let token = parseInt(tokenID.toString()) - 1;
    return token;
  } catch (error) {
    console.log("errr", error);
    return false;
  }
};

export const uploadNFTHandler = async (body, ipfsHash, apiEndPoint) => {
  console.log("ipfsHash", ipfsHash);
  const token = sessionStorage.getItem("token");

  try {
    const res = await axios.post(apiConfig[apiEndPoint], body, {
      headers: {
        token,
      },
    });
    if (res.data.statusCode === 200) {
      return res.data.result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const createNFTBlockchainHanlder = async (
  contractAddress,
  abi,
  library,
  account,
  hash,
  name
) => {
  try {
    const contract = getContract(contractAddress, abi, library, account);
    console.log("contract", contract);
    const createRes = await contract.create(hash, name);
    console.log("createRes", createRes);
    await createRes.wait();
    return true;
  } catch (error) {
    console.log("ERROR", error);
    return false;
  }
};

export const createNFTHandler = async (
  body,
  tokenId,
  EngineAddress,
  Engine,
  library,
  account,
  advanceSettings
) => {
  try {
    const token = sessionStorage.getItem("token");

    const addNftBody = {
      collectionId: body.collectionId,
      tokenId: tokenId,
      tokenName: body.title,
      title: body.title,
      uri: body.uri,
      description: body.description,
      mediaFile: body.coverFile ? body.coverFile : body.imgFile,
      coverImage: body.imgFile,
      itemCategory: body.categoryType,
      unlockOncePurchased: body.unlockOncePurchased,
      price: body.price,
      royalties: body.royalties,
      properties: JSON.stringify(advanceSettings),
      alternativeTextForNFT: body.alternativeTextForNFT
        ? body.alternativeTextForNFT
        : "NA",
      network: body.network,
      mediaType: body.mediaType,
    };
    // new FormData();
    // addNftBody.append('collectionId', body.collectionId);
    // addNftBody.append('tokenName', body.title);
    // addNftBody.append('uri', body.uri);
    // addNftBody.append('description', body.description);
    // addNftBody.append('uploadCover', body.coverFile);
    // addNftBody.append('uploadFile', body.imgFile);
    // addNftBody.append('tokenId', tokenId);
    // addNftBody.append('categoryType', body.categoryType);
    // addNftBody.append('unlockOncePurchased', body.unlockOncePurchased);

    const res = await axios.post(
      apiConfig["createNFT"],
      addNftBody,

      {
        headers: {
          token,
        },
      }
    );
    console.log("res", res);
    return res;
    if (res.data.statusCode === 200) {
      // await placeOrderBlockchainHandler(
      //   EngineAddress,
      //   Engine,
      //   library,
      //   account,
      //   body,
      //   tokenId,
      //   res.data.result._id
      // );
    } else {
      return false;
    }
  } catch (error) {
    return false;
    console.log("error", error);
  }
};

export const placeOrderBlockchainHandler = async (
  contractAddress,
  abi,
  library,
  account,
  address,
  tokenId,
  price,
  expiryDate
) => {
  try {
    const contrsct = getContract(contractAddress, abi, library, account);
    console.log("price", price);
    console.log("expiryDate", expiryDate);
    console.log("tokenId", tokenId);
    console.log("moment(expiryDate).unix()", moment(expiryDate).unix());
    const web3 = await getWeb3Obj();
    const createOrderRes = await contrsct.createOrder(
      address,
      tokenId,
      web3.utils.toWei(price),
      moment(expiryDate).unix()
    );
    await createOrderRes.wait();
    console.log("createOrderRes", createOrderRes);

    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

export const placeOrderAPIHandler = async (
  allData,
  nftId,
  account,
  advanceSettings
) => {
  const token = sessionStorage.getItem("token");

  let body = {
    nftId: nftId,
    title: allData.title,
    details: allData.description,
    time: allData.startDate.toString(),
    startingBid: allData.startPrice,
    tokenName: allData.title,
    description: allData.description,
    royalties: allData.royalties,
    startPrice: allData.startPrice,
    price: allData.price,
    coupounAddress: allData.couponAddress,
    startTime: allData.startDate.toString(),
    endTime: allData.endTime.toString(),
    expiryTime: allData.endTime.toString(),
    currentOwner: account,
    network: allData.network,
    mediaType: allData.mediaType,
  };
  try {
    const res = await axios({
      method: "post",
      url: apiConfig["createOrder"],
      data: body,
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return false;
  }
};

export const uploadContractHandler = async (
  name,
  symbol,
  baseURI,
  collectionImage,
  account,
  cb
) => {
  const token = sessionStorage.getItem("token");

  await nfttokenContract
    .deploy({
      data: deployData,
      arguments: [name, symbol, baseURI],
    })
    .send(
      {
        from: account,
        gas: "4700000",
      },
      function (e, contract) {
        console.log("------", e, contract);
        if (
          contract &&
          contract.address &&
          typeof contract.address !== "undefined"
        ) {
          console.log(
            "Contract mined! address: " +
              contract.address +
              " transactionHash: " +
              contract.transactionHash
          );
        }
      }
    )
    .on("error", function (error) {
      console.log("ERROR", error);
      toast.error(error.message);

      return false;
    })
    .on("transactionHash", function (transactionHash) {
      console.log("transactionHash", transactionHash);
    })
    .on("receipt", async function (receipt) {
      console.log(receipt.contractAddress);

      cb(receipt.contractAddress);
    })
    .catch((error) => {
      console.log("ERROR", error);
      toast.error(error.message);

      return false;
    });
};

export const createCollectionAPIHanlder = async (
  name,
  symbol,
  baseURI,
  collectionImage,
  contractAddress,
  shortURL,
  description,
  network,
  bannerImage,
  apiEndPoint
) => {
  try {
    const token = sessionStorage.getItem("token");

    const formData = new FormData();
    formData.append("contractAddress", contractAddress);
    formData.append("displayName", name);
    formData.append("symbol", symbol);
    formData.append("shortURL", shortURL);
    formData.append("description", description);
    formData.append("collectionImage", collectionImage);
    formData.append("network", network);
    formData.append("bannerImage", bannerImage);

    const res = await axios({
      method: "post",
      url: apiConfig[apiEndPoint],
      data: formData,
      headers: {
        token,
      },
    });
    return res;
    // if (res.data.statusCode === 200) {
    //   return true;
    // } else {
    //   return false;
    // }
  } catch (error) {
    console.log("err", error);
    return false;
  }
};

export const addImageHandler = (img) => {
  const token = sessionStorage.getItem("token");

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", img);
    axios({
      method: "post",
      url: apiConfig.ipfsUpload,
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === 200) {
          resolve(res.data.result.imageUrl);
        } else {
          reject(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        reject(false);
      });
  });
};

export const getDateDiff = (endDate, startDate = new Date()) => {
  var delta = Math.abs(endDate - startDate) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = parseInt(delta % 60); // in theory the modulus is not required

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };

  // days > 0
  //   ? `+ ${days} days ${hours}h ${minutes}m ${seconds}s`
  //   : hours > 0
  //   ? `${hours}h ${minutes}m ${seconds}s`
  //   : `${minutes}m ${seconds}s`;
};

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};

export function isValidEmail(value) {
  console.log("helllooooooooooooo");
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
  return re.test(String(value).toLowerCase());
}

export function isUrlValid(userInput) {
  var res = userInput.match(
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  );
  if (res == null) return false;
  else return true;
}

export function isUrlValidTelegram(userInput) {
  var res = userInput.match(
    /https?:\/\/(t(elegram)?\.me|telegram\.org)\/([A-Za-z0-9\_]{5,32})\/?/g // eslint-disable-line no-useless-escape
  );
  if (res == null) return false;
  else return true;
}

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};
