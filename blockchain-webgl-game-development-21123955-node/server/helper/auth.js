import config from "config";
import jwt from "jsonwebtoken";
import userModel from "../models/user";
import apiError from './apiError';
import responseMessage from '../../assets/responseMessage';
import requestIp from "request-ip"


module.exports = {

  verifyToken(req, res, next) {
    const clientIp = requestIp.getClientIp(req); 
    console.log("====who is using my IP ====>>>>",clientIp)
    try {
      if (req.headers.token) {
        jwt.verify(req.headers.token, config.get('jwtsecret'), (err, result) => {
          if (err) {
            throw apiError.unauthorized();
          }
          else {
            userModel.findOne({ _id: result.id }, (error, result2) => {
              if (error) {
                return next(error)
              }
              else if (!result2) {
                return next(responseMessage.USER_NOT_FOUND);
              }
              else {
                if (result2.status == "BLOCK") {
                  throw apiError.forbidden(responseMessage.BLOCK_BY_ADMIN);
                }
                else if (result2.status == "DELETE") {
                  throw apiError.unauthorized(responseMessage.DELETE_BY_ADMIN);
                }
                else {
                  req.userId = result.id;
                  req.userDetails = result
                  next();
                }
              }
            })
          }
        })
      } else {
        throw apiError.badRequest(responseMessage.NO_TOKEN);
      }
      
    } catch (error) {
      throw next(error)
    }
  
  },

  verifyTokenBySocket: (token) => {
    return new Promise((resolve, reject) => {
      try {
        if (token) {
          jwt.verify(token, config.get('jwtsecret'), (err, result) => {
            if (err) {
              reject(apiError.unauthorized());
            }
            else {
              userModel.findOne({ _id: result.id }, (error, result2) => {
                if (error)
                  reject(apiError.internal(responseMessage.INTERNAL_ERROR));
                else if (!result2) {
                  reject(apiError.notFound(responseMessage.USER_NOT_FOUND));
                }
                else {
                  if (result2.status == "BLOCK") {
                    reject(apiError.forbidden(responseMessage.BLOCK_BY_ADMIN));
                  }
                  else if (result2.status == "DELETE") {
                    reject(apiError.unauthorized(responseMessage.DELETE_BY_ADMIN));
                  }
                  else {
                    resolve(result.id);
                  }
                }
              })
            }
          })
        } else {
          reject(apiError.badRequest(responseMessage.NO_TOKEN));
        }
      }
      catch (e) {
        reject(e);
      }
    })
  }

}



