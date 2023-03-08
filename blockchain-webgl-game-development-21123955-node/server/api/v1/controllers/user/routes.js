import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()
   



.post('/connectWallet', controller.connectWallet)





   .use(auth.verifyToken)
   .post('/projectRegistrationRequest',controller.projectRegistrationRequest)
   .post('/collectionRequest',controller.collectionRequest)
   .post('/metadataRequest',controller.metadataRequest)
   .get('/listRequest', controller.listRequest)
   .get('/viewRequest', controller.viewRequest)

   .post('/replyOnAnnouncement',controller.replyOnAnnouncement)
   .get('/viewreplyAnnouncement',controller.viewreplyAnnouncement)
   .get('/listReplyAnnouncement',controller.listReplyAnnouncement)



  

   .use(upload.uploadFile)

