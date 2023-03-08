let baseurl = "https://node-webglgame.mobiloitte.com";
// let baseurl = "http://172.16.1.172:1890";
let user = `${baseurl}/api/v1/user`;
let admin = `${baseurl}/api/v1/admin`;
const url = `${baseurl}/api/v1`;

let nft = `${baseurl}/api/v1/nft`;

let market = `${baseurl}/api/v1/market`;

// export const socketURL = "wss://node-nft-xavier.mobiloitte.com";

const apiConfig = {
  // ADMIN
  addDealer: `${admin}/addDealer`,
  listDealer: `${admin}/listDealer`,
  adminProfile: `${admin}/adminProfile`,
  listCategory: `${admin}/listCategory`,

  // MARKET

  addBlackMarket: `${market}/addBlackMarket`,
  listBlackMarket: `${market}/listBlackMarket`,
  viewBlackMarketData: `${market}/viewBlackMarketData`,
  updateAdminProfile: `${admin}/updateAdminProfile`,

  //USER
  connectWallet: `${user}/connectWallet`,
  updateProfile: `${user}/updateProfile`,
  createCollection: `${user}/createCollection`,
  listCollection: `${user}/listCollection`,
  myCollection: `${user}/myCollection`,
  userList: `${user}/userList`,
  allNftList: `${user}/allNftList`,
  following: `${user}/following`,
  createReports: `${user}/createReports`,
  viewFeesUser: `${user}/viewFeesUser`,
  viewCollection: `${user}/viewCollection`,
  verifyAccount: `${user}/verifyAccount`,
  verifyOTP: `${user}/verifyOTP`,
  projectRegistrationRequest: `${user}/projectRegistrationRequest`,
  collectionRequest: `${user}/collectionRequest`,
  metadataRequest: `${user}/metadataRequest`,

  //NFT
  uploadNFT: `${nft}/uploadNFT`,
  ipfsUpload: `${nft}/ipfsUpload`,
  addNft: `${nft}/addNft`,
  nftCollectionList: `${nft}/nftCollectionList`,
  collectionNftSearch: `${nft}/collectionNftSearch`,
  nft: `${nft}/nft/`,
  placeOrder: `${nft}/placeOrder`,
  orderlist: `${nft}/orderlist`,
  allOrderList: `${nft}/allOrderList`,
  allNftList: `${nft}/allNftList`,
  likeDisLikeNft: `${nft}/likeDisLikeNft`,
  placeOrderlistById: `${nft}/placeOrderlistById`,
  sellOrder: `${nft}/sellOrder`,
  placeBid: `${nft}/placeBid`,
  profileUser: `${nft}/profileUser`,
  userFollowingCount: `${nft}/userFollowingCount`,
  userFollowerCount: `${nft}/userFollowerCount`,
  userLikesCount: `${nft}/userLikesCount`,
  userCreatedCount: `${nft}/userCreatedCount`,
  userOwendCount: `${nft}/userOwendCount`,
  userOnSaleCount: `${nft}/userOnSaleCount`,
  followingUserOrderList: `${nft}/followingUserOrderList`,
  allbidList: `${nft}/allbidList`,
  hotBidList: `${nft}/hotBidList`,
  hotCollectionList: `${nft}/hotCollectionList`,
  topBuyerList: `${nft}/topBuyerList`,
  topSalerList: `${nft}/topSalerList`,
  showActivity: `${nft}/showActivity`,
  showNftHistory: `${nft}/showNftHistory`,
  listPromoteNftUser: `${nft}/listPromoteNftUser`,
  listPromoteOrderUser: `${nft}/listPromoteOrderUser`,
  nftSoldCount: `${nft}/nftSoldCount`,
  createOrderReports: `${nft}/createOrderReports`,
  nftlistbyCollectionId: `${nft}/nftlistbyCollectionId`,
  readNotification: `${url}/notification/readNotification`,
  removeFromSale: `${nft}/removeFromSale`,
  // removeFromSale: `${nft}/removeFromSale`,
};

export default apiConfig;
