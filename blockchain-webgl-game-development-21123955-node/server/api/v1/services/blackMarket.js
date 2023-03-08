
import blackMarketModel from "../../../models/blackmarket";


const blackMarketServices = {

    createBlackMarket: async (insertObj) => {
        return await blackMarketModel.create(insertObj);
    },

    findBlackMarket: async (query) => {
        return await blackMarketModel.findOne(query);
    },

    updateBlackMarket: async (query, updateObj) => {
        return await blackMarketModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    blackMarketList: async () => {
        return await blackMarketModel.find({});
    },
    blackMarketListWithPaginate: async (validatedBody) => {
        let query = {   };
        const { search, fromDate, toDate, page, limit } = validatedBody;
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { symbol: { $regex: search, $options: 'i' } },
            { categoryType: { $regex: search, $options: 'i' } }
          ]
        }
        if (fromDate && !toDate) {
          query.createdAt = { $gte: fromDate };
        }
        if (!fromDate && toDate) {
          query.createdAt = { $lte: toDate };
        }
        if (fromDate && toDate) {
          query.$and = [
            { createdAt: { $gte: fromDate } },
            { createdAt: { $lte: toDate } },
          ]
        }
        let options = {
          page: page || 1,
          limit: limit || 15,
          sort: { createdAt: -1 }
        };
        return await blackMarketModel.paginate(query, options);
    },





}

module.exports = { blackMarketServices };
