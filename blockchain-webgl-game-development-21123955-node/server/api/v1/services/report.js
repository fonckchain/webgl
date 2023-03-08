import reportModel from "../../../models/report";
import status from '../../../enums/status';

const reportServices = {

  createreport: async (insertObj) => {
    return await reportModel.create(insertObj);
  },

  findReport: async (query) => {
    return await reportModel.findOne(query);
  },

  checkReport: async (userId) => {
    let query = { $and: [{ status: { $ne: status.DELETE }, userId: userId }] };
    return await reportModel.findOne(query);
  },

  updateReportById: async (query, updateObj) => {
    return await reportModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  checkReportExists: async (tokenId, userId) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { tokenId: tokenId, userId: userId }] }
    return await reportModel.findOne(query);
  },

  paginateSearchReport: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } }
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
    return await reportModel.paginate(query, options);
  }

}

module.exports = { reportServices };