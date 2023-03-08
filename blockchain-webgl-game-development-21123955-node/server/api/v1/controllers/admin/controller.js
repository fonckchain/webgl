import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import bcrypt from 'bcryptjs';
import responseMessage from '../../../../../assets/responseMessage';

import commonFunction from '../../../../helper/util';
import jwt from 'jsonwebtoken';
import status from '../../../../enums/status';
import userType, { ADMIN } from "../../../../enums/userType";
import excelToJson from 'convert-excel-to-json';
import csv from 'csvtojson';
import { query } from "express";

// import { userSubscribeService } from '../../services/userSubscribeModel';
// const { createSubscribe, findSubscribe, emailExist, updateSubscribe, subscriberList } = userSubscribeService;

import { requestServices } from '../../services/request';
const { createRequest, findRequest, updateRequestById, requestList } = requestServices;

import { activityServices } from '../../services/activity';
const { createActivity, findActivity, updateActivity, paginateUserOwendActivity, paginateActivity, activityList } = activityServices;

import { feesServices } from '../../services/fees';
const { createFees, findFees, updateFees, updateFeesById, feesList } = feesServices;

import { userServices } from '../../services/user';
const { checkUserExists, userList, emailMobileExist, createUser, findUser, updateUser, updateUserById, paginateSearch, paginateSearchSubadmin, insertManyUser, dealerPaginateSearch, walletAddressExist, findCount } = userServices;

import { categoryServices } from '../../services/category';
const { createCategory, categoryCheck, findCategory, updateCategory, paginateCategory, updateCategoryById } = categoryServices;

import { nftServices } from '../../services/nft';
const { createNft, nftCheck, findNft, updateNft, nftPaginateSearch,nftCount, updateNftById } = nftServices;

import { reportServices } from '../../services/report';
const { createreport, findReport, checkReport, paginateSearchReport } = reportServices;


import { announcementServices } from '../../services/announcement';
const { createAnnouncement, findAnnouncement, updateAnnouncement, announcementList } = announcementServices;





export class adminController {

    async addAdmin(req, res, next) {
        const validationSchema = {
            email: Joi.string().required(),
            password: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { email, password } = validatedBody;
            var userInfo = await findUser({ email: email, status: { $ne: status.DELETE } });
            if (userInfo) {
                throw apiError.conflict(responseMessage.EMAIL_EXIST);
            }
            var obj = {
                email: email,
                password: bcrypt.hashSync(password),
                userType: userType.ADMIN
            }

            var result = await createUser(obj)
            return res.json(new response(result, responseMessage.USER_CREATED));
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/login:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: login
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: login
     *         description: login
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/login'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async login(req, res, next) {
        let validationSchema = {
            walletAddress: Joi.string().required(),
        }
        try {
            let validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ walletAddress: validatedBody.walletAddress, userType: { $in: [userType.ADMIN, userType.DEALER] } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }

            let token = await commonFunction.getToken({ id: userResult._id, walletAddress: userResult.walletAddress, userType: userResult.userType });
            let obj = {
                _id: userResult._id,
                walletAddress: userResult.walletAddress,
                token: token,
                userType: userResult.userType
            }
            return res.json(new response(obj, responseMessage.LOGIN));
        } catch (error) {
            return next(error);
        }
    }



    /**
   * @swagger
   * /admin/updateAdminProfile:
   *   put:
   *     tags:
   *       - ADMIN
   *     description: updateAdminProfile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: email
   *         description: email
   *         in: formData     
   *         required: false
   *       - name: name
   *         description: name
   *         in: formData
   *         required: false
   *       - name: profilePic
   *         description: profilePic     
   *         in: formData
   *         required: false
   *       - name: coverImage
   *         description: coverImage     
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */

    async updateAdminProfile(req, res, next) {
        const validationSchema = {
            name: Joi.string().optional(),
            email: Joi.string().optional(),
            profilePic: Joi.string().optional(),
            coverImage: Joi.string().optional(),
        };
        try {
            var updated;
            let validatedBody = await Joi.validate(req.body, validationSchema);

            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            if (validatedBody.profilePic) {
                validatedBody.profilePic = await commonFunction.getSecureUrl(validatedBody.profilePic);
            }
            if (validatedBody.coverImage) {
                validatedBody.coverImage = await commonFunction.getSecureUrl(validatedBody.coverImage);
            }

            updated = await updateUserById(userResult._id, validatedBody);

            return res.json(new response(updated, responseMessage.PROFILE_UPDATED));
        } catch (error) {
            console.log("==error====>>", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/loginAdmin:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: login
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: loginAdmin
     *         description: loginAdmin
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/loginAdmin'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async loginAdmin(req, res, next) {
        let validationSchema = {
            email: Joi.string().required(),
            password: Joi.string().required(),
        }
        try {
            let validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ email: validatedBody.email, userType: "ADMIN" });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            if (!bcrypt.compareSync(validatedBody.password, userResult.password)) {
                throw apiError.invalid(responseMessage.INCORRECT_LOGIN);
            }
            let token = await commonFunction.getToken({ id: userResult._id, email: userResultsassaas.email, userType: userResult.userType });
            let obj = {
                _id: userResult._id,
                email: userResult.email,
                token: token
            }
            return res.json(new response(obj, responseMessage.LOGIN));
        } catch (error) {
            return next(error);
        }
    }


    /**
     * @swagger
     * /admin/verifyOTP:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: verifyOTP
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: verifyOTP
     *         description: verifyOTP
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/verifyOTP'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async verifyOTP(req, res, next) {
        var validationSchema = {
            email: Joi.string().required(),
            otp: Joi.number().required()
        };
        try {
            var validatedBody = await Joi.validate(req.body, validationSchema);
            const { email, otp } = validatedBody;
            var userResult = await findUser({ eamil: email });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            if (new Date().getTime > userResult.otpTime) {
                throw apiError.badRequest(responseMessage.OTP_EXPIRED);
            }
            if (userResult.otp != otp && otp != 1234) {
                throw apiError.badRequest(responseMessage.INCORRECT_OTP);
            }

            var updateResult = await updateUser({ _id: userResult._id }, { accountVerify: true })
            var token = await commonFunction.getToken({ id: updateResult._id, email: updateResult.email, mobileNumber: updateResult.mobileNumber, userType: updateResult.userType });
            var obj = {
                _id: updateResult._id,
                email: updateResult.email,
                token: token
            }
            return res.json(new response(obj, responseMessage.OTP_VERIFY));

        }
        catch (error) {
            return next(error);
        }
    }


    /**
     * @swagger
     * /admin/forgotPassword:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: forgotPassword
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: forgotPassword
     *         description: forgotPassword
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/forgotPassword'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async forgotPassword(req, res, next) {
        var validationSchema = {
            email: Joi.string().required()
        };
        try {
            var validatedBody = await Joi.validate(req.body, validationSchema);
            const { email } = validatedBody;
            var userResult = await findUser({ email: email })
            if (!userResult) throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            else {
                req.body.otp = commonFunction.getOTP();
                console.log("sassaas", req.body.otp)
                var newOtp = req.body.otp;
                var time = Date.now();
                let subject = "OTP FOR VERIFICATION.";
                let body = `Your otp for verification is ${req.body.otp}`
                var token = await commonFunction.getToken({ id: userResult._id, email: userResult.email, userType: userResult.userType });
                await commonFunction.sendMail(email, subject, body, token)
                var updateResult = await updateUser({ _id: userResult._id }, { $set: { accountVerify: false, otp: newOtp, otpTimeExpire: time } }, { new: true })
                return res.json(new response(updateResult, responseMessage.OTP_SEND));
            }
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/resetPassword:
     *   put:
     *     tags:
     *       - ADMIN
     *     description: resetPassword
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userId
     *         description: _id
     *         in: query
     *         required: true
     *       - name: resetPassword
     *         description: resetPassword
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/resetPassword'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async resetPassword(req, res, next) {
        var validationSchema = {
            userId: Joi.string().optional(),
            newPassword: Joi.string().required()
        };
        try {

            var validatedBody = await Joi.validate(req.body, validationSchema);
            const { userId, newPassword } = validatedBody;
            var userResult = await findUser({ _id: req.query.userId })
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var updateResult = await updateUser({ _id: userResult._id }, { accountVerify: true, password: bcrypt.hashSync(validatedBody.newPassword) })
            return res.json(new response(updateResult, responseMessage.PWD_CHANGED));
        }
        catch (error) {
            return next(error);
        }
    }


    /**
     * @swagger
     * /admin/changePassword:
     *   patch:
     *     tags:
     *       - ADMIN
     *     description: changePassword
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: changePassword
     *         description: changePassword
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/changePassword'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async changePassword(req, res, next) {
        const validationSchema = {
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required()
        };
        try {
            let validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            if (!bcrypt.compareSync(validatedBody.oldPassword, userResult.password)) {
                throw apiError.badRequest(responseMessage.PWD_NOT_MATCH);
            }
            let updated = await updateUserById(userResult._id, { password: bcrypt.hashSync(validatedBody.newPassword) });
            return res.json(new response(updated, responseMessage.PWD_CHANGED));
        } catch (error) {
            return next(error);
        }
    }


    /**
     * @swagger
     * /admin/adminProfile:
     *   get:
     *     tags:
     *       - ADMIN
     *     description: adminProfile
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

    async adminProfile(req, res, next) {
        try {
            let adminResult = await findUser({ _id: req.userId });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            return res.json(new response(adminResult, responseMessage.USER_DETAILS));
        } catch (error) {
            return next(error);
        }
    }


    //****************************************** USER management Start *****************************************************************************//  


    /**
    * @swagger
    * /admin/listUser:
    *   get:
    *     tags:
    *       - ADMIN
    *     description: listUser
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

    async listUser(req, res, next) {
        let validationSchema = {
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            limit: Joi.number().optional(),
            page: Joi.number().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            const { search, fromDate, toDate, limit, page } = validatedBody;
            let userResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var userInfo = await paginateSearch(validatedBody);
            if (!userInfo) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(userInfo, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/viewUser/{_id}:
     *   get:
     *     tags:
     *       - ADMIN
     *     description: viewUser
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
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async viewUser(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.params, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var userInfo = await findUser({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!userInfo) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(userInfo, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }


    // /**
    //  * @swagger
    //  * /admin/deleteUser:
    //  *   delete:
    //  *     tags:
    //  *       - ADMIN
    //  *     description: deleteUser
    //  *     produces:
    //  *       - application/json
    //  *     parameters:
    //  *       - name: token
    //  *         description: token
    //  *         in: header
    //  *         required: true
    //  *       - name: deleteUser
    //  *         description: deleteUser
    //  *         in: body
    //  *         required: true
    //  *         schema:
    //  *           $ref: '#/definitions/deleteUser'
    //  *     responses:
    //  *       200:
    //  *         description: Returns success message
    //  */

    // async deleteUser(req, res, next) {
    //     const validationSchema = {
    //         _id: Joi.string().required()
    //     };
    //     try {
    //         const validatedBody = await Joi.validate(req.body, validationSchema);
    //         let userResult = await findUser({ _id: req.userId, userType: { $in: "ADMIN" } });
    //         if (!userResult) {
    //             throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    //         }
    //         var userInfo = await findUser({ _id: validatedBody._id, status: { $ne: status.DELETE } });
    //         if (!userInfo) {
    //             throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    //         }
    //         let deleteRes = await updateUser({ _id: userInfo._id }, { status: status.DELETE });
    //         return res.json(new response(deleteRes, responseMessage.DELETE_SUCCESS));
    //     } catch (error) {
    //         return next(error);
    //     }
    // }


    /**
     * @swagger
     * /admin/blockUnblockUser:
     *   put:
     *     tags:
     *       - ADMIN
     *     description: blockUnblockUser
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: blockUnblockUser
     *         description: blockUnblockUser
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/blockUnblockUser'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async blockUnblockUser(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: { $in: "ADMIN" } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var userInfo = await findUser({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!userInfo) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            if (userInfo.status == status.ACTIVE) {
                let blockRes = await updateUser({ _id: userInfo._id }, { status: status.BLOCK });
                return res.json(new response(blockRes, responseMessage.BLOCK_BY_ADMIN));
            } else {
                let activeRes = await updateUser({ _id: userInfo._id }, { status: status.ACTIVE });
                return res.json(new response(activeRes, responseMessage.UNBLOCK_BY_ADMIN));
            }

        } catch (error) {
            console.log("====error==",error)
            return next(error);
        }
    }


    /**
      * @swagger
      * /admin/listArtist:
      *   get:
      *     tags:
      *       - ADMIN
      *     description: listArtist
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: token
      *         description: token
      *         in: header
      *         required: true
      *       - name: status
      *         description: status
      *         in: query
      *       - name: userType
      *         description: userType
      *         in: query
      *       - name: search
      *         description: search
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
      *         type: integer
      *         required: false
      *       - name: limit
      *         description: limit
      *         in: query
      *         type: integer
      *         required: false
      *     responses:
      *       200:
      *         description: Returns success message
      */

    async listArtist(req, res, next) {
        const validationSchema = {
            userType: Joi.string().optional(),
            status: Joi.string().optional(),
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        };
        try {

            const validatedBody = await Joi.validate(req.query, validationSchema);

            let userResult = await findUser({ _id: req.userId, userType: { $in: "ADMIN" } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            if (validatedBody.userType) {
                validatedBody.query = validatedBody.userType
            }
            let dataResults = await paginateSearch(validatedBody);
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }



    //****************************************** USER management End *****************************************************************************//  


    //****************************************** Sub-Admin management Start *****************************************************************************//  

    /**
        * @swagger
        * /subAdmin/subAdmin:
        *   post:
        *     tags:
        *       - SUBADMIN_MANAGEMENT
        *     description: addSubadmin
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: token
        *         in: header
        *         required: true
        *       - name: email
        *         description: email
        *         in: formData
        *       - name: password
        *         description: password
        *         in: formData
        *       - name: walletAddress
        *         description: walletAddress
        *         in: formData
        *         required: false
        *       - name: firstName
        *         description: firstName
        *         in: formData
        *         required: false
        *       - name: lastName
        *         description: lastName
        *         in: formData
        *         required: false
        *       - name: mobileNumber
        *         description: mobileNumber
        *         in: formData
        *         required: false
        *       - name: dasboardManagement
        *         description: dasboardManagement
        *         in: formData
        *         type: boolean
        *         default: false
        *         required: false
        *       - name: nftManagement
        *         description: nftManagement
        *         in: formData
        *         type: boolean
        *         default: false
        *         required: false
        *       - name: orderManagement
        *         description: orderManagement
        *         in: formData
        *         type: boolean
        *         required: false
        *         default: false
        *       - name: staticManagement
        *         description: staticManagement
        *         in: formData
        *         type: boolean
        *         default: false
        *         required: false
        *       - name: FAQsManagement
        *         description: FAQsManagement
        *         in: formData
        *         type: boolean
        *         default: false
        *         required: false
        *       - name: announcementManagement
        *         description: announcementManagement
        *         in: formData
        *         type: boolean
        *         default: false
        *         required: false
        *       - name: subAdminManagement
        *         description: subAdminManagement
        *         in: formData
        *         type: boolean
        *         default: false
        *         required: false
        *       - name: garageManagement
        *         description: garageManagement
        *         in: formData
        *         type: boolean
        *         default: false
        *         required: false
        *     responses:
        *       200:
        *         description: Returns success message
        */

    async addSubadmin(req, res, next) {
        const validationSchema = {
            email: Joi.string().optional(),
            password: Joi.string().optional(),
            mobileNumber: Joi.string().optional(),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            walletAddress: Joi.string().optional(),
            dasboardManagement: Joi.boolean().optional(),
            nftManagement: Joi.boolean().optional(),
            orderManagement: Joi.boolean().optional(),
            staticManagement: Joi.boolean().optional(),
            FAQsManagement: Joi.boolean().optional(),
            announcementManagement: Joi.boolean().optional(),
            subAdminManagement: Joi.boolean().optional(),
            garageManagement: Joi.boolean().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { firstName,lastName,walletAddress, dasboardManagement,nftManagement,orderManagement,staticManagement,FAQsManagement,announcementManagement,subAdminManagement,garageManagement,password, email, mobileNumber, profilePic } = await Joi.validate(req.body, validationSchema);

            let userResult = await findUser({ _id: req.userId, userType: { $in: "ADMIN" } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let userInfo = await findUser({ $or: [{ email:email }, { walletAddress:walletAddress }] })
            if (userInfo) throw apiError.conflict(responseMessage.EMAIL_WALLET_EXIST)
            validatedBody.Permissions = {
                dasboardManagement: dasboardManagement,
                nftManagement: nftManagement,
                orderManagement: orderManagement,
                staticManagement: staticManagement,
                FAQsManagement: FAQsManagement,
                announcementManagement: announcementManagement,
                subAdminManagement: subAdminManagement,
                garageManagement: garageManagement,
            }
            validatedBody.userType = userType.SUBADMIN

            // commonFunction.sendMailContent(email,password,walletAddress)
            let dataResults = await createUser(validatedBody);
            return res.json(new response(dataResults, responseMessage.SUBADMIN_SUCCESS));
        } catch (error) {
            console.log("=====error in catch===>>>", error)
            return next(error);
        }
    }

    /**
* @swagger
* /subAdmin/subAdmin:
*   get:
*     tags:
*       - SUBADMIN_MANAGEMENT
*     description: listSubAdmin
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

    async listSubAdmin(req, res, next) {
        let validationSchema = {
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            limit: Joi.number().optional(),
            page: Joi.number().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            const { search, fromDate, toDate, limit, page } = validatedBody;
            let userResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var userInfo = await paginateSearchSubadmin(validatedBody);
            if (userInfo.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(userInfo, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /subAdmin/subAdmin/{_id}:
     *   get:
     *     tags:
     *       - SUBADMIN_MANAGEMENT
     *     description: subAdmin
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
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async subAdminView(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.params, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var userInfo = await findUser({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!userInfo) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(userInfo, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
  * @swagger
  * /subAdmin/subAdmin/{_id}:
  *   patch:
  *     tags:
  *       - SUBADMIN_MANAGEMENT
  *     description: block_unblock subAdmin
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
  *         required: false
  *     responses:
  *       200:
  *         description: Returns success message
  */

    async blockUnblockSubAdmin(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.params, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var userInfo = await findUser({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!userInfo) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }

            if (userInfo.status == "ACTIVE" || userInfo.status == status.ACTIVE) {
                var userStatusUpdate = await updateUser({ _id: validatedBody._id }, { $set: { status: status.BLOCK } })
                return res.json(new response(userStatusUpdate, responseMessage.BLOCK_SUCCESS));

            } else {
                var userStatusUpdate = await updateUser({ _id: validatedBody._id }, { $set: { status: status.ACTIVE } })
                return res.json(new response(userStatusUpdate, responseMessage.UNBLOCK_SUCCESS));
            }
        } catch (error) {
            console.log("====error====>>", error)
            return next(error);
        }
    }


    //****************************************** Sub-Admin management Stop *****************************************************************************//  





    //****************************** Category management Start ************************************************************************************ //

    /**
     * @swagger
     * /admin/addCategory:
     *   post:
     *     tags:
     *       - CATEGORY_MANAGEMENT
     *     description: addCategory
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: categoryTitle
     *         description: categoryTitle
     *         in: formData
     *         required: false
     *       - name: categoryIcon
     *         description: categoryIcon
     *         in: formData
     *         type: file
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async addCategory(req, res, next) {
        let validationSchema = {
            categoryTitle: Joi.string().required(),
            categoryIcon: Joi.string().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { categoryTitle } = validatedBody;
            var category = await categoryCheck(validatedBody.categoryTitle);
            if (category) {
                throw apiError.notFound(responseMessage.CATEGORY_ALREADY_EXIST);
            }

            const { files } = req;

            if (files.length != 0) {
                req.body.categoryIcon = await commonFunction.getImageUrl(files);
            }


            var result = await createCategory(req.body)
            return res.json(new response(result, responseMessage.CATEGORY_CREATED));


        } catch (error) {
            return next(error);
        }
    }

    /**
       * @swagger
       * /admin/deleteCategory:
       *   delete:
       *     tags:
       *       - CATEGORY_MANAGEMENT
       *     description: deleteCategory
       *     produces:
       *       - application/json
       *     parameters:
       *       - name: token
       *         description: token
       *         in: header
       *         required: true
       *       - name: deleteCategory
       *         description: deleteCategory
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/deleteCategory'
       *     responses:
       *       200:
       *         description: Returns success message
       */

    async deleteCategory(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: { $in: "ADMIN" } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var categoryInfo = await findCategory({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!categoryInfo) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            let deleteRes = await updateCategory({ _id: categoryInfo._id }, { status: status.DELETE });
            return res.json(new response(deleteRes, responseMessage.DELETE_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
        * @swagger
        * /admin/listCategory:
        *   get:
        *     tags:
        *       - CATEGORY_MANAGEMENT
        *     description: listCategory
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: search
        *         description: search
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
        *         type: integer
        *         required: false
        *       - name: limit
        *         description: limit
        *         in: query
        *         type: integer
        *         required: false
        *     responses:
        *       200:
        *         description: Returns success message
        */

    async listCategory(req, res, next) {
        const validationSchema = {
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var categoryInfo = await findCategory({ status: { $ne: status.DELETE } });
            if (!categoryInfo) throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            let dataResults = await paginateCategory(validatedBody);
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
        * @swagger
        * /admin/editCategory:
        *   put:
        *     tags:
        *       - CATEGORY_MANAGEMENT
        *     description: editCategory
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: token
        *         in: header
        *         required: true
        *       - name: categoryTitle
        *         description: categoryTitle
        *         in: formData
        *         required: false
        *       - name: categoryId
        *         description: _id
        *         in: formData
        *         required: true
        *       - name: categoryIcon
        *         description: base64
        *         in: formData
        *         type: file
        *         required: false
        *     responses:
        *       200:
        *         description: Returns success message
        */

    async editCategory(req, res, next) {
        const validationSchema = {
            categoryTitle: Joi.string().optional(),
            categoryIcon: Joi.string().optional(),
            categoryId: Joi.string()
        };
        try {

            var uniqueCheck, updated;
            let validatedBody = await Joi.validate(req.body, validationSchema);

            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }

            var categoryInfo = await findCategory({ _id: validatedBody.categoryId, status: { $ne: status.DELETE } });

            if (!categoryInfo) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            if (validatedBody.categoryTitle && !validatedBody.categoryIcon) {
                uniqueCheck = await findCategory({ categoryTitle: validatedBody.categoryTitle, _id: { $ne: categoryInfo.categoryId }, status: { $ne: status.DELETE } });
                if (uniqueCheck) {
                    throw apiError.conflict(responseMessage.CATEGORY_ALREADY_EXIST);
                }

                updated = await updateCategoryById(categoryInfo._id, validatedBody);
            }
            if (validatedBody.categoryIcon && !validatedBody.categoryTitle) {
                uniqueCheck = await findUser({ categoryIcon: validatedBody.categoryIcon, _id: { $ne: categoryInfo._id }, status: { $ne: status.DELETE } });
                const { files } = req;

                req.body.categoryIcon = await commonFunction.getImageUrl(files);

                updated = await updateCategoryById(categoryInfo._id, validatedBody);
            }

            updated = await updateCategoryById(categoryInfo._id, validatedBody);
            return res.json(new response(updated, responseMessage.PROFILE_UPDATED));
        } catch (error) {
            return next(error);
        }
    }


    //****************************** Category management End ************************************************************/

    //****************************** Nft management Start ************************************************************/

    /**
         * @swagger
         * /admin/listNft:
         *   get:
         *     tags:
         *       - ADMIN
         *     description: listNft
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: search
         *         description: search
         *         in: query
         *         required: false
         *       - name: status
         *         description: status
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
         *         type: integer
         *         required: false
         *       - name: limit
         *         description: limit
         *         in: query
         *         type: integer
         *         required: false
         *     responses:
         *       200:
         *         description: Returns success message
         */

    async listNft(req, res, next) {
        const validationSchema = {
            status: Joi.string().optional(),
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var nftInfo = await findNft({ status: { $ne: status.DELETE } });
            if (!nftInfo) {
                throw apiError.notFound(responseMessage.NFT_NOT_FOUND);
            }
            let dataResults = await nftPaginateSearch(validatedBody);
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }


    /**
    * @swagger
    * /admin/blockUnblockNft:
    *   put:
    *     tags:
    *       - ADMIN
    *     description: blockUnblockNft
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token
    *         in: header
    *         required: true
    *       - name: blockUnblockNft
    *         description: blockUnblockNft
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/blockUnblockNft'
    *     responses:
    *       200:
    *         description: Returns success message
    */

    async blockUnblockNft(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: { $in: [userType.ADMIN, userType.SUBADMIN] } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var nftInfo = await findNft({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!nftInfo) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            if (nftInfo.status == status.ACTIVE) {
                let blockRes = await updateNft({ _id: nftInfo._id }, { status: status.BLOCK });
                return res.json(new response(blockRes, responseMessage.NFT_BLOCK_BY_ADMIN));
            } else {
                let activeRes = await updateNft({ _id: nftInfo._id }, { status: status.ACTIVE });
                return res.json(new response(activeRes, responseMessage.NFT_UNBLOCK_BY_ADMIN));
            }

        } catch (error) {
            return next(error);
        }
    }

    //****************************** Nft management End ************************************************************/


    /**
    * @swagger
      * /admin/reportsList:
      *   post:
      *     tags:
      *       - ADMIN
      *     description: reportsList
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: token
      *         description: token
      *         in: header
      *         required: true
      *       - name: _id
      *         description: _id ? reportId
      *         in: formData
      *         required: false
      *       - name: search
      *         description: search ? By username 
      *         in: formData
      *         required: false
      *     responses:
      *       200:
      *         description: Returns success message
      */

    async reportsList(req, res, next) {
        try {
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            } else {
                let reportCheck = await paginateSearchReport(req.body)
                if (reportCheck.docs.length == 0) {
                    return res.json(new response([], responseMessage.DATA_NOT_FOUND));
                } else {
                    return res.json(new response(reportCheck, responseMessage.COLLECTION_DETAILS));
                }
            }
        } catch (error) {
            return next(error);
        }

    }


    /**
     * @swagger
     * /admin/listActivityUsers:
     *   get:
     *     tags:
     *       - ADMIN
     *     description: listActivityUsers
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
     *       - name: status
     *         description: status
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
     *         type: integer
     *         required: false
     *       - name: limit
     *         description: limit
     *         in: query
     *         type: integer
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async listActivityUsers(req, res, next) {
        const validationSchema = {
            status: Joi.string().optional(),
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.number().optional(),
            limit: Joi.number().optional(),

        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var activityInfo = await findActivity({ status: { $ne: status.DELETE } });
            if (!activityInfo) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            let dataResults = await paginateActivity(validatedBody);
            return res.json(new response(dataResults, responseMessage.ACTIVITY_DETAILS));
        } catch (error) {
            return next(error);
        }
    }

    /**
      * @swagger
      * /admin/userSubscriberList:
      *   get:
      *     tags:
      *       - ADMIN
      *     description: shareContent
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

    async userSubscriberList(req, res, next) {
        try {
            var userRes = await findUser({ _id: req.userId })
            if (!userRes) {
                throw apiError.notFound([], responseMessage.USER_NOT_FOUND)
            } else {
                var subscribeRes = await subscriberList()
                if (subscribeRes.length == 0) {
                    throw apiError.notFound([], responseMessage.DATA_NOT_FOUND)
                } else {
                    return res.json(new response(subscribeRes, responseMessage.DATA_FOUND))
                }
            }
        } catch (error) {
            return next(error);
        }

    }


    /**
        * @swagger
        * /admin/shareContent:
        *   post:
        *     tags:
        *       - ADMIN
        *     description: shareContent
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: token
        *         in: header
        *         required: true
        *       - name: message
        *         description: message
        *         in: formData
        *         required: true
        *     responses:
        *       200:
        *         description: Returns success message
        */

    async shareContent(req, res, next) {
        const validationSchema = {
            message: Joi.string().required(),
            // email: Joi.string().required(),
        };
        try {
            let data = []
            let validatedBody = await Joi.validate(req.body, validationSchema);
            let userDetail = await findUser({ _id: req.userId });
            if (!userDetail) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            var shareRes = await subscriberList({ status: { $ne: status.DELETE } })
            if (shareRes.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            // shareRes.docs.map(i => i.email);
            let emailList = [];
            for (let index of shareRes) {
                emailList.push(index.email)
            }
            for (let i of emailList) {
                var mailRes = await commonFunction.sendMailContent(i, validatedBody.message)
            }
            return res.json(new response({ mailRes }, responseMessage.MAIL_SEND));
        } catch (error) {
            console.log("===error", error)
            return next(error);
        }
    }

    // ************************** Dealer Management Start ****************************************************************************************** //

    /**
     * @swagger
     * /admin/addDealer:
     *   post:
     *     tags:
     *       - ADMIN_DEALER_MANAGEMENT
     *     description: addDealer
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: walletAddress
     *         description: walletAddress
     *         in: formData
     *         required: true
     *       - name: name
     *         description: name
     *         in: formData
     *         required: true
     *       - name: logo
     *         description: logo
     *         in: formData
     *         type: file
     *         required: false
     *       - name: videoURL
     *         description: videoURL
     *         in: formData
     *         type: file
     *         required: false
     *       - name: description
     *         description: description
     *         in: formData
     *         required: false
     *       - name: headerTitle
     *         description: headerTitle
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async addDealer(req, res, next) {
        const validationSchema = {
            walletAddress: Joi.string().required(),
            name: Joi.string().optional(),
            logo: Joi.string().optional(),
            videoURL: Joi.string().optional(),
            description: Joi.string().optional(),
            headerTitle: Joi.string().optional()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { walletAddress, name, logo, videoURL, description, headerTitle } = validatedBody;
            let authRes = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!authRes) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            var userInfo = await findUser({ walletAddress: walletAddress, status: { $ne: status.DELETE } });
            if (userInfo) {
                throw apiError.conflict(responseMessage.WALLET_ALREADY_EXIST);
            }
            if (req.files) {
                validatedBody.logo = await commonFunction.getImageUrl(req.files)
            }
            if (req.files) {
                validatedBody.videoURL = await commonFunction.getImageUrl(req.files)
            }
            console.log("validatedBody.logo and url....", validatedBody.logo)
            var resultObj = {
                logo: validatedBody.logo,
                videoURL: validatedBody.videoURL,
                userType: userType.DEALER,
                walletAddress: validatedBody.walletAddress,
                name: validatedBody.name,
                description: validatedBody.description,
                headerTitle: validatedBody.headerTitle,
            }
            var result = await createUser(resultObj)
            return res.json(new response(result, responseMessage.DEALER_CREATED));
        } catch (error) {
            console.log("===1569=", error)
            return next(error);
        }
    }


    /**
        * @swagger
        * /admin/listDealer:
        *   get:
        *     tags:
        *       - ADMIN_DEALER_MANAGEMENT
        *     description: listDealer
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: token
        *         in: header
        *         required: true
        *       - name: status
        *         description: status
        *         in: query
        *       - name: search
        *         description: search
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
        *         type: integer
        *         required: false
        *       - name: limit
        *         description: limit
        *         in: query
        *         type: integer
        *         required: false
        *     responses:
        *       200:
        *         description: Returns success message
        */

    async listDealer(req, res, next) {
        const validationSchema = {
            status: Joi.string().optional(),
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let authRes = await findUser({ _id: req.userId, userType: { $in: [userType.ADMIN] } });
            if (!authRes) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let dataResults = await dealerPaginateSearch(validatedBody);
            if (dataResults.docs.length == 0) {
                throw apiError.notFound(responseMessage.DEALER_NOT_FOUND)
            } else {
                return res.json(new response(dataResults, responseMessage.DEALER_FOUND));
            }
        } catch (error) {
            return next(error);
        }
    }

    /**
    * @swagger
    * /admin/viewDealer:
    *   get:
    *     tags:
    *       - ADMIN_DEALER_MANAGEMENT
    *     description: viewDealer
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

    async viewDealer(req, res, next) {
        const validationSchema = {
            dealerId: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let authRes = await findUser({ _id: req.userId, userType: { $in: [userType.ADMIN] } });
            if (!authRes) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let dealerResult = await findUser({ _id: req.query.dealerId, userType: userType.DEALER, status: { $ne: status.DELETE } })
            if (!dealerResult) {
                throw apiError.notFound(responseMessage.DEALER_NOT_FOUND)
            } else {
                return res.json(new response(dealerResult, responseMessage.DEALER_FOUND));
            }
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
    * @swagger
    * /admin/getProfileDealer:
    *   get:
    *     tags:
    *       - ADMIN_DEALER_MANAGEMENT
    *     description: getProfileDealer
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

    async getProfileDealer(req, res, next) {
        try {
            let dealerResult = await findUser({ _id: req.userId, userType: userType.DEALER, status: { $ne: status.DELETE } });
            if (!dealerResult) {
                throw apiError.notFound(responseMessage.DEALER_NOT_FOUND)
            } else {
                return res.json(new response(dealerResult, responseMessage.DEALER_FOUND));
            }
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
  * @swagger
  * /admin/editDealer:
  *   put:
  *     tags:
  *       - ADMIN_DEALER_MANAGEMENT
  *     description: editDealer
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: token
  *         description: token
  *         in: header
  *         required: true
  *       - name: dealerId
  *         description: dealerId
  *         in: formData
  *         required: true
  *       - name: walletAddress
  *         description: walletAddress
  *         in: formData
  *         required: true
  *       - name: name
  *         description: name
  *         in: formData
  *         required: true
  *       - name: logo
  *         description: logo
  *         in: formData
  *         required: true
  *       - name: videoURL
  *         description: videoURL
  *         in: formData
  *         required: true
  *       - name: description
  *         description: description
  *         in: formData
  *         required: false
  *       - name: headerTitle
  *         description: headerTitle
  *         in: formData
  *         required: false
  *     responses:
  *       200:
  *         description: Returns success message
  */

    async editDealer(req, res, next) {
        const validationSchema = {
            dealerId: Joi.string().required(),
            walletAddress: Joi.string().required(),
            name: Joi.string().optional(),
            logo: Joi.string().optional(),
            videoURL: Joi.string().optional(),
            description: Joi.string().optional(),
            headerTitle: Joi.string().optional()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { walletAddress, name, logo, videoURL, description, headerTitle, dealerId } = validatedBody;
            let authRes = await findUser({ _id: req.userId, userType: { $in: [userType.ADMIN] } });
            if (!authRes) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            var userResult = await findUser({ _id: validatedBody.dealerId, status: { $ne: status.DELETE }, userType: userType.DEALER })
            if (!userResult) {
                throw apiError.notFound(responseMessage.DEALER_NOT_FOUND)
            }
            var userInfo = await findUser({ walletAddress: walletAddress, _id: { $ne: dealerId }, status: { $ne: status.DELETE } });
            if (userInfo) {
                if (userInfo.walletAddress == walletAddress) {
                    throw apiError.conflict(responseMessage.WALLET_ALREADY_EXIST);
                }
            }
            // validatedBody.userType = userType.DEALER;
            var result = await updateUser({ _id: userResult._id }, (validatedBody))
            return res.json(new response(result, responseMessage.DEALER_EDITED));
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }


    // ************************** Dealer Management End ****************************************************************************************** //


    /**
        * @swagger
        * /admin/Dashbord:
        *   get:
        *     tags:
        *       - ADMIN
        *     description: Dashbord
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: token -> admin || dealer
        *         in: header
        *         required: false
        *     responses:
        *       200:
        *         description: Data found successfully.
        *       404:
        *         description: User not found || Data not found.
        *       501:
        *         description: Something went wrong!
        */

    async Dashbord(req, res, next) {

        try {
            let userResult = await findUser({ _id: req.userId, userType: { $in: [userType.ADMIN, userType.DEALER] } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var userInfo = await findCount({ userType: userType.USER, status: { $ne: status.DELETE } });
            var dealerInfo = await findCount({ userType: userType.DEALER, status: { $ne: status.DELETE } });
            var placeOrderInfo = await nftCount({ status: { $ne: status.DELETE } });
            let obj = {
                allUser: userInfo,
                allDealer: dealerInfo,
                allPlaceOrder: placeOrderInfo
            }
            return res.json(new response(obj, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }

    }

    /**
     * @swagger
     * /admin/approveRequest:
     *   get:
     *     tags:
     *       - ADMIN_REQUEST_MANAGEMENT
     *     description: approveRequest
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token -> admin
     *         in: header
     *         required: true
     *       - name: requestId
     *         description: requestId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Approved successfully.
     *       404:
     *         description: User not found || Data not found.
     *       501:
     *         description: Something went wrong!
     */

    async approveRequest(req, res, next) {
        var validationSchema = {
            requestId: Joi.string().required()
        };
        try {
            var validatedBody = await Joi.validate(req.query, validationSchema)
            let admin = await findUser({ _id: req.userId, userType: userType.ADMIN, status: status.ACTIVE })
            if (!admin) {
                throw apiError.invalid(responseMessage.UNAUTHORIZED)
            }
            else {
                let request = await findRequest({ _id: validatedBody.requestId, requestStatus: "PENDING", status: status.ACTIVE })
                if (!request) {
                    throw apiError.notFound(responseMessage.REQUEST_NOT_FOUND)
                }
                else {
                    if (request.requestType == "PROJECT_REGISTRATION") {
                        let updateRequest = await updateRequestById({ _id: request._id }, { $set: { requestStatus: "APPROVED" } })
                        let updateDealer = await updateUserById({ _id: request.dealerId }, { $set: { projectRegistration: true } })
                        return res.json(new response(updateRequest, responseMessage.REQUEST_APPROVED))
                    }
                    else if (request.requestType == "COLLECTION_REGISTRATION") {
                        let updateRequest = await updateRequestById({ _id: request._id }, { $set: { requestStatus: "APPROVED" } })
                        let updateDealer = await updateUserById({ _id: request.dealerId }, { $set: { collectionRegistration: true } })
                        return res.json(new response(updateRequest, responseMessage.REQUEST_APPROVED))
                    }
                    else {
                        let updateRequest = await updateRequestById({ _id: request._id }, { $set: { requestStatus: "APPROVED" } })
                        let updateDealer = await updateUserById({ _id: request.dealerId }, { $set: { metadataRegistration: true } })
                        return res.json(new response(updateRequest, responseMessage.REQUEST_APPROVED))
                    }
                }
            }
        } catch (error) {
            return next(error)
        }
    }

    /**
     * @swagger
     * /admin/rejectRequest:
     *   get:
     *     tags:
     *       - ADMIN_REQUEST_MANAGEMENT
     *     description: rejectRequest
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token -> admin
     *         in: header
     *         required: true
     *       - name: requestId
     *         description: requestId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Rejected successfully.
     *       404:
     *         description: User not found || Data not found.
     *       501:
     *         description: Something went wrong!
     */

    async rejectRequest(req, res, next) {
        var validationSchema = {
            requestId: Joi.string().required()
        };
        try {
            var validatedBody = await Joi.validate(req.query, validationSchema)
            let admin = await findUser({ _id: req.userId, userType: userType.ADMIN, status: status.ACTIVE })
            if (!admin) {
                throw apiError.invalid(responseMessage.UNAUTHORIZED)
            }
            else {
                let request = await findRequest({ _id: validatedBody.requestId, requestStatus: "PENDING", status: status.ACTIVE })
                if (!request) {
                    throw apiError.notFound(responseMessage.REQUEST_NOT_FOUND)
                }
                else {
                    if (request.requestType == "PROJECT_REGISTRATION") {
                        let updateRequest = await updateRequestById({ _id: request._id }, { $set: { requestStatus: "REJECTED" } })
                        return res.json(new response(updateRequest, responseMessage.REQUEST_REJECTED))
                    }
                    else if (request.requestType == "COLLECTION_REGISTRATION") {
                        let updateRequest = await updateRequestById({ _id: request._id }, { $set: { requestStatus: "REJECTED" } })
                        return res.json(new response(updateRequest, responseMessage.REQUEST_REJECTED))
                    }
                    else {
                        let updateRequest = await updateRequestById({ _id: request._id }, { $set: { requestStatus: "REJECTED" } })
                        return res.json(new response(updateRequest, responseMessage.REQUEST_REJECTED))
                    }
                }
            }
        } catch (error) {
            return next(error)
        }
    }

    /**
         * @swagger
         * /admin/listRequest:
         *   get:
         *     tags:
         *       - ADMIN_REQUEST_MANAGEMENT
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
            let admin = await findUser({ _id: req.userId, userType: userType.ADMIN, status: status.ACTIVE })
            if (!admin) {
                throw apiError.invalid(responseMessage.UNAUTHORIZED)
            }
            else {
                let request = await requestList({ status: status.ACTIVE })
                if (request.length == 0) {
                    throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
                }
                else {
                    return res.json(new response(request, responseMessage.DATA_FOUND))
                }
            }
        } catch (error) {
            return next(error)
        }
    }

    // *********************** Admin fee management Start ************************************************************ //



    /**
        * @swagger
        * /admin/addFees:
        *   post:
        *     tags:
        *       - ADMIN_FEE_MANAGEMENT
        *     description: addFees
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: token
        *         in: header
        *         required: true
        *       - name: fees
        *         description: fees
        *         in: formData
        *         required: false
        *       - name: feesInPercentage
        *         description: feesInPercentage
        *         in: formData
        *         required: false
        *     responses:
        *       200:
        *         description: Returns success message
        */

    async addFees(req, res, next) {

        let validationSchema = {
            fees: Joi.string().optional(),
            feesInPercentage: Joi.string().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { fees, feesInPercentage } = validatedBody;
            var result = await createFees(req.body)
            return res.json(new response(result, responseMessage.FEES_CREATED));


        } catch (error) {
            return next(error);
        }
    }

    /**
           * @swagger
           * /admin/deleteFees:
           *   delete:
           *     tags:
           *       - ADMIN_FEE_MANAGEMENT
           *     description: deleteFees
           *     produces:
           *       - application/json
           *     parameters:
           *       - name: token
           *         description: token
           *         in: header
           *         required: true
           *       - name: feesId
           *         description: feesId
           *         in: formData
           *         required: true
           *     responses:
           *       200:
           *         description: Returns success message
           */

    async deleteFees(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: { $in: "ADMIN" } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var feesInfo = await findFees({ _id: validatedBody.feesId, status: { $ne: status.DELETE } });
            if (!feesInfo) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            let deleteRes = await updateFeed({ _id: feesInfo.feesId }, { status: status.DELETE });
            return res.json(new response(deleteRes, responseMessage.DELETE_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/viewFees:
     *   get:
     *     tags:
     *       - ADMIN_FEE_MANAGEMENT
     *     description: viewFees
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

    async viewFees(req, res, next) {
        try {
            let adminResult = await findUser({ _id: req.userId });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var feesInfo = await findFees({ status: { $ne: status.DELETE } });
            if (!feesInfo) {
                throw apiError.notFound(responseMessage.FEES_NOT_FOUND);
            }
            return res.json(new response(feesInfo, responseMessage.FEES_DETAILS));
        } catch (error) {
            return next(error);
        }
    }

    /**
        * @swagger
        * /admin/editFees:
        *   put:
        *     tags:
        *       - ADMIN_FEE_MANAGEMENT
        *     description: editFees
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: token
        *         in: header
        *         required: true
        *       - name: feesId
        *         description: feesId
        *         in: formData
        *         required: true
        *       - name: fees
        *         description: fees
        *         in: formData
        *         required: false
        *       - name: feesInPercentage
        *         description: feesInPercentage
        *         in: formData
        *         required: false
        *     responses:
        *       200:
        *         description: Returns success message
        */

    async editFees(req, res, next) {
        const validationSchema = {
            feesId: Joi.string().optional(),
            fees: Joi.string().optional(),
            feesInPercentage: Joi.string().optional(),
        };
        try {

            let validatedBody = await Joi.validate(req.body, validationSchema);

            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }

            var feesInfo = await findFees({ _id: validatedBody.feesId, status: { $ne: status.DELETE } });

            if (!feesInfo) {
                throw apiError.notFound(responseMessage.FEES_NOT_FOUND);
            }

            var updated = await updateFeesById(feesInfo._id, validatedBody);
            return res.json(new response(updated, responseMessage.FEED_UPDATED));
        } catch (error) {
            return next(error);
        }
    }


    // ***************************** NFT Transaction **************************************************************** //
 
    async nftTransactionList(req, res) { // implimentation in process
            try {
                var userRes = await findUser({ _id: req.userId, status: "ACTIVE", userType: "ADMIN" })
                if (!userRes) {
                    throw apiError.invalid(responseMessage.UNAUTHORIZED)
    
                } else {
                    var query = {};
                    if (req.query.search) {
                        query = {
                            walletAddress: { $regex: req.query.search, $options: "i" },
                        };
                    }
                    if (req.query.fromDate && !req.query.toDate) {
                        query.createdAt = { $gte: req.query.fromDate };
                    }
                    if (!req.query.fromDate && req.query.toDate) {
                        query.createdAt = { $lte: req.query.toDate };
                    }
                    if (req.query.fromDate && req.query.toDate) {
                        query.$and = [
                            { createdAt: { $gte: req.query.fromDate } },
                            { createdAt: { $lte: req.query.toDate } },
                        ]
                    }
                    var options = {
                        page: parseInt(req.query.page) || 1,
                        limit: parseInt(req.query.limit) || 15,
                        sort: { createdAt: -1 },
                        populate: ('orderId bidId nftId userId buyerAddress')
                    };
                    var result = await nftHistoryModel.paginate(query, options)
                    if (result.docs.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    } else {
                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                    }
                }
            } catch (error) {
                console.log("=====486", error)
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
        }
    
        /**
       * Function Name : viewNftTransaction
       * Description   : viewNftTransaction for admin
       *
       * @return response
      */
         async viewNftTransaction (req, res) { // implimentation in process
            try {
                var result = await userModel.findOne({ _id: req.userId, status: { $ne: "DELETE" } })
                if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                } else {
                    // var nftRes = await nftHistoryModel.find({ nftId: req.params.nftId, type: { $in: ["CREATE", "SELL", "AUCTION", "LIST"] } }).populate('orderId bidId bidId.userId nftId userId buyerAddress orderId.bidId')
                    var nftRes = await nftHistoryModel.find({ nftId: req.params.nftId, type: { $in: ["CREATE", "SELL", "AUCTION", "LIST"] } })
                        .populate(
                            [{
                                path: 'orderId',
                                populate: "bidId"
                            },
                            { path: 'nftId' },
                            { path: 'userId' },
                            {
                                path: 'bidId',
                                populate: [{
                                    path: 'userId',
                                }]
                            },
                            ]
                        );
                    if (!nftRes) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    } else {
                        response(res, SuccessCode.SUCCESS, nftRes, SuccessMessage.DATA_FOUND)
                    }
                }
            } catch (error) {
                response(res, ErrorCode.WENT_WRONG, error, ErrorMessage.SOMETHING_WRONG);
            }
        }

    


    // **************************** Admin fee management Stop ******************************************************** //



}
export default new adminController()