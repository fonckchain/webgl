import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
const options = {
    collection: "order",
    timestamps: true
};
const schema = Mongoose.Schema;
var orderSchema = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: 'user'
        },
        nftId: {
            type: schema.Types.ObjectId,
            ref: 'nft'
        },
        collectionId: {
            type: schema.Types.ObjectId,
            ref: 'collection'
        },
        // bidId: [{
        //     type: schema.Types.ObjectId,
        //     ref: 'bid'
        // }],
        likesUsers: [{
            type: schema.Types.ObjectId,
            ref: 'user'
        }],
        buyerId: {
            type: schema.Types.ObjectId,
            ref: 'user'
        },
        sellerId: {
            type: schema.Types.ObjectId,
            ref: 'user'
        },
        network: {
            type: String
        },
        likesCount: {
            type: Number
        },
        description: {
            type: String
        },
        tokenId: {
            type: String
        },
        itemCategory: {
            type: String
        },
        mediaUrl: {
            type: String
        },
        details: {
            type: String
        },
        time: {
            type: String
        },
        startingBid: {
            type: String
        },
        tokenName: {
            type: String
        },
        description: {
            type: String
        },
        royalties: {
            type: String
        },
        startPrice: {
            type: String
        },
        price: {
            type: Number
        },
        coupounAddress: {
            type: String
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
        },
        expiryTime: {
            type: String
        },
        currentOwner: {
            type: String
        },
        bidCount: {
            type: Number, default: 0
        },
        saleType: {
            type: String,
            enum: ["ONSALE", "OFFSALE"],
            default: "ONSALE"
        },
        sellStatus: { type: String },
        orderType: {
            type: String,
            enum: ["FIXED_PRICE", "TIMED_AUCTION", "BID", "NONE"],
            default: "NONE"
        },
        marketType: {
            type: String,
            enum: ["DEALER", "BLACK_MARKET"],
            default: "DEALER"
        },
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        }
    },
    options
);

orderSchema.plugin(mongoosePaginate);
orderSchema.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("order", orderSchema);
