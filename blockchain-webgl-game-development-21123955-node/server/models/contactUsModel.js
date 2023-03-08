import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';

const options = {
    collection: "contactUs",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        email: { type: String },
        mobileNumber: { type: String },
        address: {type:String},
        status: { type: String, default: status.ACTIVE }
    },
    options
);

module.exports = Mongoose.model("contactUs", schemaDefination);
