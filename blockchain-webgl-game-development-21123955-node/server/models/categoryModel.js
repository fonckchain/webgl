import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";

const options = {
    collection: "category",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        categoryName: { type: String },
        categoryImage:{type: String},
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate)
module.exports = Mongoose.model("category", schemaDefination);
