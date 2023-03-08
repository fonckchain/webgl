import teamModel from '../../../models/teamModel'
import status from '../../../enums/status';




const teamServices = {

  createTeam: async (insertObj) => {
    return await teamModel.create(insertObj);
  },

  findTeam: async (query) => {
    return await teamModel.findOne(query);
  },

  updateTeamById: async (query, updateObj) => {
    return await teamModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  teamList: async () => {
    return await teamModel.find({});
},

  paginateSearchTeam: async (validatedBody) => {
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
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 15,
      sort: { createdAt: -1 }
    };
    return await teamModel.paginate(query, options);
  },

}

module.exports = { teamServices };
