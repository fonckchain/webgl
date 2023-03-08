import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
const options = {
    collection: "blackmarketdata",
    timestamps: true
};
const schema = Mongoose.Schema;
var blackMarketSchema = new schema(
    {
        token_address: { type: String },
        token_id: { type: String },
        id: { type: String },
        user: { type: String },
        status: { type: String },
        uri: { type: String },
        name: { type: String },
        description: { type: String },
        image_url: { type: String },
        metadata: {
            name: { type: String },
            image: { type: String },
            image_url: { type: String },
            description: { type: String },
        },
        collectionDetails: {
            name: { type: String },
            icon_url: { type: String }
        },
        orders: {
            sell_orders: [{
                order_id: { type: Number },
                user: { type: String },
                status: { type: String },
                buy_quantity: {
                    type: { type: String },
                    hex: { type: String }
                },
                buy_decimals: { type: Number }
            }],
        },
        created_at: { type: Date },
        updated_at: { type: Date },

    },
    options
);

blackMarketSchema.plugin(mongoosePaginate);
blackMarketSchema.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("blackmarketdata", blackMarketSchema);


