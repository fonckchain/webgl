import React, { createContext, useEffect, useState } from "react";
import { injected, SUPPORTED_WALLETS } from "src/connectors";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK, TestERCContract } from "src/constants";
// import { Link, ImmutableXClient, ImmutableMethodResults } from "@imtbl/imx-sdk";
import {
  Link as ImLink,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
} from "@imtbl/imx-sdk";
import { toast } from "react-toastify";
import Web3 from "web3";

import {
  getBalanceOf,
  getContract,
  getWeb3ContractObject,
  getWeb3Obj,
  swichNetworkHandler,
} from "src/utils";
import {
  CryptoChipsContract,
  REACT_APP_ROPSTEN_ENV_URL,
  REACT_APP_ROPSTEN_LINK_URL,
} from "src/constants";
import CryptoChipsABI from "src/ABI/CryptoChipsABI.json";
import axios from "axios";
import TestERCABI from "src/ABI/TestERCABI.json";
import apiConfig from "../component/config/ApiConfig";
import { getNetworkDetails, networkList } from "src/constants";
import { ethers } from "ethers";

export const UserContext = createContext();

const setSession = (userAddress) => {
  // if (userAddress) {
  //   sessionStorage.setItem("userAddress", userAddress);
  // } else {
  //   sessionStorage.removeItem("userAddress");
  // }
};

export default function AuthProvider(props) {
  const { activate, active, account, library, deactivate, chainId } =
    useWeb3React();
  var web3 = new Web3(library?.provider);
  console.log("account", web3, account, activate);
  const [nftPrice, setNftPrice] = useState(0);
  const [hasFinalSaleStarted, setHasFinalSaleStarted] = useState(false);
  const [reservedClaimed, setReservedClaimed] = useState(1);
  const [RESERVED_NFT, setRESERVED_NFT] = useState(1);
  const [MAX_NFT_SUPPLY, setMAX_NFT_SUPPLY] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [MAX_MINT, setMAX_MINT] = useState(0);
  const [MAX_NFT_WALLET, setMAX_NFT_WALLET] = useState(0);
  const [balanceOfValue, setBalanceOfValue] = useState(0);
  const [publicSaleStartTimestamp, setPublicSaleStartTimestamp] = useState(0);
  const [adminWalletAddress, setAdminWalletAddress] = useState("");
  const [allNftList, setallNftList] = useState([]);
  const [userNFTList, setUserNFTList] = useState([]);
  const [accumulated, setAccumulated] = useState(0);
  const [isLoadingUserNFT, setIsLoadingUserNFT] = useState(false);
  const [NAME_CHANGE_PRICE, setNAME_CHANGE_PRICE] = useState(0);
  const [successMSG, setSuccessMSG] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPop, setErrorPop] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [tab, setTab] = useState("marketplace");
  const [wallet, setWallet] = useState("undefined");
  console.log("wallet", wallet);
  const [profileDetails, setProfileDetails] = useState([]);

  const [balance, setBalance] = useState();
  console.log("balance>>", balance);
  const [client, setClient] = useState("");
  //   const [marketplace, setMarketplace] = useState([]);
  // const nftCards = marketplace?.result;
  let data = {
    nftPrice,
    NAME_CHANGE_PRICE,
    isLoadingUserNFT,
    accumulated,
    balanceOfValue,
    adminWalletAddress,
    reservedClaimed,
    MAX_NFT_SUPPLY,
    totalSupply,
    RESERVED_NFT,
    MAX_MINT,
    MAX_NFT_WALLET,
    client,
    hasFinalSaleStarted,
    publicSaleStartTimestamp,
    userNFTList,
    profileDetails,
    userProfileDeatils: () => userProfileDeatils(),
    linkSetup: () => linkSetup(),
    updateUser: (account) => {
      setSession(account);
    },
    disconnectWalletHandler: () => disconnectWalletHandler(),
    connectWallet: () => {
      activate(injected, undefined, true).catch((error) => {
        if (error) {
          activate(injected);
        }
      });
    },
  };
  // console.log("updateUser", data?.updateUser);
  useEffect(() => {
    if (account && chainId) {
      if (chainId != ACTIVE_NETWORK) {
        window.scrollTo(0, 0);
        if (window.ethereum) {
          swichNetworkHandler();
        }
      }
    }
  }, [chainId, account]);

  const addNetworkHandler = async () => {
    const NetworkDetails = getNetworkDetails(chainId);
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
    }
  };
  const swichNetworkHandler = async () => {
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

  useEffect(() => {
    const userAddress = window.sessionStorage.getItem("userAddress");
    if (userAddress) {
      data.connectWallet();
    }
  }, []); //eslint-disable-line
  const walletForToken = sessionStorage.getItem("wallet");
  const connectWalletHandler = async (walletAddress) => {
    try {
      const res = await axios.post(apiConfig.connectWallet, {
        walletAddress: walletForToken ? walletForToken : wallet,
      });
      if (res.data.statusCode === 200) {
        // getProfileHandler(res.data.result.token);
        setTokenSession(res.data.result.token);
        setSuccessMSG(res.data.responseMessage);
      } else {
        deactivate();
        setIsLogin(false);
        setUserData();
        setIsLoading(false);
      }
    } catch (error) {
      deactivate();
      setIsLogin(false);
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  const setTokenSession = (token) => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  };
  useEffect(() => {
    if (wallet) {
      connectWalletHandler();
    }
  }, [wallet]);

  useEffect(() => {
    data.updateUser(account);
  }, [account]); //eslint-disable-line
  const disconnectWalletHandler = async () => {
    console.log("deactivate");
    deactivate();
    sessionStorage.removeItem("token");
    setProfileDetails([]);
  };
  const buildIMX = async () => {
    const publicApiUrl = REACT_APP_ROPSTEN_ENV_URL;
    setClient(await ImmutableXClient.build({ publicApiUrl }));
  };
  const link = new ImLink(REACT_APP_ROPSTEN_LINK_URL);

  const linkSetup = async () => {
    try {
      const res = await link.setup({});
      console.log("res>>>>", res);
      setWallet(res.address);
      setWalletSession(res.address);

      setBalanceSession(
        await client.getBalance({ user: res.address, tokenAddress: "ETH" })
      );
      await activate(injected, undefined, true).catch((error) => {
        if (error) {
          activate(injected);
        }
      });
      if (res.address) {
        const balances = await client.getBalance({
          user: res.address.toString(),
          // contractAddress: "eth",
        });
        console.log("balance<<<<,,s", balances);

        const converBalance = ethers.utils.formatEther(
          balances?.balance ? balances?.balance : balances?.imx
        );
        console.log("balances", converBalance);

        //  setBalance(client.getBalances({ user: res.address }));
        const balanceImETH = web3.utils.fromWei(balances);
        setBalance(parseFloat(balanceImETH).toFixed(2));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const userProfileDeatils = async () => {
    try {
      console.log("token=====>>>", sessionStorage.getItem("token"));
      if (sessionStorage.getItem("token")) {
        const res = await axios.get(apiConfig.adminProfile, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setProfileDetails(res.data.result);
          // setIsLoading(false);
        }
      }
    } catch (error) {
      // setIsLoading(false);
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    userProfileDeatils();
  }, []);

  // const load = async () => {
  //   setMarketplace(
  //     await client.getOrders({
  //       status: ImmutableOrderStatus?.active,
  //       user: "0xA93647C91133454fB265821334083375b12F06e5",
  //     })
  //   );
  // };
  // useEffect(() => {
  //   load();
  // }, [marketplace]);

  const setWalletSession = (wallet) => {
    if (wallet) {
      sessionStorage.setItem("wallet", wallet);
    } else {
      sessionStorage.removeItem("wallet");
    }
  };

  const setBalanceSession = (balance) => {
    if (balance) {
      sessionStorage.setItem("balance", balance?.balance?.toString());
    } else {
      sessionStorage.removeItem("balance");
    }
  };
  useEffect(() => {
    buildIMX();
  }, []);

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
