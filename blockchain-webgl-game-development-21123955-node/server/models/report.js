import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
const options = {
    collection: "report",
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
        collectionId:{
            type: schema.Types.ObjectId,
            ref: 'collection'
        },
        bidId:{
            type: schema.Types.ObjectId,
            ref: 'bid'
        },
        name:{
            type: String
        },
        artist: {
            type: String
        },
        tokenId:{
            type: Number
        },
        message: {
            type: String
        },
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        },
    },
    options
);

orderSchema.plugin(mongoosePaginate);
orderSchema.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("report", orderSchema);