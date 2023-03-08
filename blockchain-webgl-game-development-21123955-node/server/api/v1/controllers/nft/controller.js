import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import responseMessage from '../../../../../assets/responseMessage';
import { userServices } from '../../services/user';
import { collectionServices } from '../../services/collection';
import { nftServices } from '../../services/nft';
import { notificationServices } from '../../services/notification';
import { transactionServices } from '../../services/transaction';
import { activityServices } from '../../services/activity';


const { userCheck, findUser, findUserData, createUser, updateUser, updateUserById, userSubscriberList } = userServices;
const { createCollection, findCollection, updateCollection, collectionList, collectionList1, collectionPaginateSearch, myCollectionPaginateSearch } = collectionServices;
const { createNft, findAll, nftCollectionList, collectionNftSearch, findNft, updateNft, nftList, nftPaginateSearch, myNftPaginateSearch, nftListWithAggregate, listAllNft, multiUpdate, nftListWithAggregatePipeline, findNftWithPopulateDetails } = nftServices;
const { createNotification, findNotification, updateNotification, multiUpdateNotification, notificationList, notificationListWithSort } = notificationServices;
const { createTransaction, findTransaction, updateTransaction, transactionList } = transactionServices;
const { createActivity, findActivity, updateActivity, paginateUserOwendActivity, paginateActivity, activityList } = activityServices;


import commonFunction from '../../../../helper/util';
import status from '../../../../enums/status';
import userType from "../../../../enums/userType";
import fs from 'fs';
import ipfsClient from 'ipfs-http-client';
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
import base64ToImage from 'base64-to-image';
import doAsync from 'doasync';

export class nftController {

    /**
     * @swagger
     * /nft/ipfsUpload:
     *   post:
     *     tags:
     *       - NFT MANAGEMENT
     *     description: ipfsUpload
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: file
     *         description: file
     *         in: formData
     *         type: file
     *         required: true
     *     responses:
     *       creatorAddress: Joi.string().optional(),
     *       200:
     *         description: Returns success message
     */

    async ipfsUpload(req, res, next) {
        try {

            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            console.log("104===>>", req.files)
            const fileName = req.files[0].filename;
            const filePath = req.files[0].path;
            let type = req.files[0].mimetype;
            const fileHash = await addFile(fileName, filePath);
            await deleteFile(filePath);
            let tokenData = {
                image: "https://ipfs.io/ipfs/" + fileHash // hash
            }
            let ipfsRes = await ipfsUpload(tokenData);
            let result = { ipfsHash: ipfsRes, fileHash: fileHash, imageUrl: tokenData.image, type: type };
            console.log("77------", result);
            return res.json(new response(result, responseMessage.DETAILS_FETCHED));
        }
        catch (error) {
            console.log("======error", error)
            return next(error);
        }
    }


    /**
     * @swagger
     * /nft/ipfsUploadBase64:
     *   post:
     *     tags:
     *       - NFT MANAGEMENT
     *     description: ipfsUploadBase64
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: image
     *         description: image?? base 64
     *         in: formData
     *         required: true
     *     responses:
     *       creatorAddress: Joi.string().optional(),
     *       200:
     *         description: Returns success message
     */

    async ipfsUploadBase64(req, res, next) {
        try {
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            const fileHash = await addBase64File(req.body.image);
            let tokenData = {
                image: "https://ipfs.io/ipfs/" + fileHash // hash
            }
            let ipfsRes = await ipfsUpload(tokenData);
            let result = { ipfsHash: ipfsRes, fileHash: fileHash, imageUrl: tokenData.image };
            return res.json(new response(result, responseMessage.DETAILS_FETCHED));
        }
        catch (error) {
            return next(error);
        }
    }


    /**
    * @swagger
    * /nft/uploadNFT:
    *   post:
    *     tags:
    *       - NFT MANAGEMENT
    *     description: uploadNFT
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token
    *         in: header
    *         required: true
    *       - name: tokenName
    *         description: tokenName
    *         in: formData
    *         required: false
    *       - name: description
    *         description: description
    *         in: formData
    *         required: false
    *       - name: image
    *         description: image
    *         in: formData
    *         required: false
    *     responses:
    *       creatorAddress:
    *       200:
    *         description: Returns success message
    */

    async uploadNFT(req, res, next) {
        const validationSchema = {
            tokenName: Joi.string().optional(),
            description: Joi.string().optional(),
            image: Joi.string().optional(),
        }
        try {
            const { tokenName, description, image } = await Joi.validate(req.body, validationSchema);
            let tokenData = {
                name: tokenName ? tokenName : "Test",
                description: description ? description : "Testing Data",
                image: image // hash
            }
            let ipfsRes = await ipfsUpload(tokenData);
            tokenData.ipfsHash = ipfsRes;
            return res.json(new response(tokenData, responseMessage.DETAILS_FETCHED));
        }
        catch (error) {
            return next(error);
        }
    }



    /**
       * @swagger
       * /nft/addNFT:
       *   post:
       *     tags:
       *       - NFT MANANGEMENT
       *     description: addNFT
       *     produces:
       *       - application/json
       *     parameters:
       *       - name: addNFT
       *         description: addNFT
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/addNFT'
       *     responses:
       *       200:
       *         description: Returns success message
       */

    async addNFT(req, res, next) {
        try {
            let validationSchema = {
                walletAddress: Joi.string().required(),
                nfts: Joi.array().items(Joi.object()).optional()
            };
            var validatedBody = await Joi.validate(req.body, validationSchema);
            let data = [];
            let result;
            for (let reqDataObj of validatedBody.nfts) {
                reqDataObj['walletAddress'] = validatedBody.walletAddress;
                let nftData = await findNft({ 'sell.data.token_id': reqDataObj.sell.data.token_id, 'sell.data.token_address': reqDataObj.sell.data.token_address });
                if (!nftData) {
                    result = await createNft(reqDataObj);
                }
            }
            return res.json(new response(result, responseMessage.DATA_SAVED));
        } catch (error) {
            console.log("===236", error)
            return next(error);
        }
    }


    /**
   * @swagger
   * /nft/mintNFT:
   *   post:
   *     tags:
   *       - NFT MANANGEMENT
   *     description: addNFT
   *     produces:
   *       - application/json   
   *     parameters:
   *       - name: walletAddress
   *         description: walletAddress
   *         in: formData
   *         required: true
   *       - name: token_id
   *         description: token_id
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */

    async mintNFT(req, res, next) {
        let validationSchema = {
            walletAddress: Joi.string().required(),
            token_id: Joi.string().required(),
        };
        try {
            var validatedBody = await Joi.validate(req.body, validationSchema);
            let walletRes = await findNft({ $or: [{ "sell.data.token_id": validatedBody.token_id }, { token_id: validatedBody.token_id }] })
            if (walletRes) {
                throw apiError.conflict(responseMessage.ALREADY_MINTED);
            }
            validatedBody.walletAddress = validatedBody.walletAddress;
            validatedBody.token_id = validatedBody.token_id;

            let finalRes = await createNft(validatedBody)
            return res.json(new response(finalRes, responseMessage.DATA_SAVED));
        } catch (error) {
            console.log("===236", error)
            return next(error);
        }
    }

    async listUplaceNft(req,res,next){
        try {
            let unplaceNft = await findAll({})
            if(unplaceNft.length==0){
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            return res.json(new response(unplaceNft, responseMessage.DATA_SAVED));
            
        } catch (error) {
            throw next(error)
        }
    }


    /**
       * @swagger
       * /nft/nftCollectionList:
       *   get:
       *     tags:
       *       - NFT MANANGEMENT
       *     description: nftCollectionList
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Returns success message
       */

    async nftCollectionList(req, res, next) {
        try {
            let result = await nftCollectionList();
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }


    /**
      * @swagger
      * /nft/collectionNftSearch:
      *   post:
      *     tags:
      *       - NFT MANANGEMENT
      *     description: collectionNftSearch
      *     produces:
      *       - application/json
      *     parameters:
      *       - in: body
      *         name: collectionNftSearch 
      *         description: collectionNftSearch.
      *         schema:
      *           type: array
      *           properties:
      *             search:
      *               type: array
      *               items:
      *                 type: string
      *     responses:
      *       200:
      *         description: Returns success message
      */
    
    async collectionNftSearch(req, res, next) {
        try {
            let validationSchema = {
                search: Joi.array().items(Joi.string()).optional()
            };
            var { search } = await Joi.validate(req.body, validationSchema);
            let result = await collectionNftSearch(search);
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /nft/nft/{_id}:
     *   get:
     *     tags:
     *       - NFT MANANGEMENT
     *     description: viewNFT
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

    async viewNFT(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        }
        try {
            const { _id } = await Joi.validate(req.params, validationSchema);
            var nftResult = await findNft({ _id: _id });
            if (!nftResult) {
                throw apiError.conflict(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(nftResult, responseMessage.DETAILS_FETCHED));
        }
        catch (error) {
            return next(error);
        }
    }



    // /**
    //    * @swagger
    //    * /nft/listNFT:
    //    *   get:
    //    *     tags:
    //    *       - NFT MANAGEMENT
    //    *     description: listNFT
    //    *     produces:
    //    *       - application/json
    //    *     parameters:
    //    *       - name: token
    //    *         description: token
    //    *         in: header
    //    *         required: true
    //    *       - name: search
    //    *         description: search ?? tokenId || tokenName 
    //    *         in: query
    //    *         required: false
    //    *     responses:
    //    *       200:
    //    *         description: Returns success message
    //    */

    async listNFT(req, res, next) {
        const validationSchema = {
            search: Joi.string().optional(),
        }
        try {
            console.log(req.query)
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let dataResults = await nftListWithAggregatePipeline(validatedBody, userResult._id);
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));
        }
        catch (error) {
            return next(error);
        }

    }


    // /**
    //  * @swagger
    //  * /nft/listAllNft:
    //  *   get:
    //  *     tags:
    //  *       - NFT MANAGEMENT
    //  *     description: listAllNft
    //  *     produces:
    //  *       - application/json
    //  *     parameters:
    //  *       - name: search
    //  *         description: search ?? tokenId || tokenName  || contractAddress
    //  *         in: query
    //  *         required: false
    //  *     responses:
    //  *       200:
    //  *         description: Returns success message
    //  */

    async listAllNft(req, res, next) {
        const validationSchema = {
            search: Joi.string().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let dataResults = await listAllNft(validatedBody);
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));
        }
        catch (error) {
            return next(error);
        }
    }


 

}

export default new nftController()


const ipfsUpload = async (tokenData) => {
    try {
        const { cid } = await ipfs.add({ content: JSON.stringify(tokenData) }, { cidVersion: 0, hashAlg: 'sha2-256' });
        console.log('cid', cid.toString());
        await ipfs.pin.add(cid);
        return cid.toString()
    } catch (error) {
        console.log('error', error);
    }
}

const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({ path: fileName, content: file }, { cidVersion: 0, hashAlg: 'sha2-256' });
    const fileHash = fileAdded.cid.toString();
    await ipfs.pin.add(fileAdded.cid);
    console.log("Line no 942===cid======>>>", fileHash);
    return fileHash;
}


const addBase64File = async (base64) => {
    let fileName = "image";
    var optionalObj = { 'fileName': fileName, 'type': 'png' };
    var imageInfo = base64ToImage(base64, rawImage, optionalObj);
    let filePath = `${rawImage}${fileName}.png`;
    const file = await readData(filePath);
    const fileAdded = await ipfs.add({ path: fileName, content: file }, { cidVersion: 0, hashAlg: 'sha2-256' });
    const fileHash = fileAdded.cid.toString();
    await ipfs.pin.add(fileAdded.cid);
    deleteFile(filePath);
    return fileHash;
}

const readData = async (path) => {
    return new Promise((resolve, reject) => {
        doAsync(fs).readFile(path).then((data) => {
            console.log("185====>>>>>>", data)
            resolve(data)
        })
    })
}

const deleteFile = async (filePath) => {
    fs.unlink(filePath, (deleteErr) => {
        if (deleteErr) {
            console.log("Error: failed to delete the file", deleteErr);
        }
    })
}

const alluserNotificationTrigger = async (nftId, description, image) => {
    let userData = await userSubscriberList({ userType: "User" });
    for (let i of userData) {
        let obj = {
            title: `New Bundle Alert!`,
            notificationType: "Bundle_Create",
            description: description,
            userId: i._id,
            nftIds: nftId,
            image: image
        }
        await createNotification(obj);
    }
}

const notificattionToAllSubscriber = async (subscriberList, description, image) => {
    console.log("subscriberList===>>", subscriberList)
    for (let i of subscriberList) {
        let obj = {
            title: `New Bundle Alert!`,
            notificationType: "Bundle_Create",
            description: description,
            userId: i,
            image: image
        }
        await createNotification(obj);
    }

}
