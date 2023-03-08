import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';

const options = {
    collection: "transaction",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        nftId: {
            type: Schema.Types.ObjectId,
            ref: 'nft'
        },
        description: { type: String },
        transactionStatus: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], default: "SUCCESS" },
        transactionType: { type: String },
        status: { type: String, default: status.ACTIVE }
    },
    options
);

module.exports = Mongoose.model("transaction", schemaDefination);

