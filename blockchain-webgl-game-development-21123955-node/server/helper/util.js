import config from "config";
import jwt from 'jsonwebtoken';
import Sender from 'aws-sms-send';
const fs = require('fs');
var aws_topic = 'arn:aws:sns:us-east-1:729366371820:coinbaazar';
var config2 = {
  AWS: {
    accessKeyId: config.get('AWS.accessKeyId'),
    secretAccessKey: config.get('AWS.secretAccessKey'),
    region: config.get('AWS.region')
  },
  topicArn: aws_topic,
};

var sender = new Sender(config2);

import nodemailer from 'nodemailer';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: config.get('cloudinary.cloud_name'),
  api_key: config.get('cloudinary.api_key'),
  api_secret: config.get('cloudinary.api_secret')
});

import twilio from 'twilio';
const accountSid = config.get('twilio.accountSid');
const authToken = config.get('twilio.authToken');
const client = require('twilio')(accountSid, authToken);
import qrcode from 'qrcode';


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.get("sendGridKey"));

module.exports = {

  getOTP() {
    var otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
  },

  dateTime() {
    var today = new Date(new Date() - new Date().getTimezoneOffset() * 60 * 1000).toISOString();
    var check = "";
    check = today.split(".")[0].split("T")
    var time = check[1].split(":")[0] > "11" ? " PM" : " AM"
    check = check[0].split("-").reverse().join("/") + " " + check[1] + time;
    return check
  },

  sendSms: (number, otp) => {
    sender.sendSms(`Your otp is ${otp}`, config.get('AWS.smsSecret'), false, number)
      .then(function (response) {
        return response;
      })
      .catch(function (err) {
        return err;
      })

  },

  getToken: async (payload) => {
    var token = await jwt.sign(payload, config.get('jwtsecret'), { expiresIn: "24h" })
    return token;
  },

  sendMail: async (to, subject, body) => {
    var transporter = nodemailer.createTransport({
      service: config.get('nodemailer.service'),
      auth: {
        "user": config.get('nodemailer.email'),
        "pass": config.get('nodemailer.password')
      }
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: to,
      subject: subject,
      text: body
    };
    return await transporter.sendMail(mailOptions)
  },

  sendMailContentWithNodemailer: async (email, password, walletAddress) => {
    let html = `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]>
            <!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--
              <![endif]-->
    <title></title>
    <style type="text/css">
      table,
      td {
        color: #000000;
      }
  
      a {
        color: #0000ee;
        text-decoration: underline;
      }
  
      @media only screen and (min-width: 670px) {
        .u-row {
          width: 650px !important;
        }
  
        .u-row .u-col {
          vertical-align: top;
        }
  
        .u-row .u-col-100 {
          width: 650px !important;
        }
      }
  
      @media (max-width: 670px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
  
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
  
        .u-row {
          width: calc(100% - 40px) !important;
        }
  
        .u-col {
          width: 100% !important;
        }
  
        .u-col>div {
          margin: 0 auto;
        }
      }
  
      body {
        margin: 0;
        padding: 0;
      }
  
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
  
      p {
        margin: 0;
      }
  
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
  
      * {
        line-height: inherit;
      }
  
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
    </style>
    <!--[if !mso]>
              <!-->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <!--
                <![endif]-->
  </head>
  
  <body class="clean-body u_body"
    style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
    <!--[if IE]>
                <div class="ie-container">
                  <![endif]-->
    <!--[if mso]>
                  <div class="mso-container">
                    <![endif]-->
    <table
      style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%"
      cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]>
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td align="center" style="background-color: #ffffff;">
                                  <![endif]-->
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row"
                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #dff1ff;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]>
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                            <td style="padding: 0px;background-color: transparent;" align="center">
                                              <table cellpadding="0" cellspacing="0" border="0" style="width:650px;">
                                                <tr style="background-color: #dff1ff;">
                                                  <![endif]-->
                  <!--[if (mso)|(IE)]>
                                                  <td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top">
                                                    <![endif]-->
                  <div class="u-col u-col-100"
                    style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                      <!--[if (!mso)&(!IE)]>
                                                        <!-->
                      <div
                        stestingmailtyle="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--
                                                          <![endif]-->
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0"
                          cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:30px 0px;font-family:'Montserrat',sans-serif;background-color: #8#F6F0BC;"
                                align="center">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                        <img align="center" border="0"
                                          src="https://newchatmodule.s3.amazonaws.com/uploads/16564000645891656400064509_logo.png"
                                          alt="Image" title="Image"
                                          style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: 200%;float: none;width: 180%;max-width: 197px;"
                                          width="117">
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0"
                          cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Montserrat',sans-serif;"
                                align="left">
                                <div style="color: #018eea; line-height: 170%; text-align: left; word-wrap: break-word;">
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if (!mso)&(!IE)]>
                                                            <!-->
                      </div>
                      <!--
                                                          <![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]>
                                                    </td>
                                                    <![endif]-->
                  <!--[if (mso)|(IE)]>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                          <![endif]-->
                </div>
              </div>
            </div>
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row"
                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f3fbfd;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]>
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                              <td style="padding: 0px;background-color: transparent;" align="center">
                                                <table cellpadding="0" cellspacing="0" border="0" style="width:650px;">
                                                  <tr style="background-color: #f3fbfd;">
                                                    <![endif]-->
                  <!--[if (mso)|(IE)]>
                                                    <td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top">
                                                      <![endif]-->
                  <div class="u-col u-col-100"
                    style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                      <!--[if (!mso)&(!IE)]>
                                                          <!-->
                      <div
                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--
                                                            <![endif]-->
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0"
                          cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px 50px 20px;font-family:'Montserrat',sans-serif;"
                                align="left">
                                <div
                                  style="color: #1b262c; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <br>
                                  <br>
                                  <p style="font-size: 14px; line-height: 140%;">   Dear , <br>
                      Welcome on Webgl_Plateform <br>Here your login crediantial</br> </b><b>Email: ${email}</b>
                      <br><b>Password:${password}</b></br>
                      <br><b>WalletAddres:${walletAddress}</b> </br>
                                    <br>
                                    <b>
                                      
                                  <br>
                                  <p>Thanks and Regards, <br>
                                    <b>WebGl_Game_development</b>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0"
                          cellspacing="0" width="100%" border="0">
                          <tbody>
                            <td style="" align="left">
                              <div align="center">
                                <!--[if mso]>
                                                                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;">
                                                                                    <tr>
                                                                                      <td style="font-family:'Montserrat',sans-serif;" align="center">
                                                                                        <v:roundrect
                                                                                          xmlns:v="urn:schemas-microsoft-com:vml"
                                                                                          xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:48px; v-text-anchor:middle; width:290px;" arcsize="125%" stroke="f" fillcolor="#0088ee">
                                                                                          <w:anchorlock/>
                                                                                          <center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;">
                                                                                            <![endif]-->
                                <a href="link" target="_blank"
                                  style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #0088ee; border-radius: 60px;-webkit-border-radius: 60px; -moz-border-radius: 60px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-color: #CCC; border-top-style: solid; border-top-width: 0px; border-left-color: #CCC; border-left-style: solid; border-left-width: 0px; border-right-color: #CCC; border-right-style: solid; border-right-width: 0px; border-bottom-color: #0275a4; border-bottom-style: solid; border-bottom-width: 5px;"></a>
                                <!--[if mso]>
                                                                                          </center>
                                                                                        </v:roundrect>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                  <![endif]-->
                              </div>
                            </td>
                            <tr></tr>
                          </tbody>
                        </table>
                        <!--[if (!mso)&(!IE)]>
                                                                          <!-->
                      </div>
                      <!--
                                                                        <![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]>
                                                                  </td>
                                                                  <![endif]-->
                  <!--[if (mso)|(IE)]>
                                                                </tr>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                        <![endif]-->
                </div>
              </div>
            </div>
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row"
                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #DFF1FF;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                  <br>
                  <!--[if (mso)|(IE)]>
                                                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                              <td style="padding: 0px;background-color: transparent;" align="center">
                                                                <table cellpadding="0" cellspacing="0" border="0" style="width:650px;">
                                                                  <tr style="background-color: #151418;">
                                                                    <![endif]-->
                  <!--[if (mso)|(IE)]>
                                                                    <td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top">
                                                                      <![endif]-->
                  <div class="u-col u-col-100"
                    style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                    <div style="width: 100% !important;">
                      <!--[if (!mso)&(!IE)]>
                                                                          <!-->
                      <div
                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--
                                                                            <![endif]-->
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0"
                          cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:18px;font-family:'Montserrat',sans-serif;background-color: #DFF1FF;"
                                align="left">
                                <div style="color: #00000; line-height: 150%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">
                                    <span style="font-size: 14px; line-height: 19.6px;"><b></b>Copyright@ 2022 WebGl</b></span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if (!mso)&(!IE)]>
                                                                            <!-->
                      </div>
                      <!--
                                                                          <![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]>
                                                                    </td>
                                                                    <![endif]-->
                  <!--[if (mso)|(IE)]>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                          <![endif]-->
                </div>
              </div>
            </div>
            <!--[if (mso)|(IE)]>
                                                  </td>
                                                </tr>
                                              </table>
                                              <![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]>
                                    </div>
                                    <![endif]-->
    <!--[if IE]>
                                  </div>
                                  <![endif]-->
  </body>
  
  </html>`
    console.log("===================")
    var transporter = nodemailer.createTransport({
      service: config.get('nodemailer.service'),
      auth: {
        "user": config.get('nodemailer.email'),
        "pass": config.get('nodemailer.password')
      }
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: email,
      subject: "Blockckain_WebGl_game_Development",
      text: body,
      html: html,

    };
    console.log("==============mailOptions======", mailOptions)
    return await transporter.sendMail(mailOptions)
  },


  sendMailContent: async (to, password ,walletAddress) => {
    try {
        const msg = {
            from: 'no-replymailer@mobiloitte.com',
            to: to,
            subject: "Blockckain_WebGl_game_Development",
            html: `<!DOCTYPE HTML
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title></title>
        
            <style type="text/css">
                @media only screen and (min-width: 620px) {
                    .u-row {
                        width: 600px !important;
                    }
        
                    .u-row .u-col {
                        vertical-align: top;
                    }
        
                    .u-row .u-col-100 {
                        width: 600px !important;
                    }
        
                }
        
                @media (max-width: 620px) {
                    .u-row-container {
                        max-width: 100% !important;
                        padding-left: 0px !important;
                        padding-right: 0px !important;
                    }
        
                    .u-row .u-col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
        
                    .u-row {
                        width: calc(100% - 40px) !important;
                    }
        
                    .u-col {
                        width: 100% !important;
                    }
        
                    .u-col>div {
                        margin: 0 auto;
                    }
                }
        
                body {
                    margin: 0;
                    padding: 0;
                }
        
                table,
                tr,
                td {
                    vertical-align: top;
                    border-collapse: collapse;
                }
        
                p {
                    margin: 0;
                }
        
                .ie-container table,
                .mso-container table {
                    table-layout: fixed;
                }
        
                * {
                    line-height: inherit;
                }
        
                a[x-apple-data-detectors='true'] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
        
                table,
                td {
                    color: #000000;
                }
        
                a {
                    color: #0000ee;
                    text-decoration: underline;
                }
        
                @media (max-width: 480px) {
                    #u_content_image_1 .v-container-padding-padding {
                        padding: 25px 10px 10px !important;
                    }
        
                    #u_content_image_1 .v-src-width {
                        width: auto !important;
                    }
        
                    #u_content_image_1 .v-src-max-width {
                        max-width: 32% !important;
                    }
        
                    #u_content_image_1 .v-text-align {
                        text-align: center !important;
                    }
        
                    #u_content_heading_2 .v-container-padding-padding {
                        padding: 15px 30px !important;
                    }
        
                    #u_content_heading_2 .v-font-size {
                        font-size: 18px !important;
                    }
        
                    #u_content_heading_2 .v-text-align {
                        text-align: center !important;
                    }
        
                    #u_content_heading_2 .v-line-height {
                        line-height: 130% !important;
                    }
        
                    #u_content_image_2 .v-container-padding-padding {
                        padding: 10px !important;
                    }
        
                    #u_content_image_2 .v-src-width {
                        width: auto !important;
                    }
        
                    #u_content_image_2 .v-src-max-width {
                        max-width: 24% !important;
                    }
        
                    #u_column_5 .v-col-background-color {
                        background-color: #e8fce5 !important;
                    }
        
                    #u_content_text_1 .v-container-padding-padding {
                        padding: 40px 15px 70px 20px !important;
                    }
        
                    #u_column_4 .v-col-background-color {
                        background-color: #242526 !important;
                    }
        
                    #u_content_heading_3 .v-container-padding-padding {
                        padding: 15px 15px 20px !important;
                    }
        
                    #u_content_heading_3 .v-font-size {
                        font-size: 15px !important;
                    }
        
                    #u_content_social_1 .v-container-padding-padding {
                        padding: 15px 10px 20px !important;
                    }
                }
            </style>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"
                type="text/css">
        </head>
        
        <body class="clean-body u_body"
            style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
            <table
                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%"
                cellpadding="0" cellspacing="0">
                <tbody>
                    <tr style="vertical-align: top;background-color: #e9e9e9;">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #bfedd2;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div class="u-col u-col-100"
                                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                            <div class="v-col-background-color"
                                                style="background-color: #c7b1f1;width: 100% !important;">
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                    <table id="u_content_image_1"
                                                        style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:22px;font-family:arial,helvetica,sans-serif;"
                                                                    align="left">
                                                                    <table width="100%" cellpadding="0" cellspacing="0"
                                                                        border="0">
                                                                        <tr>
                                                                            <td class="v-text-align"
                                                                                style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center">
                                                                                <a href="https://metahorse-admin.mobiloitte.org/"
                                                                                    target="_blank">
                                                                                    <img align="center" border="10%"
                                                                                        src="https://newchatmodule.s3.amazonaws.com/uploads/16564000645891656400064509_logo.png"
                                                                                        alt="Logo" title="Logo"
                                                                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 176px;"
                                                                                        width="176"
                                                                                        class="v-src-width v-src-max-width" />
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div class="u-col u-col-100"
                                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                            <div class="v-col-background-color"
                                                style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                    <!--<![endif]-->
                                                    <br />
                                                    <table id="u_content_image_2"
                                                        style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;"
                                                                    align="left">
        
                                                                    <table width="100%" cellpadding="0" cellspacing="0"
                                                                        border="0">
                                                                        <tr>
                                                                            <td class="v-text-align"
                                                                                style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center">
        
                                                                                <img align="center" border="0" 
                                                                                    src="https://res.cloudinary.com/mobiloittetech/image/upload/v1653115858/zejhfxxytuwbvte2ajnq.png"
                                                                                    alt="Hero Image" title="Hero Image"
                                                                                    style="background-color: #242526; outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 20%;max-width: 120px;"
                                                                                    width="120"
                                                                                    class="v-src-width v-src-max-width" />
        
                                                                            </td>
                                                                        </tr>
                                                                    </table>
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
        
                                                    <table id="u_content_heading_2"
                                                        style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px;font-family:arial,helvetica,sans-serif;"
                                                                    align="left">
        
                                                                    <h3 class="v-text-align v-line-height v-font-size"
                                                                        style="margin: 0px; color: #2f3448; line-height: 130%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Montserrat',sans-serif; font-size: 18px;">
                                                                        <strong>Sub-Admin credential</strong>
                                                                    </h3>
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ddf2fe;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div id="u_column_5" class="u-col u-col-100"
                                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                            <div class="v-col-background-color"
                                                style="background-color: #e8fce5;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                    <!--<![endif]-->
        
                                                    <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;"
                                                        role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                        border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:44px 55px 70px;font-family:arial,helvetica,sans-serif;"
                                                                    align="left">
        
                                                                    <div class="v-text-align v-line-height"
                                                                        style="color: #536475; line-height: 180%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="text-align: center; font-size: 14px; line-height: 180%;">
                                                                            <span
                                                                                style="color: #000000; font-size: 14px; line-height: 25.2px;">Dear, Here your login credential :</span>
                                                                        </p>
                                                                        <p
                                                                            style="text-align: center; font-size: 14px; line-height: 180%;">
                                                                            <span
                                                                                style="font-size: 14px; line-height: 32.4px; color: #242526;"><strong>Email: ${to} <br>Password: ${password} <br>walletAddress: ${walletAddress}</strong></span>
                                                                        </p>
                                                                        <p
                                                                            style="text-align: center; font-size: 14px; line-height: 180%;">
                                                                            <span
                                                                                style="color: #000000; font-size: 14px; line-height: 25.2px;">kindly use this credential for login</span>
                                                                        </p>
                                                                    </div>
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #489066;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div id="u_column_4" class="u-col u-col-100"
                                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                            <div class="v-col-background-color"
                                                style="background-color: #c7b1f1;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                    <!--<![endif]-->
        
                                                    <table id="u_content_heading_3"
                                                        style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                    align="left">
        
                                                                    <h4 class="v-text-align v-line-height v-font-size"
                                                                        style="margin: 0px; color: #0a0a0a; line-height: 120%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: trebuchet ms,geneva; font-size: 16px;">
                                                                        If you do not recognize this activity, immediately
                                                                        contact us.
                                                                    </h4>
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
        
                                                    <table id="u_content_social_1"
                                                        style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 20px;font-family:arial,helvetica,sans-serif;"
                                                                    align="left">
        
                                                                    <div align="center">
                                                                        <div style="display: table; max-width:187px;">
                                                                            <table align="left" border="0" cellspacing="0"
                                                                                cellpadding="0" width="32" height="32"
                                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                                <tbody>
                                                                                    <tr style="vertical-align: top">
                                                                                        <td align="left" valign="middle"
                                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <a href="https://instagram.com/"
                                                                                                title="Instagram"
                                                                                                target="_blank">
                                                                                                <img src="https://res.cloudinary.com/mobiloittetech/image/upload/v1653115941/u3ueuj5ycgnu5bvgsxvf.png"
                                                                                                    alt="Instagram"
                                                                                                    title="Instagram" width="32"
                                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                            </a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table align="left" border="0" cellspacing="0"
                                                                                cellpadding="0" width="32" height="32"
                                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                                <tbody>
                                                                                    <tr style="vertical-align: top">
                                                                                        <td align="left" valign="middle"
                                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <a href="https://facebook.com/"
                                                                                                title="Facebook"
                                                                                                target="_blank">
                                                                                                <img src="https://res.cloudinary.com/mobiloittetech/image/upload/v1653115978/wsqtae7yj9soemzbbzmk.png"
                                                                                                    alt="Facebook"
                                                                                                    title="Facebook" width="32"
                                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                            </a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table align="left" border="0" cellspacing="0"
                                                                                cellpadding="0" width="32" height="32"
                                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                                <tbody>
                                                                                    <tr style="vertical-align: top">
                                                                                        <td align="left" valign="middle"
                                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <a href="https://twitter.com/"
                                                                                                title="Twitter" target="_blank">
                                                                                                <img src="https://res.cloudinary.com/mobiloittetech/image/upload/v1653116027/pksbs4anusm6l4a00piz.png"
                                                                                                    alt="Twitter"
                                                                                                    title="Twitter" width="32"
                                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                            </a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table align="left" border="0" cellspacing="0"
                                                                                cellpadding="0" width="32" height="32"
                                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                                <tbody>
                                                                                    <tr style="vertical-align: top">
                                                                                        <td align="left" valign="middle"
                                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <a href="https://linkedin.com/"
                                                                                                title="LinkedIn"
                                                                                                target="_blank">
                                                                                                <img src="https://res.cloudinary.com/mobiloittetech/image/upload/v1653116062/vq46dcyqulhmrkzs6cm8.png"
                                                                                                    alt="LinkedIn"
                                                                                                    title="LinkedIn" width="32"
                                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                            </a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div class="u-col u-col-100"
                                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                            <div
                                                style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                
                                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;"
                                                                    align="left">
        
                                                                    <table width="100%" cellpadding="0" cellspacing="0"
                                                                        border="0">
                                                                    </table>
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
        </html>`
      };
      return await sgMail.send(msg);
    } catch (error) {
      throw error;
    }
  },




  getImageUrl: async (files) => {
    console.log("===103", files)
    var result = await cloudinary.v2.uploader.upload(files[0].path)
    console.log("getImageUrl===", result.secure_url);
    return result.secure_url;
  },

  genBase64: async (data) => {
    return await qrcode.toDataURL(data);
  },

  uploadProfileImage(profilePic) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(profilePic, function (result, error) {
        console.log("result", result, "error", error);
        if (error) {
          reject(error);
        }
        else {
          resolve(result.url)
        }
      });
    })
  },


  getSecureUrl: async (base64) => {
    var result = await cloudinary.v2.uploader.upload(base64);
    console.log("===util--", result)
    return result.secure_url;
  },


  imageUploadCloudinary: async (pic) => {
    // let result =await cloudinary.v2.uploader.upload("dog.mp4", { resource_type: "video", chunk_size: 6000000,
    // eager: [
    //   { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
    //   { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
    // eager_async: true});
    var result = await cloudinary.v2.uploader.upload(pic, { resource_type: "video" });
    if (result) {
      return result.secure_url;
    }
  },

  sendSmsTwilio: async (mobileNumber, otp) => {
    return await client.messages.create({
      body: `Your OTP is ${otp}`,
      to: mobileNumber,
      from: config.get('twilio.number')
    })
  },

  uploadImage(image) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, function (error, result) {
        if (error) {
          reject(error);
        }
        else {
          console.log("result===>>", result.url)
          resolve(result.url)
        }
      });
    })
  },

  async ipfsUpload(tokenId, tokenData) {
    try {
      const { cid } = await ipfs.add({ path: tokenId, content: JSON.stringify(tokenData) }, { cidVersion: 1, hashAlg: 'sha2-256' });
      return cid.toString()
    } catch (error) {
      console.log('error', error);
    }
  },

  async addFile(fileName, filePath) {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({ path: fileName, content: file }, { cidVersion: 1, hashAlg: 'sha2-256' });
    const fileHash = fileAdded.cid.toString();
    console.log("Line no 167=======>>>", fileHash);
    return fileHash;
  },

  async deleteFile(filePath) {
    fs.unlink(filePath, (deleteErr) => {
      if (deleteErr) {
        console.log("Error: failed to delete the file", deleteErr);
      }
    })
  }




}
