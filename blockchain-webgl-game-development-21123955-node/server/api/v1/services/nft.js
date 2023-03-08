
import nftModel from "../../../models/nft";
import status from '../../../enums/status';
import mongoose from "mongoose";

const nftServices = {

  createNft: async (insertObj) => {
    return await nftModel.insertMany(insertObj);
  },

  findNft: async (query) => {
    return await nftModel.findOne(query);
  },

  findAll: async (query) => {
    return await nftModel.find(query);
  },

  findNftWithPopulateDetails: async (id, userId) => {
    let query = { _id: mongoose.Types.ObjectId(id), status: { $ne: status.DELETE } }
    return await nftModel.aggregate([
      { $match: query },
      {
        $addFields: {
          "isLike": {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(userId), "$likesUsers"] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
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
                $expr: { $eq: ["$$order_id", "$nftId"] },
              }
            }, {
              $lookup: {
                from: "bid",
                localField: "_id",
                foreignField: "orderId",
                as: "bidDetails"
              }
            }
          ],
        }
      }
    ])
  },

  updateNft: async (query, updateObj) => {
    return await nftModel.findOneAndUpdate(query, updateObj, { new: true });
  },
  updateNftbyId: async (query, updateObj) => {
    return await nftModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  nftList: async (userId) => {
    return await nftModel.aggregate([
      { $match: { userId: userId, status: { $ne: status.DELETE } } },
      {
        $addFields: {
          "isLike": {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(userId), "$likesUsers"] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $lookup: {
          from: "order",
          localField: "orderId",
          foreignField: "_id",
          as: "orderDetails"
        }
      },
      {
        $lookup: {
          from: "bid",
          localField: "bidId",
          foreignField: "_id",
          as: "bidDetails"
        }
      }
    ])
  },

  findNftLike: async (userId, validatedBody) => {
    console.log("fdfdfffferersfs>>>>>>>>>>>>>>>>>>>>::::::::::::::::::::::", userId, validatedBody)
    let query = { likesUsers: { $in: [userId] }, status: { $ne: status.DELETE } };
    console.log("fdfsfs=========================", query)
    const { search, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { tokenId: { $regex: search, $options: 'i' } },
        { contractAddress: { $regex: search, $options: 'i' } },
        { tokenName: { $regex: search, $options: 'i' } },
      ]
    }
    let options = {
      page: page || 1,
      limit: limit || 10,
      sort: { createdAt: -1 },
      populate: [{ path: 'userId' }, { path: 'collectionId' }]
    };
    return await nftModel.paginate(query, options);
  },

  nftListWithSearch: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } }
    if (validatedBody.itemCategory) {
      query.itemCategory = { $in: validatedBody.itemCategory }
    }
    if (validatedBody.network) {
      query.network = { $in: validatedBody.network }
    }
    let options = {
      page: validatedBody.page || 1,
      limit: validatedBody.limit || 10,
      sort: { createdAt: -1 },
      populate: [{ path: 'userId' }, { path: 'collectionId' }]

    };
    return await nftModel.paginate(query, options);

  },

  nftPaginateSearch: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
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
      limit: limit || 10,
      sort: { createdAt: -1 }
    };
    return await nftModel.paginate(query, options);
  },

  nftCount: async () => {
    return await nftModel.countDocuments();
  },

  listAllNft: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search } = validatedBody;
    if (search) {
      query.$or = [
        { tokenId: { $regex: search, $options: 'i' } },
        { bundleTitle: { $regex: search, $options: 'i' } },
        { bundleName: { $regex: search, $options: 'i' } },
        { contractAddress: { $regex: search, $options: 'i' } },
        { tokenName: { $regex: search, $options: 'i' } },
      ]
    }
    return await nftModel.find(query).populate("userId collectionId");
  },

  nftListWithAggregatePipeline: async (validatedBody, userId) => {
    let query = { userId: userId, status: { $ne: status.DELETE } };
    const { search } = validatedBody;
    if (search) {
      query.$or = [
        { tokenId: { $regex: search, $options: 'i' } },
        { tokenName: { $regex: search, $options: 'i' } },
      ]
    }
    return await nftModel.aggregate([
      { $match: query },
      {
        $addFields: {
          "isLike": {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(userId), "$likesUsers"] },
              then: true,
              else: false
            }
          }
        }
      },
      // {
      //   $lookup: {
      //     from: "user",
      //     localField: "userId",
      //     foreignField: "_id",
      //     as: "userId"
      //   }
      // },

      {
        $lookup: {
          from: "collection",
          localField: "collectionId",
          foreignField: "_id",
          as: "collectionId"
        }
      },
      // {
      //   $lookup: {
      //     from: "order",
      //     as: "orderDetails",
      //     let: {
      //       order_id: "$_id"
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: { $eq: ["$$order_id", "$nftId"] },
      //         }
      //       }, {
      //         $lookup: {
      //           from: "bid",
      //           localField: "_id",
      //           foreignField: "orderId",
      //           as: "bidDetails"
      //         }
      //       }
      //     ],
      //   }
      // },

    ])
  },

  nftListWithAggregatePipelineForAll: async (validatedBody, userId) => {
    let query = { status: { $ne: status.DELETE } };
    const { search } = validatedBody;
    if (search) {
      query.$or = [
        { tokenId: { $regex: search, $options: 'i' } },
        { bundleTitle: { $regex: search, $options: 'i' } },
        { bundleName: { $regex: search, $options: 'i' } },
        { contractAddress: { $regex: search, $options: 'i' } },
        { tokenName: { $regex: search, $options: 'i' } },
      ]
    }
    return await nftModel.aggregate([
      { $match: query },
      {
        $addFields: {
          "isLike": {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(userId), "$likesUsers"] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
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
                $expr: { $eq: ["$$order_id", "$nftId"] },
              }
            }, {
              $lookup: {
                from: "bid",
                localField: "_id",
                foreignField: "orderId",
                as: "bidDetails"
              }
            }
          ],
        }
      },
    ])
  },

  multiUpdate: async (updateObj) => {
    return await nftModel.updateMany({}, updateObj, { multi: true });
  },

  nftCollectionList: async () => {
    let data = await nftModel.aggregate([
      { $group: { _id: { name: '$sell.data.properties.collection.name', icon_url: '$sell.data.properties.collection.icon_url' }, numberOfData: { $sum: 1 } } },
    ])
    return data.map((i) => {
      return {
        collection: i._id,
        numberOfData: i.numberOfData
      }
    });
  },

  collectionNftSearch: async (search) => {
    return await nftModel.find({ "sell.data.properties.collection.name": { $in: search } });

  },

}

module.exports = { nftServices };
