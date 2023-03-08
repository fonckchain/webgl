
import userModel from "../../../models/user";
import status from '../../../enums/status';
import mongoose from "mongoose";
import userType from "../../../enums/userType";



const userServices = {
  userCheck: async (userId) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { $or: [{ email: userId }, { mobileNumber: userId }] }] }
    return await userModel.findOne(query);
  },

  checkUserExists: async (mobileNumber, email) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { $or: [{ email: email }, { mobileNumber: mobileNumber }] }] }
    return await userModel.findOne(query);
  },

  emailMobileExist: async (mobileNumber, email, id) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { _id: { $ne: id } }, { $or: [{ email: email }, { mobileNumber: mobileNumber }] }] }
    return await userModel.findOne(query);
  },

  checkSocialLogin: async (socialId, socialType) => {
    return await userModel.findOne({ socialId: socialId, socialType: socialType });
  },

  userCount: async () => {
    return await userModel.countDocuments();
  },

  findCount: async (query) => {
    return await userModel.count(query);
  },

  createUser: async (insertObj) => {
    return await userModel.create(insertObj);
  },

  findUser: async (query) => {
    return await userModel.findOne(query);
  },


  findUserData: async (query) => {
    return await userModel.findOne(query);
  },


  userSubscriberList: async (query) => {
    return await userModel.find(query);
  },

  updateUser: async (query, updateObj) => {
    return await userModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  updateUserById: async (query, updateObj) => {
    return await userModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  findfollowers: async (query) => {
    return await userModel.findOne(query).populate({ path: "followers" }).select('name email profilePic followersCount followingCount');
  },

  findfollowing: async (query) => {
    return await userModel.findOne(query).populate({ path: "following" }).select('name email profilePic followersCount followingCount');
  },

  insertManyUser: async (obj) => {
    return await userModel.insertMany(obj);
  },

  paginateSearch: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
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
      sort: { createdAt: -1 },
      // select: '-ethAccount.privateKey'
    };
    return await userModel.paginate(query, options);
  },

  userCount: async () => {
    return await userModel.countDocuments();
  },


  paginateShowNftHistory: async (_id, validatedBody) => {
    let query = { nftId: _id, status: { $ne: status.DELETE } };
    const { page, limit } = validatedBody;


    // if (validatedBody.page) {
    //   query.page = validatedBody.page
    // }

    // if (validatedBody.limit) {
    //   query.limit = validatedBody.limit
    // }

    let options = {
      page: page || 1,
      limit: limit || 15,
      sort: { createdAt: -1 },
      populate: [{ path: "nftId", populate: { path: 'userId', } }, { path: 'userId' }, {
        path: 'followingUserId'
      }, { path: 'bidId', populate: { path: 'nftId' } },
      { path: 'bidId', populate: { path: 'bidderId' } }, { path: 'bidId', populate: { path: 'ownerId' } },
      { path: 'saleId', populate: { path: 'nftId', } }]
    };
    return await userModel.paginate(query, options);
  },


  userList: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { walletAddress: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } }
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
      limit: limit || 10,
      sort: { createdAt: -1 },
      select: '-ethAccount.privateKey'
    };
    return await userModel.paginate(query, options);
  },

  insertManyUser: async (obj) => {
    return await userModel.insertMany(obj);
  },

  paginateSearch: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
        { walletAddress: { $regex: search, $options: 'i' } }

      ]
    }
    if (validatedBody.status) {
      query.status = validatedBody.status
    }
    if (validatedBody.userType) {
      query.userType = validatedBody.userType
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
    return await userModel.paginate(query, options);
  },
  
  paginateSearchSubadmin: async (validatedBody) => {
    let query = {  userType: { $in: userType.SUBADMIN } };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
      ]
    }
    if (validatedBody.status) {
      query.status = validatedBody.status
    }
    if (validatedBody.userType) {
      query.userType = validatedBody.userType
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
    return await userModel.paginate(query, options);
  },

  topSaler: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    if (validatedBody.search) {
      query.$or = [
        { firstName: { $regex: validatedBody.search, $options: 'i' } },
        { lastName: { $regex: validatedBody.search, $options: 'i' } },
        { email: { $regex: validatedBody.search, $options: 'i' } },
        { mobileNumber: { $regex: validatedBody.search, $options: 'i' } },
      ]
    }
    if (validatedBody.type == "monthly") {
      var monthDateAgo = new Date(new Date() - 30 * 24 * 60 * 60 * 1000).toISOString();
      query.$and = [
        {
          updatedAt: {
            $gte: monthDateAgo
          }
        },
        {
          updatedAt: {
            $lte: new Date().toISOString()
          }
        }
      ]

    }
    if (validatedBody.type == "weekly") {
      var weekDateAgo = new Date(new Date() - 7 * 24 * 60 * 60 * 1000).toISOString();
      query.$and = [
        {
          updatedAt: {
            $gte: weekDateAgo
          }
        },
        {
          updatedAt: {
            $lte: new Date().toISOString()
          }
        }
      ]
    }
    if (validatedBody.type == "today") {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var time = today.toISOString();
      query.$and = [
        {
          updatedAt: {
            $gte: time
          }
        },
        {
          updatedAt: {
            $lte: new Date().toISOString()
          }
        }
      ]
    }
    let options = {
      page: validatedBody.page || 1,
      limit: validatedBody.limit || 15,

      sort: { topSaler: -1 }
    };
    return await userModel.paginate(query, options);
  },

  topBuyer: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    if (validatedBody.search) {
      query.$or = [
        { firstName: { $regex: validatedBody.search, $options: 'i' } },
        { lastName: { $regex: validatedBody.search, $options: 'i' } },
        { email: { $regex: validatedBody.search, $options: 'i' } },
        { mobileNumber: { $regex: validatedBody.search, $options: 'i' } },
      ]
    }
    if (validatedBody.type == "monthly") {
      var monthDateAgo = new Date(new Date() - 30 * 24 * 60 * 60 * 1000).toISOString();
      query.$and = [
        {
          updatedAt: {
            $gte: monthDateAgo
          }
        },
        {
          updatedAt: {
            $lte: new Date().toISOString()
          }
        }
      ]

    }
    if (validatedBody.type == "weekly") {
      var weekDateAgo = new Date(new Date() - 7 * 24 * 60 * 60 * 1000).toISOString();
      query.$and = [
        {
          updatedAt: {
            $gte: weekDateAgo
          }
        },
        {
          updatedAt: {
            $lte: new Date().toISOString()
          }
        }
      ]
    }
    if (validatedBody.type == "today") {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var time = today.toISOString();
      query.$and = [
        {
          updatedAt: {
            $gte: time
          }
        },
        {
          updatedAt: {
            $lte: new Date().toISOString()
          }
        }
      ]
    }
    let options = {
      page: validatedBody.page || 1,
      limit: validatedBody.limit || 15,
      sort: { topBuyer: -1 }
    };
    return await userModel.paginate(query, options);
  },

  paginateTopBuyer: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search, dayCount, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
      ]
    }
    // if (validatedBody.status) {
    //   query.status = validatedBody.status
    // }
    // if(validatedBody.userType){
    //   query.userType=validatedBody.userType
    //   }
    // if (fromDate && !toDate) {
    //   query.createdAt = { $gte: fromDate };
    // }
    // if (!fromDate && toDate) {
    //   query.createdAt = { $lte: toDate };
    // }
    // if (fromDate && toDate) {
    //   query.$and = [
    //     { createdAt: { $gte: fromDate } },
    //     { createdAt: { $lte: toDate } },
    //   ]
    // }

    let today = new Date();
    today.setHours(0, 0, 0, 0)
    var offset = (new Date().getTimezoneOffset()) * 60000;
    today = new Date(today - offset).getTime()
    var day = new Date(today)
    var month = day.getTime()
    month = month - 2592000000;
    let monthDate = new Date(month)
    var year = day.getTime()
    year = year - 2592000000 * 12;
    let yearDate = new Date(year)
    let day1 = day.getDay()
    let today1 = new Date()
    let endDay = new Date()
    endDay.setHours(23, 59, 59, 999)
    let Tommorow1 = day.setDate(day.getDate() + 1)
    let Tommorow = new Date(Tommorow1)
    let lastTommorow = Tommorow.setHours(23, 59, 59, 999)
    const futureDay = 7 - day1;
    const futureTime = futureDay * 86400000;
    const time = day1 * 86400000;
    let startTime = today - time;
    let startDate = new Date(startTime)
    let endTime = today + futureTime;
    let endDate = new Date(endTime)
    if (validatedBody.dayCount == "Daily") {
      query.$and = [{ createdAt: { $lte: endDate } }, { createdAt: { $gte: startDate } }]
    }

    if (validatedBody.dayCount == "Weekly") {

      query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: monthDate } }]
    }

    if (validatedBody.dayCount == "Monthly") {

      query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: yearDate } }]
    }
    if (validatedBody.dayCount == "  ") {
      query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: yearDate } }]
    }
    let options = {
      page: page || 1,
      limit: limit || 15,
      sort: { topBuyer: -1 }
    };
    return await userModel.paginate(query, options);
  },


  userAllDetails: async (_id) => {
    let query = { _id: mongoose.Types.ObjectId(_id), status: { $ne: status.DELETE } };
    return await userModel.aggregate([
      { $match: query },

      {
        $lookup: {
          from: "nft",
          localField: "_id",
          foreignField: "userId",
          as: "nftDetails"
        },
      },
      { $addFields: { nftCount: { $size: "$nftDetails" } } },

      {
        $lookup: {
          from: "order",
          as: "orderDetails",
          let: {
            order_id: "$_id"
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$order_id", "$userId"] },
              }
            },
            {
              $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "userId"
              }
            },
            {
              $lookup: {
                from: "nft",
                localField: "nftId",
                foreignField: "_id",
                as: "nftId"
              }
            },
            {
              $lookup: {
                from: "bid",
                localField: "_id",
                foreignField: "orderId",
                as: "bidId"
              }
            }
          ],

        }
      },
      { $addFields: { orderCount: { $size: "$orderDetails" } } },

      {
        $lookup: {
          from: "bid",
          localField: "_id",
          foreignField: "userId",
          as: "bidDetails"
        },
      },
      { $addFields: { bidCount: { $size: "$bidDetails" } } },

      {
        $lookup: {
          from: "activity",
          localField: "_id",
          foreignField: "userId",
          as: "activityDetails"
        },
      },
      { $addFields: { activityCount: { $size: "$activityDetails" } } },

      {
        $lookup: {
          from: "user",
          localField: "followers",
          foreignField: "_id",
          as: "followerDetails"
        },
      },
      { $addFields: { followerCount: { $size: "$followerDetails" } } },
    ])
  },
  dealerPaginateSearch: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE }, userType: userType.DEALER };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } }
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
      sort: { createdAt: -1 }
    };
    return await userModel.paginate(query, options);
  },



  dealerPaginateSearch: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE }, userType: userType.DEALER };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } }
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
      sort: { createdAt: -1 }
    };
    return await userModel.paginate(query, options);
  },

}

module.exports = { userServices };

