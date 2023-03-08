
import activityModel from "../../../models/activity";
import status from '../../../enums/status';

const activityServices = {

  createActivity: async (insertObj) => {
    return await activityModel.create(insertObj);
  },

  findActivity: async (query) => {
    return await activityModel.findOne(query);
  },

  updateActivity: async (query, updateObj) => {
    return await activityModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  activityList: async () => {
    return await activityModel.find({});
  },

  paginateUserOwendActivities: async (userId, validatedBody) => {
    let query = { userId: userId, status: { $ne: status.DELETE } };
    const { page, limit } = validatedBody;
    if (validatedBody.page) {
      query.page = validatedBody.page
    }
    if (validatedBody.limit) {
      query.limit = validatedBody.limit
    }
    let options = {
      page: page || 1,
      limit: limit || 15,
      sort: { createdAt: -1 },
      populate: [{ path: "nftId", populate: { path: 'userId', } }, { path: 'userId' }, { path: 'followingUserId' }]
    };
    return await activityModel.paginate(query, options);
  },

  paginateActivity: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tokenId: { $regex: search, $options: 'i' } },
      ]
    }
    if (validatedBody.status) {
      query.status = validatedBody.status
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
      sort: { createdAt: -1 },
      populate: { path: "_id nftId" }
    };
    return await activityModel.paginate(query, options);
  },

  paginateUserOwendActivity: async (validatedBody) => {
    const { _id, search, type, page, limit } = validatedBody;
    let query = { status: { $ne: status.DELETE } };
    if (_id) {
      query.userId = _id;
    }
    if (type) {
      query.type = { $in: type };
    }
    if (search) {
      query.type = { $regex: search, $options: 'i' }
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 15,
      sort: { createdAt: -1 },
      populate: [{ path: "nftId", populate: { path: 'userId', } },
      { path: 'userId' },
      { path: 'followerId' },
      { path: 'bidId', populate: { path: 'nftId' } },
      { path: 'collectionId', populate: { path: 'userId', } },
      {
        path: 'orderId', populate: { path: 'nftId' }
      }]
    };
    return await activityModel.paginate(query, options);
  }


}

module.exports = { activityServices };
