import requestModel from  "../../../models/requestModel"
import status from '../../../enums/status';

const requestServices={
    createRequest: async (insertObj) => {
        return await requestModel.create(insertObj);
    },
    findRequest: async (query) => {
        return await requestModel.findOne(query);
    },
    updateRequestById: async (query, updateObj) => {
        return await requestModel.findByIdAndUpdate(query, updateObj, { new: true });
    },
    requestList: async () => {
        return await requestModel.find({}).sort({ createdAt: -1 })
    },
}

module.exports = { requestServices };