import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';

const options = {
    collection: "fee",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        fees: { type: String },
        feesInPercentage: { type: String },
        status: { type: String, default: status.ACTIVE }
    },
    options
);

module.exports = Mongoose.model("fee", schemaDefination);

