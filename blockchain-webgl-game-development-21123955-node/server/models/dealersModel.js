import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";

const options = {
    collection: "dealer",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        dealerName:{type:String},
        dealerTitle: { type: String },
        dealerDescription:{type:String},
        logo:{type: String},
        YTLink:{type: String},
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate)
module.exports = Mongoose.model("dealer", schemaDefination);

