import dealerModel from '../../../models/dealersModel'
import status from '../../../enums/status';




const dealerServices = {

  createDealer: async (insertObj) => {
    return await dealerModel.create(insertObj);
  },

  findDealer: async (query) => {
    return await dealerModel.findOne(query);
  },

  updateDealerById: async (query, updateObj) => {
    return await dealerModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  dealerList: async () => {
    return await dealerModel.find({});
},

  paginateSearchDealer: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { fromDate, toDate, page, limit } = validatedBody;
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
    return await dealerModel.paginate(query, options);
  },

}

module.exports = { dealerServices };
