
import categoryModel from "../../../models/category";
import status from '../../../enums/status';

const categoryServices = {

  createCategory: async (insertObj) => {
    return await categoryModel.create(insertObj);
  },

  findCategory: async (query) => {
    return await categoryModel.findOne(query);
  },

  categoryCheck: async (userId) => {
    let query = { $and: [{ status: { $ne: status.DELETE }, categoryTitle: userId }] };
    return await categoryModel.findOne(query);
  },

  updateCategory: async (query, updateObj) => {
    return await categoryModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  emailMobileExist: async (categoryTitle, id) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { _id: { $ne: id } }, { categoryTitle: categoryTitle }] }
    return await userModel.findOne(query);
  },

  updateCategoryById: async (query, updateObj) => {
    return await categoryModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  paginateCategory: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { categoryTitle: { $regex: search, $options: 'i' } },
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
    return await categoryModel.paginate(query, options);
  }

}

module.exports = { categoryServices };