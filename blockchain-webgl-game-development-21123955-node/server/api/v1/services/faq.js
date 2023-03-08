
import faqModel from "../../../models/faq";
import status from "../../../enums/status";


const faqServices = {

    createFAQ: async (insertObj) => {
        return await faqModel.create(insertObj);
    },

    findFAQ: async (query) => {
        return await faqModel.findOne(query);
    },

    updateFAQ: async (query, updateObj) => {
        return await faqModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    FAQListwithoutPagination: async () => {
        return await faqModel.find({});
    },

    FAQList: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        const { page, limit } = validatedBody;
        if (page) {
            query.page = page
        }
        if (limit) {
            query.limit = limit
        }
        let options = {
            page: page || 1,
            limit: limit || 10,
            sort: { createdAt: -1 },
            //   populate: [{ path: 'userId' }, { path: 'collectionId' }]
        };
        return await faqModel.paginate(query, options);
    },

}

module.exports = { faqServices };
