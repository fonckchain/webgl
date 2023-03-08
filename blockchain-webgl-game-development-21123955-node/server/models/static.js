import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';

const options = {
    collection: "static-content",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        type: { type: String },
        title: { type: String },
        description: { type: String },
        status: { type: String, default: status.ACTIVE }
    },
    options
);

module.exports = Mongoose.model("static-content", schemaDefination);

Mongoose.model("static-content", schemaDefination).find({}, (err, result) => {
    if (err) {
        console.log("Default static content error", err);
    }
    else if (result.length != 0) {
        console.log("Default static content");
    }
    else {
        var obj1 = {
            type: "termsConditions",
            title: "Terms & Conditions",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget"
        };
        var obj2 = {
            type: "privacyPolicy",
            title: "Privacy Policy",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget."
        };
        var obj3 = {
            type: "aboutUs",
            title: "About Us",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.",
        };


        Mongoose.model("static-content", schemaDefination).create(obj1, obj2, obj3, (staticErr, staticResult) => {
            if (staticErr) {
                console.log("Static content error.", staticErr);
            }
            else {
                console.log("Static content created.", staticResult)
            }
        })
    }
})

