import Mongoose, { Schema } from "mongoose";
import status from "../enums/status";

const options = {
    Collection: "social",
    timestamps: true

}
const schemaDefination = new Schema(
    {
        socialName: {
            type: String,
            default: ""
        },
        socialLink:{
            type:String
        },
        status: { type: String, default: status.ACTIVE }
    },
    options
);

module.exports = Mongoose.model("social", schemaDefination)