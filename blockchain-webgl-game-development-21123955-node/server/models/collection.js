import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import status from '../enums/status';
import bcrypt from 'bcryptjs';
import number from "joi/lib/types/number";
import array from "joi/lib/types/array";

const options = {
//   collection: "collection",
  timestamps: true,
  supressReservedKeysWarning: true 

};
const schema = Mongoose.Schema;
var collectionModel = new Schema(

    {
     
    userId: {
      type: schema.Types.ObjectId,
      ref: 'user'
    },
    contractAddress: {
      type: String
    },
    displayName: {
      type: String
    },
    symbol: {
      type: String
    },
    topCollection: {
      type: Number,
      default: 0
    },
    shortURL: {
      type: String
    },
    network: {
      type: String
    },
    description: {
      type: String
    },
    collectionImage: {
      type: String,
      default: ""
    },
    bannerImage: {
      type: String,
      default: ""
    },
    categoryType: {
      type: String
    },
    placeNftCount: {
      type: Number, default: 0
    },
    collectionType: {
      type: String,
      enum: ["DEFAULT", "REGULAR"],
      default: "DEFAULT"
    },




    userType: { type: String, default: userType.USER },
    status: { type: String, default: status.ACTIVE },
  },
  options
);

collectionModel.plugin(mongoosePaginate);
collectionModel.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("collection", collectionModel);












