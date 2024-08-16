const path = require("path");
var uuid = require("uuid").v4;
const sequelize = require("sequelize");
const fs = require("fs");
const db = require("../models");
const os = require('os');
const crypto = require('crypto');
const nodemailer = require ('nodemailer');
const sendEmail = async (to, subject, html) => {
  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'traineraswin2@gmail.com',
      pass: 'brjo pufs ldbu yfxz',
    },
  });

  const mailOptions = {
    from: 'Developer <traineraswin2@gmail.com>',
    to,
    subject,
    html,
  };

  try {
    await smtpTransport.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


module.exports = {
  sendEmail,
  generate: (length = 6) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
      const digit = crypto.randomInt(0, 10); // Generate a random digit between 0 and 9
      otp += digit;
    }
    return otp;
  },
  vaildObject: async function (required, non_required, res) {
    console.log(required, non_required);
    let message = "";
    let empty = [];
    let table_name = required.hasOwnProperty("table_name")
      ? required.table_name
      : "users";

    for (let key in required) {
      if (required.hasOwnProperty(key)) {
        if (required[key] == undefined || required[key] == "") {
          empty.push(key);
        }
      }
    }

    if (empty.length != 0) {
      message = empty.toString();
      if (empty.length > 1) {
        message += " fields are required";
      } else {
        message += " field is required";
      }
      res.status(400).json({
        success: false,
        message: message,
        code: 400,
        body: {},
      });
      return;
    } else {
      if (required.hasOwnProperty("security_key")) {
        if (required.security_key != "") {
          message = "Invalid security key";
          res.status(403).json({
            success: false,
            message: message,
            code: 403,
            body: [],
          });
          res.end();
          return false;
        }
      }
      if (required.hasOwnProperty("password")) {
        // const saltRounds = 10;
        // var myPromise = await new Promise(function (resolve, reject) {
        //     bcrypt.hash(required.password, saltRounds, function (err, hash) {
        //         if (!err) {
        //             resolve(hash);
        //         } else {
        //             reject('0');
        //         }
        //     });
        // });
        // // required.password= crypto.createHash('sha1').update(required.password).digest('hex');
        // required.password = myPromise;
        // required.password = await this.getBcryptHash(required.password);
      }

      /* if (required.hasOwnProperty('checkexit')) {
                if (required.checkexit === 1) {
                    if (required.hasOwnProperty('email')) {
                        required.email = required.email.toLowerCase();
    
                        if (await this.checking_availability(required.email, 'email', table_name)) {
                            message = "this email is already register kindly use another";
                            res.status(403).json({
                                'success': false,
                                'message': message,
                                'code': 403,
                                'body': []
                            });
                            res.end();
                            return false;
                        }
                    }
                    if (required.hasOwnProperty('name') && required.name != undefined) {
                        required.name = required.name.toLowerCase();
    
                        if (await this.checking_availability(required.name, 'name', table_name)) {
                            message = "name is already in use";
                            res.status(403).json({
                                'success': false,
                                'message': message,
                                'code': 403,
                                'body': []
                            });
                            return false;
                        }
                    }
    
                }
            }
    
    
            if (non_required.hasOwnProperty('name') && non_required.name != undefined) {
                non_required.name = non_required.name.toLowerCase();
    
                if (await this.checking_availability(non_required.name, 'name', table_name)) {
                    message = "name is already in use";
                    res.status(403).json({
                        'success': false,
                        'message': message,
                        'code': 403,
                        'body': []
                    });
                    return false;
                }
            } */

      const marge_object = Object.assign(required, non_required);
      delete marge_object.checkexit;

      for (let data in marge_object) {
        if (marge_object[data] == undefined) {
          delete marge_object[data];
        } else {
          if (typeof marge_object[data] == "string") {
            marge_object[data] = marge_object[data].trim();
          }
        }
      }

      return marge_object;
    }
  },
  success: function (res, message, body = {}) {
    return res.status(200).json({
      success: 1,
      code: 200,
      message: message,
      body: body,
    });
  },
  check: function (res, body = {}) {
    return res.status(200).json({
      success: 1,
      code: 200,
      // 'message': message,
      body: body,
    });
  },

  error403: function (res, err) {
    console.log(err);
    console.log("error");

    let code =
      typeof err === "object"
        ? err.statusCode
          ? err.statusCode
          : err.code
          ? err.code
          : 403
        : 403;
    let message = typeof err === "object" ? err.message : err;
  
    res.status(code).json({
      success: false,
      error_message: message,
      code: code,
      body: [],
    });
  },
  error400: function (res, err, body = {}) {
    console.log(err, "===========================>error");

    let code = typeof err === "object" ? (err.code ? err.code : 400) : 400;
    let message =
      typeof err === "object" ? (err.message ? err.message : "") : err;
    res.status(code).json({
      success: false,
      code: code,
      message: message,
      body: body,
    });
  },
  error401: function (res, err, body = {}) {
    let message =
      typeof err === "object" ? (err.message ? err.message : "") : err;
    let code = 401;
    res.status(code).json({
      success: 0,
      code: code,
      message: message,
      body: body,
    });
  },
  error500: function (res, err, body = {}) {
    let message =
      typeof err === "object" ? (err.message ? err.message : "") : err;
    let code = 401;
    res.status(code).json({
      success: 0,
      code: code,
      message: message,
      body: body,
    });
  },

  imageUpload: (file, folder = 'users') => {

    let image = file;

    var extension = path.extname(image.name);
    var fileimage = uuid() + extension;
    image.mv(process.cwd() + '/public/images/' + folder + '/' + fileimage, function (err) {
        if (err)
            console.log(err);
    });
    const filename = `/images/${folder}/` + fileimage
    if(extension != '.jpeg' && extension != '.jpg' && extension != '.png' && extension != '.pdf' ){
         var data = {};
         data.extensions = extension;
         data.filenames = filename
        return data;
    }else{
        return filename;
    }
},

// Function to get the local IP address
getIPAddress: () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
},

verifyRefreshToken: (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) return reject(createError.Unauthorized())
        const userId = payload.aud
        client.GET(userId, (err, result) => {
          if (err) {
            console.log(err.message)
            reject(createError.InternalServerError())
            return
          }
          if (refreshToken === result) return resolve(userId)
          reject(createError.Unauthorized())
        })
      }
    )
  })
},

signAccessToken: (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = process.env.ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: '1h',
      issuer: 'pickurpage.com',
      audience: userId,
    }
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message)
        reject(createError.InternalServerError())
        return
      }
      resolve(token)
    })
  })
},


};
