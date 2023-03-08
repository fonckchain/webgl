import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import string from "joi/lib/types/string";
const options = {
    collection: "request",
    timestamps: true
};
const schema = Mongoose.Schema;
var requestSchema = new schema(
    {
        dealerId: {
            type: schema.Types.ObjectId,
            ref: 'user'
        },
        name:{
            type:String
        },
        company_name:{
            type:String
        },
        contact_email:{
            type:String
        },
        description:{
            type:String
        },
        owner_public_key:{
            type:String
        },
        contract_address:{
            type:String
        },
        metadata_api_url:{
            type:String
        },
        icon_url:{
            type:String
        },
        collection_image_url:{
            type:String
        },
        image_url:{
            type:String
        },
        image:{
            type:String
        },
        animation_url:{
            type:String
        },
        animation_url_mime_type:{
            type:String
        },
        youtube_url:{
            type:String
        },
        walletAddress:{
            type:String
        },
        requestType:{
            type: String,
            enum: ["PROJECT_REGISTRATION", "COLLECTION_REGISTRATION", "METADATA_REGISTRATION"],
            default: "PROJECT_REGISTRATION"
        },
        requestStatus:{
            type: String,
            enum: ["APPROVED", "REJECTED", "PENDING"],
            default: "PENDING"
        },
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        },
    },
    options
);

requestSchema.plugin(mongoosePaginate);
requestSchema.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("request", requestSchema);