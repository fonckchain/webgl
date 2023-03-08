import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()


    .get('/collectionList', controller.collectionList)
    .get('/recentCollectionList', controller.recentCollectionList)

    .get('/viewCollection/:_id', controller.viewCollection)
    .use(auth.verifyToken)
    .put('/editCollection', controller.editCollection)
    .delete('/deleteCollection', controller.deleteCollection)
    .get('/myCollectionList', controller.myCollectionList)


    .use(upload.uploadFile)
    .post('/createCollection', controller.createCollection)



