
import bidModel from "../../../models/bid";


const bidServices = {

    createBid: async (insertObj) => {
        return await bidModel.create(insertObj);
    },

    findBid: async (query) => {
        return await bidModel.findOne(query);
    },

    updateBid: async (query, updateObj) => {
        return await bidModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    updateManyBid: async (orderId) => {
        return await bidModel.updateMany({ orderId: orderId }, { bidStatus: "REJECTED" }, { multi: true });
    },

    bidList: async (query) => {
        return await bidModel.find(query).populate('orderId').sort({ createdAt: -1 });
    },

    hotBidList: async (query) => {
        return await bidModel.find(query).populate([{ path: 'orderId', populate: { path: 'nftId userId collectionId' } }, { path: 'collectionId' }]).sort({ price: -1 });
    },

    bidCount: async () => {
        return await bidModel.countDocuments();
    }
}


module.exports = { bidServices };
