import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()



    .post('/addBlackMarket', controller.addBlackMarket)
    .get('/listBlackMarket',controller.listBlackMarket)
    .get('/viewBlackMarketData',controller.viewBlackMarketData)
    
    .use(auth.verifyToken)


    .use(upload.uploadFile)


