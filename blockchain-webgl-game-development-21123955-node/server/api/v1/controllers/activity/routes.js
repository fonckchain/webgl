import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()


    .get('/nftActivityList', controller.nftActivityList)

    .use(auth.verifyToken)
    .post('/createActivity', controller.createActivity)
    .get('/viewActivity/:_id', controller.viewActivity)
    .put('/editActivity', controller.editActivity)
    .get('/listActivity', controller.listActivity)
    .get('/allListActivity', controller.allListActivity)


    .use(upload.uploadFile)


