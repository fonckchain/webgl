import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import status from '../enums/status';
import number from "joi/lib/types/number";
import { toString } from "qrcode";
const options = {
    collection: "nft",
    timestamps: true
};
const schema = Mongoose.Schema;
var nftSchema = new schema(
    {
        token_id: { type: String },
        walletAddress: { type: String },
        order_id: { type: Number },
        user: { type: String },
        sell: {
            type: {
                type: String
            },

            data: {
                token_id: { type: String },
                id: { type: String },
                token_address: { type: String },
                quantity: {
                    type: { type: String },
                    hex: { type: String }
                },
                properties: {
                    name: { type: String },
                    image_url: { type: String },
                    collection: {
                        name: { type: String },
                        icon_url: { type: String }
                    }
                }
            },

        },
        buy: {
            type: { type: String },
            data: {
                token_address: { type: String },
                decimals: { type: Number },
                quantity: {
                    type: { type: String },
                    hex: { type: String },
                }
            }
        },
        amount_sold: { type: String },
        expiration_timestamp: { type: Date },
        timestamp: { type: Date },
        updated_timestamp: { type: Date },
        isBuy: {
            type: Boolean,
            default: false
        }
    },
    options
);

nftSchema.plugin(mongoosePaginate);
nftSchema.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("nft", nftSchema);






