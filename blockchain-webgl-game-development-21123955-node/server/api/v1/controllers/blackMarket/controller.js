import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import responseMessage from '../../../../../assets/responseMessage';

import { userServices } from '../../services/user';
const { userCheck, updateUser } = userServices;

import { blackMarketServices } from '../../services/blackMarket';
const { createBlackMarket, findBlackMarket, updateBlackMarket, blackMarketListWithPaginate, blackMarketList } = blackMarketServices;


import commonFunction from '../../../../helper/util';
import status from '../../../../enums/status';
import userType, { ADMIN } from "../../../../enums/userType";


export class blackMarketController {


    /**
       * @swagger
       * /market/addBlackMarket:
       *   post:
       *     tags:
       *       - NFT MANANGEMENT
       *     description: addBlackMarket
       *     produces:
       *       - application/json
       *     parameters:
       *       - name: addBlackMarket
       *         description: addBlackMarket
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/addBlackMarket'
       *     responses:
       *       200:
       *         description: Returns success message
       */

    async addBlackMarket(req, res, next) {
        const validationSchema = {
            data: Joi.array().items(Joi.object()).optional()
        }
        try {
            var validatedBody = await Joi.validate(req.body, validationSchema);
            for (let index of validatedBody.data) {
                if (index.orders.sell_orders != undefined) {
                    index.collectionDetails = index.collection;
                    let checkResult = await findBlackMarket({ token_id: index.token_id, token_address: index.token_address });
                    if (!checkResult) {
                        await createBlackMarket(index);
                    } else {
                        await updateBlackMarket({ _id: checkResult._id }, index);
                    }
                }
            }
            return res.json(new response({}, responseMessage.DATA_SAVED));
        }
        catch (error) {
            return next(error);
        }
    }



    /**
       * @swagger
       * /market/listBlackMarket:
       *   get:
       *     tags:
       *       - NFT MANANGEMENT
       *     description: listBlackMarket
       *     produces:
       *       - application/json
       *     parameters:
       *       - name: search
       *         description: search ?? name 
       *         in: query
       *         required: false
       *       - name: fromDate
       *         description: fromDate
       *         in: query
       *         required: false
       *       - name: toDate
       *         description: toDate
       *         in: query
       *         required: false
       *       - name: page
       *         description: page
       *         in: query
       *         required: false
       *       - name: limit
       *         description: limit
       *         in: query
       *         required: false
       *     responses:
       *       200:
       *         description: Returns success message
       */
    
    async listBlackMarket(req, res, next) {
        const validationSchema = {
            search: Joi.string().optional(),
            page:Joi.string().optional(),
            limit:Joi.string().optional(),
            fromDate:Joi.string().optional(),
            toDate:Joi.string().optional()
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let result = await blackMarketListWithPaginate(validatedBody)
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }



    /**
       * @swagger
       * /market/viewBlackMarketData:
       *   get:
       *     tags:
       *       - NFT MANANGEMENT
       *     description: viewBlackMarketData
       *     produces:
       *       - application/json
       *     parameters:
       *       - name: _id
       *         description: _id 
       *         in: query
       *         required: true
       *     responses:
       *       200:
       *         description: Returns success message
       */

    async viewBlackMarketData(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
        }
        try {
            const { _id } = await Joi.validate(req.query, validationSchema);
            let finalResult = await findBlackMarket({ _id: _id })
            if (!finalResult) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            } else {
                return res.json(new response(finalResult, responseMessage.DATA_FOUND));
            }

        } catch (error) {
            return next(error);

        }
    }






























}

export default new blackMarketController();

