import announcementModel from "../../../models/announcementModel"
import status from "../../../enums/status";

const announcementServices = {
    createAnnouncement: async (insertObj) => {
        return await announcementModel.create(insertObj);
    },
    findAnnouncement: async (query) => {
        return await announcementModel.findOne(query).populate("replyFeedback.userId ");
    },
    updateAnnouncement: async (query, updateObj) => {
        return await announcementModel.findByIdAndUpdate(query, updateObj, { new: true });
    },
    announcementList: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        const { search, fromDate, toDate, page, limit } = validatedBody;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
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
            populate: "replyFeedback.userId"
        };
        return await announcementModel.paginate(query, options);
    },
}

module.exports = { announcementServices };  
