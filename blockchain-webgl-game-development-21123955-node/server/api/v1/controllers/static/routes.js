import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";


export default Express.Router()

    .post('/staticContent', controller.addStaticContent)
    .get('/staticContent', controller.viewStaticContent)
    .put('/staticContent', controller.editStaticContent)
    .get('/staticContentList', controller.staticContentList)




    .post('/faq', controller.addFAQ)
    .get('/faq/:_id', controller.viewFAQ)
    .put('/faq', controller.editFAQ)
    .get('/faqList', controller.faqList)
    
    
    
    .get('/announcement/:_id', controller.viewAnnouncement)
    .get('/announcementList', controller.announcementList)
    
    
    .use(auth.verifyToken)
    .post('/announcement', controller.addAnnouncement)
    .put('/announcement', controller.editAnnouncement)
    
    .delete('/announcement', controller.deleteAnnouncement)
    
    .delete('/faq', controller.deleteFAQ)


