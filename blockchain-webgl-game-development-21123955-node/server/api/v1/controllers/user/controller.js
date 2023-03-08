import Joi from "joi";
import Mongoose from "mongoose";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import bcrypt from 'bcryptjs';
import responseMessage from '../../../../../assets/responseMessage';


import { userServices } from '../../services/user';
import { requestServices } from '../../services/request';
const { createRequest, findRequest, updateRequestById, requestList } = requestServices;



import { announcementServices } from '../../services/announcement';
const { createAnnouncement, findAnnouncement, updateAnnouncement, announcementList } = announcementServices;


// import userModel from '../../../../models/user'
const { userCheck, userCount, checkUserExists, emailMobileExist, createUser, findUser, findfollowers, findfollowing, findUserData, updateUser, updateUserById, paginateSearch, userAllDetails, checkSocialLogin, userSubscriberList, topSaler, topBuyer } = userServices;



import commonFunction from '../../../../helper/util';
import jwt from 'jsonwebtoken';
import status from '../../../../enums/status';
import auth from "../../../../helper/auth"

import speakeasy from 'speakeasy';
import userType from "../../../../enums/userType";
import { token } from "morgan";

export class userController {
    /**
     * @swagger
     * /user/connectWallet:
     *   post:
     *     tags:
     *       - USER
     *     description: connectWallet
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: connectWallet
     *         description: connectWallet
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/connectWallet'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async connectWallet(req, res, next) {
        let validationSchema = {
            walletAddress: Joi.string().required()
        }
        try {
            let validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ walletAddress: validatedBody.walletAddress, status: { $ne: status.DELETE } });
            if (!userResult) {
                var result = await createUser({ walletAddress: validatedBody.walletAddress })
                let token = await commonFunction.getToken({ id: result._id, walletAddress: result.walletAddress, userType: result.userType });
                let obj = {
                    userId: result._id,
                    walletAddress: result.walletAddress,
                    token: token,
                    userType: result.userType
                }
                return res.json(new response(obj, responseMessage.LOGIN));
            }
            else {
                let token = await commonFunction.getToken({ id: userResult._id, walletAddress: userResult.walletAddress, userType: userResult.userType });
                let obj = {
                    userId: userResult._id,
                    walletAddress: userResult.walletAddress,
                    token: token,
                    userType: userResult.userType
                }
                return res.json(new response(obj, responseMessage.LOGIN));
            }
        } catch (error) {
            return next(error);
        }
    }




    /**
     * @swagger
     * /user/projectRegistrationRequest:
     *   post:
     *     tags:
     *       - USER
     *     description: projectRegistrationRequest
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: Dealer token
     *         in: header
     *         required: true
     *       - name: name
     *         description: The name of the project .
     *         in: formData
     *         required: true
     *       - name: company_name
     *         description: The name of the company .
     *         in: formData
     *         required: true
     *       - name: contact_email
     *         description: Your associated company email.
     *         in: formData
     *         required: true
     *       - name: walletAddress
     *         description: walletAddress .
     *         in: formData
     *         required: true
     *       - name: email
     *         description: Admin email .
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async projectRegistrationRequest(req, res, next) {
        var validationSchema = {
            name: Joi.string().required(),
            company_name: Joi.string().required(),
            contact_email: Joi.string().required(),
            email: Joi.string().required(),
            walletAddress: Joi.string().required()
        };
        try {
            var validatedBody = await Joi.validate(req.body, validationSchema)
            let dealer = await findUser({ _id: req.userId, userType: userType.USER, status: status.ACTIVE })
            if (!dealer) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            else {
                let admin = await findUser({ email: validatedBody.email, userType: userType.ADMIN, status: status.ACTIVE })
                console.log(admin);
                if (!admin) {
                    throw apiError.notFound(responseMessage.USER_NOT_FOUND)
                }
                else {
                    let requestCheck = await findRequest({ dealerId: dealer._id, requestType: "PROJECT_REGISTRATION", status: status.ACTIVE })
                    if (requestCheck) {
                        throw apiError.alreadyExist(responseMessage.ALREADY_REQUESTED)
                    } else {
                        let subject = `PROJECT REGISTRATION REQUEST BY USER`
                        let body = `Dear Admin , Please find my request for project registration .My registration details are :-\n name: ${validatedBody.name} \ncompany_name:${validatedBody.company_name} \n contact_email: ${validatedBody.contact_email} \n walletAddress: ${validatedBody.walletAddress}`
                        let send = await commonFunction.sendMail(admin.email, subject, body)
                        if (send) {
                            validatedBody.dealerId = dealer._id
                            let request = await createRequest(validatedBody)
                            return res.json(new response(request, responseMessage.PROJECT_REQUEST))
                        }
                    }
                }
            }
        } catch (error) {
            return next(error)
        }
    }

    /**
     * @swagger
     * /user/collectionRequest:
     *   post:
     *     tags:
     *       - USER
     *     description: collectionRequest
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: Dealer token
     *         in: header
     *         required: true
     *       - name: name
     *         description: The name of the project .
     *         in: formData
     *         required: true
     *       - name: description
     *         description: description .
     *         in: formData
     *         required: false
     *       - name: owner_public_key
     *         description: owner_public_key
     *         in: formData
     *         required: true
     *       - name: contract_address
     *         description: contract_address
     *         in: formData
     *         required: true
     *       - name: metadata_api_url
     *         description: metadata_api_url
     *         in: formData
     *         required: true
     *       - name: collection_image_url
     *         description: collection_image_url .
     *         in: formData
     *         required: false
     *       - name: icon_url
     *         description: icon_url .
     *         in: formData
     *         required: false
     *       - name: email
     *         description: Admin email .
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async collectionRequest(req, res, next) {
        var validationSchema = {
            name: Joi.string().required(),
            description: Joi.string().optional(),
            owner_public_key: Joi.string().required(),
            contract_address: Joi.string().required(),
            metadata_api_url: Joi.string().required(),
            icon_url: Joi.string().optional(),
            collection_image_url: Joi.string().optional(),
            email: Joi.string().required()
        };
        try {
            var validatedBody = await Joi.validate(req.body, validationSchema)
            let dealer = await findUser({ _id: req.userId, userType: userType.USER, status: status.ACTIVE })
            if (!dealer) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            else {
                let admin = await findUser({ email: validatedBody.email, userType: userType.ADMIN, status: status.ACTIVE })
                console.log(admin);
                if (!admin) {
                    throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
                }
                else {
                    let requestCheck = await findRequest({ dealerId: dealer._id, requestType: "COLLECTION_REGISTRATION", status: status.ACTIVE })
                    if (requestCheck) {
                        throw apiError.alreadyExist(responseMessage.ALREADY_REQUESTED)
                    } else {
                        let subject = `COLLECTION REGISTRATION REQUEST BY USER`
                        let body = `Dear Admin , Please find my request for collection registration .My registration details are :-\n name: ${validatedBody.name} \n owner_public_key:${validatedBody.owner_public_key} \n contract_address: ${validatedBody.contract_address} \n metadata_api_url: ${validatedBody.metadata_api_url}`
                        let send = await commonFunction.sendMail(admin.email, subject, body)
                        if (send) {
                            validatedBody.dealerId = dealer._id,
                                validatedBody.requestType = "COLLECTION_REGISTRATION"
                            let request = await createRequest(validatedBody)
                            return res.json(new response(request, responseMessage.COLLECTION_REQUEST))
                        }
                    }
                }
            }
        } catch (error) {
            return next(error)
        }
    }

    /**
     * @swagger
     * /user/metadataRequest:
     *   post:
     *     tags:
     *       - USER
     *     description: metadataRequest
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: Dealer token
     *         in: header
     *         required: true
     *       - name: name
     *         description: The name of the project .
     *         in: formData
     *         required: true
     *       - name: description
     *         description: description .
     *         in: formData
     *         required: false
     *       - name: image_url
     *         description: image_url
     *         in: formData
     *         required: false
     *       - name: image
     *         description: image
     *         in: formData
     *         required: false
     *       - name: animation_url
     *         description: animation_url
     *         in: formData
     *         required: false
     *       - name: animation_url_mime_type
     *         description: animation_url_mime_type .
     *         in: formData
     *         required: false
     *       - name: youtube_url
     *         description: youtube_url .
     *         in: formData
     *         required: false
     *       - name: email
     *         description: Admin email .
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async metadataRequest(req, res, next) {
        var validationSchema = {
            name: Joi.string().required(),
            description: Joi.string().optional(),
            image_url: Joi.string().optional(),
            image: Joi.string().optional(),
            animation_url: Joi.string().optional(),
            animation_url_mime_type: Joi.string().optional(),
            youtube_url: Joi.string().optional(),
            email: Joi.string().required()
        };
        try {
            var validatedBody = await Joi.validate(req.body, validationSchema)
            let dealer = await findUser({ _id: req.userId, userType: userType.USER, status: status.ACTIVE })
            if (!dealer) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            else {
                let admin = await findUser({ email: validatedBody.email, userType: userType.ADMIN, status: status.ACTIVE })
                console.log(admin);
                if (!admin) {
                    throw apiError.notFound(responseMessage.USER_NOT_FOUND)
                }
                else {
                    let requestCheck = await findRequest({ dealerId: dealer._id, requestType: "METADATA_REGISTRATION", status: status.ACTIVE })
                    if (requestCheck) {
                        throw apiError.alreadyExist(responseMessage.ALREADY_REQUESTED)
                    } else {
                        let subject = `METADATA REGISTRATION REQUEST BY USER`
                        let body = `Dear Admin , Please find my request for metadata registration .My registration details are :-\n name: ${validatedBody.name}\n dealerWalletAddress: ${dealer.walletAddress}`
                        let send = await commonFunction.sendMail(admin.email, subject, body)
                        if (send) {
                            validatedBody.dealerId = dealer._id,
                                validatedBody.requestType = "METADATA_REGISTRATION"
                            let request = await createRequest(validatedBody)
                            return res.json(new response(request, responseMessage.METADATA_REQUEST))
                        }
                    }
                }
            }
        } catch (error) {
            return next(error)
        }
    }

    /**
        * @swagger
        * /user/listRequest:
        *   get:
        *     tags:
        *       - USER
        *     description: listRequest
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
    async listRequest(req, res, next) {
        try {
            let authRes = await findUser({ _id: req.userId, userType: { $in: [userType.USER] } });
            if (!authRes) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let dataResults = await requestList({ dealerId: authRes._id, status: status.ACTIVE });
            if (dataResults.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            } else {
                return res.json(new response(dataResults, responseMessage.DATA_FOUND));
            }
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/viewRequest:
     *   get:
     *     tags:
     *       - USER
     *     description: viewRequest
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: dealerId
     *         description: dealerId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async viewRequest(req, res, next) {
        const validationSchema = {
            dealerId: Joi.string().required()
        };
        try {

            const validatedBody = await Joi.validate(req.query, validationSchema);
            let dealerResult = await findRequest({ dealerId: req.query.dealerId, status: { $ne: status.DELETE } })
            if (!dealerResult) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            } else {
                return res.json(new response(dealerResult, responseMessage.DATA_NOT_FOUND));
            }
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
       * @swagger
       * /user/replyOnAnnouncement:
       *   post:
       *     tags:
       *       - USER_ANNOUNCEMENT_MANAGEMENT
       *     description: replyOnAnnouncement
       *     produces:
       *       - application/json
       *     parameters:
       *       - name: token
       *         description: token
       *         in: header
       *         required: true
       *       - name: _id
       *         description: _id
       *         in: formData
       *         required: true
       *       - name: reply
       *         description: reply
       *         in: formData
       *         required: true
       *     responses:
       *       200:
       *         description: Returns success message
       */

    async replyOnAnnouncement(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
            reply: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: userType.USER })
            if (!userResult) throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            let announcementRes = await findAnnouncement({ _id: validatedBody._id })
            if (!announcementRes) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            let finalRes = await updateAnnouncement({ _id: validatedBody._id }, { $push: { replyFeedback: { userId: userResult._id, reply: validatedBody.reply } } })
            return res.json(new response(finalRes, responseMessage.REPLY_SUCCESS));
        } catch (error) {
            return next(error);
        }

    }



    /**
   * @swagger
   * /user/viewreplyAnnouncement:
   *   get:
   *     tags:
   *       - USER_ANNOUNCEMENT_MANAGEMENT
   *     description: viewreplyAnnouncement
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: _id
   *         description: _id
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */

    async viewreplyAnnouncement(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: userType.USER })
            if (!userResult) throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            let announcementRes = await findAnnouncement({ _id: validatedBody._id, "replyFeedback.userId": userResult._id })
            if (!announcementRes) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            return res.json(new response(announcementRes, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }

    }



    /**
   * @swagger
   * /user/listReplyAnnouncement:
   *   get:
   *     tags:
   *       - USER_ANNOUNCEMENT_MANAGEMENT
   *     description: listReplyAnnouncement
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: search
   *         description: search
   *         in: query
   *         required: false
   *       - name: formDate
   *         description: formDate
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

    async listReplyAnnouncement(req, res, next) {
        let validationSchema = {
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            limit: Joi.number().optional(),
            page: Joi.number().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            const { search, fromDate,toDate,limit,page } = validatedBody;
            let userResult = await findUser({ _id: req.userId, userType: userType.USER })
            if (!userResult) throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            let announcementRes = await announcementList({ validatedBody,"replyFeedback.userId": userResult._id  })
            if (announcementRes.length==0) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            return res.json(new response(announcementRes, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }

    }

















}

export default new userController()

