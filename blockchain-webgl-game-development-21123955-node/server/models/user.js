import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import status from '../enums/status';
import bcrypt from 'bcryptjs';
const options = {
  collection: "user",
  timestamps: true,
};

const userModel = new Schema(
  {
    walletAddress: { type: String },
    ethAccount: {
      address: { type: String },
      privateKey: { type: String }
    },
    btcAccount: {
      address: { type: String },
      privateKey: { type: String }
    },
    tronAccount: {
      address: { type: String },
      privateKey: { type: String }
    },
    ip: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    name: { type: String },
    userName: { type: String },
    email: { type: String },
    profilePic: { type: String, default:"" },
    coverImage: { type: String, default:"" },
    coverPic: { type: String },
    bio: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    telegram: { type: String },
    countryCode: { type: String },
    mobileNumber: { type: String },
    userType: { type: String, default: userType.USER },
    socialId: { type: String },
    socialType: { type: String },
    password: { type: String },
    planType: { type: String, default: "Basic" },
    pass: { type: String },
    twoFAUrl: { type: String },
    base32: { type: String },
    otp: { type: Number },
    otpTime: { type: Number },
    otpVerification: { type: Boolean, default: false },
    deviceToken: { type: String },
    deviceType: { type: String },
    referralCode: { type: String },
    isReset: { type: Boolean },
    blockStatus: { type: Boolean, default: false },
    isUpdated: { type: Boolean, default: false },
    orderCount: { type: Number, default: 0 },
    topSaler: { type: Number, default: 0 },
    topBuyer: { type: Number, default: 0 },
    totalEarning: {
      type: Number,
      default: 0
    },
    subscriberCount: {
      type: Number,
      default: 0
    },
    profileSubscriberCount: {
      type: Number,
      default: 0
    },
    profileSubscribe: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    subscriberList: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    subscribeNft: [{
      type: Schema.Types.ObjectId,
      ref: 'nft'
    }],
    likesNft: [{
      type: Schema.Types.ObjectId,
      ref: 'nft'
    }],
    likesOrder: [{
      type: Schema.Types.ObjectId,
      ref: 'order'
    }],
    likesAuctionNft: [{
      type: Schema.Types.ObjectId,
      ref: 'auctionNft'
    }],
    likesFeed: [{
      type: Schema.Types.ObjectId,
      ref: 'audience'
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    followersCount: {
      type: Number, default: 0
    },
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    followingCount: {
      type: Number, default: 0
    },
    projectRegistration: { type: Boolean, default: false },
    collectionRegistration: { type: Boolean, default: false },
    metadataRegistration: { type: Boolean, default: false },
    status: { type: String, default: status.ACTIVE },
    logo: { type: String },
    videoURL: { type: String },
    description: { type: String },
    headerTitle: { type: String },
Permissions:{
  dasboardManagement:{type:Boolean,default:false},
  nftManagement:{type:Boolean,default:false},
  orderManagement:{type:Boolean,default:false},
  staticManagement:{type:Boolean,default:false},
  FAQsManagement:{type:Boolean,default:false},
  announcementManagement:{type:Boolean,default:false},
  subAdminManagement:{type:Boolean,default:false},
  garageManagement:{type:Boolean,default:false},
}

  },

  options
);
userModel.plugin(mongoosePaginate);
userModel.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("user", userModel);

Mongoose.model("user", userModel).find({ userType: "ADMIN" }, async (err, result) => {
  if (err) {
    console.log("DEFAULT ADMIN ERROR", err);
  }
  else if (result.length != 0) {
    console.log("Default Admin 😀 .");
  }
  else {
    let obj = {
      userType: "ADMIN",
      name: "Subhra Rai",
      countryCode: "+91",
      mobileNumber: "9978987823",
      email: "no-subhra@mobiloitte.com",
      walletAddress: "0xe8c852fb61a6350caa4a5301ecaea4f5df2eade9",
      dateOfBirth: "04/10/1999",
      gender: "Female",
      password: bcrypt.hashSync("Mobiloitte@1"),
      address: "Varansi, UP, India",
    };
    Mongoose.model("users", userModel).create(obj, async (err1, result1) => {
      if (err1) {
        console.log("DEFAULT ADMIN  creation ERROR", err1);
      } else {
        console.log("DEFAULT ADMIN Created 😀 ", result1);
      }
    });
  }
});




