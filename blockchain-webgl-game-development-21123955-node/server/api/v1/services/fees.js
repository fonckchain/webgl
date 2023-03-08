
import feesModel from "../../../models/fees";
import status from '../../../enums/status';

const feesServices = {

    createFees: async (insertObj) => {
        return await feesModel.create(insertObj);
    },

    findFees: async (query) => {
        return await feesModel.findOne(query);
    },

    updateFees: async (query, updateObj) => {
        return await feesModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    updateFeesById: async (query, updateObj) => {
        return await feesModel.findByIdAndUpdate(query, updateObj, { new: true });
    },

    feesList: async () => {
        return await feesModel.find({});
    }

}

module.exports = { feesServices };
