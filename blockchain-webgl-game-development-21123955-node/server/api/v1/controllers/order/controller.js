import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import responseMessage from '../../../../../assets/responseMessage';
import commonFunction from '../../../../helper/util';
import status from '../../../../enums/status';
import auth from "../../../../helper/auth";

import { userServices } from '../../services/user';
import { nftServices } from '../../services/nft';
import { notificationServices } from '../../services/notification';

const { userCheck, findUser, } = userServices;
const { createNft, findNft, updateNft, nftList, nftPaginateSearch, myNftPaginateSearch } = nftServices;
const { createNotification, findNotification, updateNotification, multiUpdateNotification, notificationList, notificationListWithSort } = notificationServices;
var responses;

export class orderController {

    async buyOrder(req, res, next) {
        try {
            let userWallet = await findUser({ _id: req.userId })
            if (!userWallet) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let orderRes = await findNft({ order_id: validatedBody.order_id })
            if(!orderRes)throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            else{
                return res.json(new response(result, responseMessage.DATA_SAVED));
            }
        } catch (error) {
            throw next(error)
        }
    }

   async listOrder(req,res,next){
    try {
        let orderRes = await findNft({})
        if(orderRes.length==0)throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
        return res.json(new response(orderRes, responseMessage.DATA_SAVED));
    } catch (error) {
        throw next(error)
    }
   }



}
export default new orderController()
