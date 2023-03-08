import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import responseMessage from '../../../../../assets/responseMessage';
import { userServices } from '../../services/user';
import { collectionServices } from '../../services/collection';
import { nftServices } from '../../services/nft';
import { activityServices } from '../../services/activity';


const { userCheck, userCount, checkUserExists, emailMobileExist, createUser, findUser, findUserData, updateUser, updateUserById, userAllDetails, checkSocialLogin, userSubscriberList } = userServices;
const { findCollection } = collectionServices;
const { createNft, findNft, updateNft, nftList, nftPaginateSearch, myNftPaginateSearch } = nftServices;
const { createActivity, findActivity, updateActivity, paginateUserOwendActivity, activityList } = activityServices;


import commonFunction from '../../../../helper/util';
import status from '../../../../enums/status';



export class activityController {

    /**
     * @swagger
     * /activity/createActivity:
     *   post:
     *     tags:
     *       - USER ACTIVITY
     *     description: createActivity
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: createActivity
     *         description: createActivity
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/createActivity'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async createActivity(req, res, next) {
        const validationSchema = {
            title: Joi.string().optional(),
            desctiption: Joi.string().optional(),
            type: Joi.string().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            validatedBody.userId = userResult._id;
            let result = await createActivity(validatedBody);
            return res.json(new response(result, responseMessage.DATA_SAVED));
        }
        catch (error) {
            return next(error);
        }
    }


    /**
        * @swagger
        * /activity/viewActivity/{_id}:
        *   get:
        *     tags:
        *       - USER ACTIVITY
        *     description: viewActivity
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: token
        *         in: header
        *         required: true
        *       - name: _id
        *         description: _id   
        *         in: path
        *         required: true
        *     responses:
        *       200:
        *         description: Returns success message
        */

    async viewActivity(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        }
        try {
            const { _id } = await Joi.validate(req.params, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var activityResult = await findActivity({ _id: _id, status: { $ne: status.DELETE } });
            if (!activityResult) {
                throw apiError.conflict(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(activityResult, responseMessage.DETAILS_FETCHED));
        }
        catch (error) {
            return next(error);
        }
    }


    /**
     * @swagger
     * /activity/editActivity:
     *   put:
     *     tags:
     *       - USER ACTIVITY
     *     description: editActivity
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: editActivity
     *         description: editActivity
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/editActivity'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async editActivity(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
            title: Joi.string().optional(),
            desctiption: Joi.string().optional(),
            type: Joi.string().optional()
        }
        try {
            var validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            // if (req.files.length != 0) {
            //     validatedBody.mediaUrl = await commonFunction.getImageUrl(req.files);
            //     await deleteFile(req.files[0].path);
            // }
            var activityResult = await findActivity({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!activityResult) {
                throw apiError.conflict(responseMessage.DATA_NOT_FOUND);
            }
            var result = await updateActivity({ _id: activityResult._id }, validatedBody);
            return res.json(new response(result, responseMessage.DETAILS_FETCHED));
        }
        catch (error) {
            return next(error);
        }
    }


   

    /**
         * @swagger
         * /activity/listActivity:
         *   get:
         *     tags:
         *       - USER ACTIVITY
         *     description: listActivity
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: token
         *         description: token
         *         in: header
         *         required: true
         *     responses:
         *       200:
         *         description: Returns success message
         */

    async listActivity(req, res, next) {
        try {
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let dataResults = await activityList({ userId: userResult._id, status: { $ne: status.DELETE } });
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));
        }
        catch (error) {
            return next(error);
        }

    }



    /**
         * @swagger
         * /activity/allListActivity:
         *   get:
         *     tags:
         *       - USER ACTIVITY
         *     description: allListActivity
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: token
         *         description: token
         *         in: header
         *         required: true
         *     responses:
         *       200:
         *         description: Returns success message
         */

    async allListActivity(req, res, next) {
        try {
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let dataResults = await activityList({ status: { $ne: status.DELETE } });
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));
        }
        catch (error) {
            return next(error);
        }
    }


    /**
         * @swagger
         * /activity/nftActivityList:
         *   get:
         *     tags:
         *       - USER ACTIVITY
         *     description: nftActivityList
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: type
         *         description: type
         *         in: query
         *         required: false
         *       - name: nftId
         *         description: nftId
         *         in: query
         *         required: false
         *     responses:
         *       200:
         *         description: Returns success message
         */
   
    async nftActivityList(req, res, next) {
        try {
            let query = {};
            if (req.query.type) {
                query.type = req.query.type
            }
            if (req.query.nftId) {
                query.nftId = req.query.nftId
            }
            // let dataResults = await activityListPagination(req.query);
            let dataResults = await activityList(query)
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));

        }
        catch (error) {
            return next(error);
        }
    }


}

export default new activityController();

