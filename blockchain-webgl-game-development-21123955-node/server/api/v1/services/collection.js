import collectionModel from "../../../models/collection";
import nftModel from "../../../models/nft";
import status from '../../../enums/status';

const collectionServices = {

    createCollection: async (insertObj) => {
        return await collectionModel.insertMany(insertObj);
    },

    findCollection: async (query) => {
        return await collectionModel.findOne(query);
    },

    updateCollection: async (query, updateObj) => {
        console.log("===15==",query,updateObj)
        return await collectionModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    collectionList1: async (query) => {
        return await collectionModel.find(query);
    },
    collectionList: async () => {
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

    collectionListWithPopulate: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        if (validatedBody.collection) {
            query._id = { $in: validatedBody.collection }
        }
        let options = {
            page: validatedBody.page || 1,
            limit: validatedBody.limit || 10,
            sort: { createdAt: -1 },
            populate: { path: 'userId' }
        };
        return await collectionModel.paginate(query, options);
    },

    collectionPaginateSearch: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        const { search, fromDate, toDate, page, limit } = validatedBody;
        if (search) {
            query.$or = [
                { contractAddress: { $regex: search, $options: 'i' } },
                { displayName: { $regex: search, $options: 'i' } },
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
        return await collectionModel.paginate(query, options);
    },

    myCollectionPaginateSearch: async (validatedBody, userId) => {
        let query = { $and: [{ status: { $ne: status.DELETE } }, { $or: [{ userId: userId }] }] }
        const { search, fromDate, toDate, page, limit } = validatedBody;
        if (search) {
            query.$or = [
                { contractAddress: { $regex: search, $options: 'i' } },
                { displayName: { $regex: search, $options: 'i' } },
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
            sort: { createdAt: -1, topCollection: -1 }
        };
        return await collectionModel.paginate(query, options);
    },

    collectionListWithPopulate: async (query) => {
        return await collectionModel.find(query).populate('userId');
    }
}

module.exports = { collectionServices };
