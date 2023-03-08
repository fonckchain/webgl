import { ACTIVE_NETWORK, NetworkDetails, RPC_URL } from "src/constants";
import { Contract } from "@ethersproject/contracts";
import Web3 from "web3";
import { toast } from "react-toastify";

export function sortAddress(add) {
  const sortAdd = `${add?.slice(0, 6)}...${add?.slice(add.length - 4)}`;
  return sortAdd;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export const getWeb3Provider = async () => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  return httpProvider;
};

export const getWeb3Obj = async () => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = await new Web3(httpProvider);
  return web3;
};

export const getWeb3ContractObject = async (abi, contractAddress) => {
  const web3 = await getWeb3Obj();
  const contract = await new web3.eth.Contract(abi, contractAddress);
  return contract;
};

export const getBalanceOf = async (abi, address, account) => {
  try {
    const contract = await getWeb3ContractObject(abi, address);
    const balanceOf = await contract.methods.balanceOf(account).call();
    return balanceOf.toString();
  } catch (error) {
    console.log("ERROR", error);

    return 0;
  }
};

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

export function copyTextByID(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  toast.info(`Copied ${copyText.value}`);
}

export const swichNetworkHandler = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + ACTIVE_NETWORK.toString(16) }],
    });
  } catch (error) {
    console.log("ERROR", error);
    if (error.code === 4902) {
      addNetworkHandler();
    }
  }
};

export const addNetworkHandler = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: NetworkDetails,
    });
  } catch (error) {
    console.log("ERROR", error);
  }
};
