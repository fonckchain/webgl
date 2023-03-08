import bannerModel from '../../../models/bannerModel'
import status from '../../../enums/status';




const bannerServices = {

  createBanner: async (insertObj) => {
    return await bannerModel.create(insertObj);
  },

  findBanner: async (query) => {
    return await bannerModel.findOne(query);
  },

  updateBannerById: async (query, updateObj) => {
    return await bannerModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  bannerList: async () => {
    return await bannerModel.find({});
},

  paginateSearchBanner: async (validatedBody) => {
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
    return await bannerModel.paginate(query, options);
  },

}

module.exports = { bannerServices };
