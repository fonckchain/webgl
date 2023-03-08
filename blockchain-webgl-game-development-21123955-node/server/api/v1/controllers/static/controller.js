import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import responseMessage from '../../../../../assets/responseMessage';

import { staticServices } from '../../services/static';
const { createStaticContent, findStaticContent, updateStaticContent, staticContentList } = staticServices;

import { faqServices } from '../../services/faq';
const { createFAQ, findFAQ, updateFAQ, FAQList } = faqServices;

import { announcementServices } from '../../services/announcement';
const { createAnnouncement, findAnnouncement, updateAnnouncement, announcementList } = announcementServices;


import { userServices } from '../../services/user';
const { findUser } = userServices;

import commonFunction from '../../../../helper/util';

import status from '../../../../enums/status';
import userType from '../../../../enums/userType';


export class staticController {

    //**************************  Static management Start *************************************************/
    /**
     * @swagger
     * /static/staticContent:
     *   post:
     *     tags:
     *       - STATIC
     *     description: addStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: addStaticContent
     *         description: addStaticContent
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/addStaticContent'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async addStaticContent(req, res, next) {
        const validationSchema = {
            type: Joi.string().valid('termsConditions', 'privacyPolicy', 'aboutUs').required(),
            title: Joi.string().required(),
            description: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { type, title, description } = validatedBody;
            var result = await createStaticContent({ type: type, title: title, description: description })
            return res.json(new response(result, responseMessage.DATA_SAVED));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/staticContent:
     *   get:
     *     tags:
     *       - STATIC
     *     description: viewStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: type
     *         description: type
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async viewStaticContent(req, res, next) {
        const validationSchema = {
            type: Joi.string().valid('termsConditions', 'privacyPolicy', 'aboutUs').required(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var result = await findStaticContent({ type: validatedBody.type })
            if (!result) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/staticContent:
     *   put:
     *     tags:
     *       - STATIC
     *     description: editStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: editStaticContent
     *         description: editStaticContent
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/editStaticContent'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async editStaticContent(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
            title: Joi.string().optional(),
            description: Joi.string().optional()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let staticRes = await findStaticContent({ _id: req.body._id })
            if (!staticRes) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            var result = await updateStaticContent({ _id: validatedBody._id }, validatedBody)
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/staticContentList:
     *   get:
     *     tags:
     *       - STATIC
     *     description: staticContentList
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async staticContentList(req, res, next) {
        try {
            var result = await staticContentList()
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }


    //**************************  Static management End *************************************************/



    //**************************  FAQs management Start *************************************************/

    /**
     * @swagger
     * /faq/faq:
     *   post:
     *     tags:
     *       - FAQ_MANAGEMENT
     *     description: addFAQ
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: addFAQ
     *         description: addFAQ
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/addFAQ'
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async addFAQ(req, res, next) {
        const validationSchema = {
            question: Joi.string().required(),
            answer: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { question, answer } = validatedBody;
            var result = await createFAQ({ question: question, answer: answer })
            return res.json(new response(result, responseMessage.FAQ_ADDED));
        } catch (error) {
            return next(error);
        }
    }

    /**
      * @swagger
      * /faq/faq/{_id}:
      *   get:
      *     tags:
      *       - FAQ_MANAGEMENT
      *     description: viewFAQ
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: _id
      *         description: _id
      *         in: path
      *         required: true
      *     responses:
      *       200:
      *         description: Returns success message
      */

    async viewFAQ(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
        };
        try {
            const validatedBody = await Joi.validate(req.params, validationSchema);
            var result = await findFAQ({ _id: validatedBody._id })
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
    * @swagger
    * /faq/faq:
    *   put:
    *     tags:
    *       - FAQ_MANAGEMENT
    *     description: editFAQ
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: editFAQ
    *         description: editFAQ
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/editFAQ'
    *     responses:
    *       200:
    *         description: Returns success message
    */

    async editFAQ(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
            question: Joi.string().optional(),
            answer: Joi.string().optional()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var result = await updateFAQ({ _id: validatedBody._id }, validatedBody)
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
    * @swagger
    * /faq/faq:
    *   delete:
    *     tags:
    *       - FAQ_MANAGEMENT
    *     description: deleteFAQ
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token
    *         in: header
    *         required: true
    *       - name: deleteFAQ
    *         description: deleteFAQ
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/deleteFAQ'
    *     responses:
    *       200:
    *         description: Returns success message
    */

    async deleteFAQ(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: { $in:userType.ADMIN } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var faqInfo = await findFAQ({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!faqInfo) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            let deleteRes = await updateFAQ({ _id: faqInfo._id }, { $set:{status: status.DELETE }});
            return res.json(new response(deleteRes, responseMessage.DELETE_SUCCESS));
        } catch (error) {
            console.log("=====error===",error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /faq/faqList:
     *   get:
     *     tags:
     *       - FAQ_MANAGEMENT
     *     description: faqList
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async faqList(req, res, next) {
        let validationSchema={
            page:Joi.number().optional(),
            limit:Joi.number().optional()
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { page, limit } = validatedBody;
            var result = await FAQList(validatedBody)
            if(result.docs.length==0)throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            console.log("=====??",error)
            return next(error);
        }
    }


    //**************************  FAQs management End *************************************************/





    //**************************  Announcement management Start *************************************************/


    /**
         * @swagger
         * /announcement/announcement:
         *   post:
         *     tags:
         *       - ANNOUNCEMENT_MANAGEMENT
         *     description: addAnnouncement
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: token
         *         description: token
         *         in: header
         *         required: true
         *       - name: addAnnouncement
         *         description: addAnnouncement
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/addAnnouncement'
         *     responses:
         *       200:
         *         description: Returns success message
         */

    async addAnnouncement(req, res, next) {
        const validationSchema = {
            title: Joi.string().required(),
            description: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { title, description } = validatedBody;
            let userToken = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!userToken) throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            var result = await createAnnouncement({ title: title, description: description, userId: userToken._id })
            return res.json(new response(result, responseMessage.ANNOUNCEMENT_ADDED));
        } catch (error) {
            return next(error);
        }
    }

    /**
      * @swagger
      * /announcement/announcement/{_id}:
      *   get:
      *     tags:
      *       - ANNOUNCEMENT_MANAGEMENT
      *     description: viewAnnouncement
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: _id
      *         description: _id
      *         in: path
      *         required: true
      *     responses:
      *       200:
      *         description: Returns success message
      */

    async viewAnnouncement(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
        };
        try {
            const validatedBody = await Joi.validate(req.params, validationSchema);
            var announcementResult = await findAnnouncement({ _id: validatedBody._id })
            if (!announcementResult) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            return res.json(new response(announcementResult, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
    * @swagger
    * /announcement/announcement:
    *   put:
    *     tags:
    *       - ANNOUNCEMENT_MANAGEMENT
    *     description: editAnnouncement
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token
    *         in: header
    *         required: true
    *       - name: editAnnouncement
    *         description: editAnnouncement
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/editAnnouncement'
    *     responses:
    *       200:
    *         description: Returns success message
    */

    async editAnnouncement(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
            title: Joi.string().optional(),
            description: Joi.string().optional()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userToken = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!userToken) throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            let announcementfind = await findAnnouncement({ _id: validatedBody._id })
            if (!announcementfind) throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            var result = await updateAnnouncement({ _id: validatedBody._id }, validatedBody)
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
    * @swagger
    * /announcement/announcement:
    *   delete:
    *     tags:
    *       - ANNOUNCEMENT_MANAGEMENT
    *     description: deleteAnnouncement
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token
    *         in: header
    *         required: true
    *       - name: deleteAnnouncement
    *         description: deleteAnnouncement
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/deleteAnnouncement'
    *     responses:
    *       200:
    *         description: Returns success messsage
    */

    async deleteAnnouncement(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, userType: { $in: "ADMIN" } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var announcementInfo = await findAnnouncement({ _id: validatedBody._id, status: { $ne: status.DELETE } });
            if (!announcementInfo) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            let deleteRes = await updateAnnouncement({ _id: announcementInfo._id }, { $set:{status: status.DELETE} });
            return res.json(new response(deleteRes, responseMessage.DELETE_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /announcement/announcementList:
     *   get:
     *     tags:
     *       - ANNOUNCEMENT_MANAGEMENT
     *     description: faqList
     *     produces:
     *       - application/json
     *     parameters:
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

    async announcementList(req, res, next) {
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
            var result = await announcementList(validatedBody)
            if(result.length==0)throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }






    //**************************  Announcement management End *************************************************/





}

export default new staticController()