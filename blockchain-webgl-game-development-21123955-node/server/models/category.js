import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import status from '../enums/status';
var mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const schema = Mongoose.Schema;
var categorySchema = new schema({

    categoryTitle: {
        type: String
    },
    categoryIcon: {
        type: String,
        default: ""
    },
    status: { type: String, default: status.ACTIVE }
}, { timestamps: true }
);

categorySchema.plugin(mongoosePaginate);
categorySchema.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("category", categorySchema);