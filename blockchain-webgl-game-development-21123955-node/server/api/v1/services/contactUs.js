import contactUsModel from "../../../models/contactUsModel"

const contactUsServices = {
    createContactUs: async (insertObj) => {
        return await contactUsModel.create(insertObj);
    },
    findContactUs: async (query) => {
        return await contactUsModel.findOne(query);
    },
    updateContactUs: async (query, updateObj) => {
        return await contactUsModel.findOneAndupdate(query, updateObj, { new: true });
    },
    contactUsList: async () => {
        return await contactUsModel.find({})
    },
}

module.exports = { contactUsServices };
