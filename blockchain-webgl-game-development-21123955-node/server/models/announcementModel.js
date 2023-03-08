import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from "../enums/status";

const options = {
    collection: "announcement",
    timestamps: true
};
const schema = Mongoose.Schema;
var announcementModel = new Schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },

    replyFeedback: [
        {
            userId: {
                type: schema.Types.ObjectId,
                ref: 'user'
            },
            reply: {
                type: String
            }
          
        }
    ],

    status: { type: String, default: status.ACTIVE }




},
    options
);
announcementModel.plugin(mongoosePaginate);
announcementModel.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("announcement", announcementModel)

