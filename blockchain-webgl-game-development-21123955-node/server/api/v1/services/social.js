import socialModel from  "../../../models/socialModel"
import status from '../../../enums/status';

const socialServices={
    createSocialLinks: async (insertObj) => {
        return await socialModel.create(insertObj);
    },
    findSocial: async (query) => {
        console.log("service =====",query);
        return await socialModel.findOne(query);
    },
    updateSocialById: async (query, updateObj) => {
        return await socialModel.findByIdAndUpdate(query, updateObj, { new: true });
    },
    socialList: async () => {
        return await socialModel.find({}).sort({ createdAt: -1 })
    },
}

module.exports = { socialServices };
