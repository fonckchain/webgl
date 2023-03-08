import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .post('/createAdmin', controller.addAdmin)
    .post('/login', controller.login)
    .post('/loginAdmin', controller.loginAdmin)
    .post('/forgotPassword', controller.forgotPassword)
    .post('/verifyOTP', controller.verifyOTP)
    .put('/resetPassword', controller.resetPassword)
    .get('/listCategory', controller.listCategory)
    .get('/listNft', controller.listNft)


    .use(auth.verifyToken)
    .get('/listDealer', controller.listDealer)
    .get('/viewDealer', controller.viewDealer)
    
    .get('/viewUser/:_id', controller.viewUser)
    .get('/adminProfile', controller.adminProfile)
    .patch('/changePassword', controller.changePassword)
    .put('/blockUnblockUser', controller.blockUnblockUser)
    // .delete('/deleteUser', controller.deleteUser)

    .delete('/deleteCategory', controller.deleteCategory)
    .get('/listUser', controller.listUser)
    .get('/listArtist', controller.listArtist)
    .put('/blockUnblockNft', controller.blockUnblockNft)
    .post('/reportsList', controller.reportsList)

    .post('/addFees', controller.addFees)
    .delete('/deleteFees', controller.deleteFees)
    .get('/viewFees', controller.viewFees)
    .put('/editFees', controller.editFees)

    .get('/listActivityUsers', controller.listActivityUsers)
    .post('/shareContent', controller.shareContent)
    .get('/userSubscriberList', controller.userSubscriberList)
    .get('/getProfileDealer', controller.getProfileDealer)
    .put('/editDealer', controller.editDealer)
    .get('/Dashbord', controller.Dashbord)
    .get('/approveRequest', controller.approveRequest)
    .get('/rejectRequest', controller.rejectRequest)
    .get('/listRequest', controller.listRequest)



    .post('/subAdmin', controller.addSubadmin)
    .get('/subAdmin', controller.listSubAdmin)
    .get('/subAdmin/:_id', controller.subAdminView)
    .patch('/subAdmin/:_id', controller.blockUnblockSubAdmin)

    



    .use(upload.uploadFile)
    .post('/addCategory', controller.addCategory)
    .put('/editCategory', controller.editCategory)
    .post('/addDealer', controller.addDealer)
    .put('/updateAdminProfile', controller.updateAdminProfile)


