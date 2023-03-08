import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()


    .get('/listAllNft', controller.listAllNft)
    .get('/nftCollectionList', controller.nftCollectionList)
    .post('/collectionNftSearch', controller.collectionNftSearch)


    

    .post('/addNFT', controller.addNFT)
    .post('/mintNFT',controller.mintNFT)
    .get('/listNFT', controller.listNFT)
    .get('/nft/:_id', controller.viewNFT)



    .use(auth.verifyToken)
    .post('/ipfsUploadBase64', controller.ipfsUploadBase64)
    .post('/uploadNFT', controller.uploadNFT)
   

    .use(upload.uploadFile)
    .post('/ipfsUpload', controller.ipfsUpload)

