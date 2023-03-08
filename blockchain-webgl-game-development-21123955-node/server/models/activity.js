import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from '../enums/status';
const options = {
    collection: "activity",
    timestamps: true
};
const schema = Mongoose.Schema;
var activityModel = new Schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    receiverId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    collectionId: {
        type: schema.Types.ObjectId,
        ref: "collection"
    },
    nftId: {
        type: schema.Types.ObjectId,
        ref: "nft"
    },
    orderId: {
        type: schema.Types.ObjectId,
        ref: "order"
    },
    bidId: {
        type: schema.Types.ObjectId,
        ref: "bid"
    },
    followerId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ["CREATE_COLLECTION", "NFT_CREATE", "SEND_NFT", "SEND_ORDER", "ORDER_CREATE", "BID_CREATE", "FOLLOW", "UNFOLLOW", "LIKE", "DISLIKE", "ORDER_SELL"]
    },
    status: { type: String, default: status.ACTIVE },
},
    options
);

activityModel.plugin(mongoosePaginate);
activityModel.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("activity", activityModel);