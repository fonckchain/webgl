import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";

const options = {
    collection: "team",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        name:{type: String},
        title: { type: String },
        profileImage:{type: String},
        socialLink:{type:String},
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate)
module.exports = Mongoose.model("team", schemaDefination);

