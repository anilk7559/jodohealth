var db = require("../models");
const helper = require("../config/helper");
const jwt = require("jsonwebtoken");
const crypto = require ('crypto');
const nodemailer = require ('nodemailer');
const dotenv = require('dotenv');
const https = require("https"); // Import the https module
require("dotenv").config(); // Ensure dotenv is loaded for environment variables
//Password Encryption
const bcrypt = require("bcrypt");

const { Op, where } = require("sequelize");

// called a model
const roles = db.roles;
const users = db.users;

function sendOtp(mobileNumber) {
  console.log(mobileNumber)
  const options = {
    method: "POST",
    hostname: "control.msg91.com",
    path: "/api/v5/otp",
    headers: {
      "Content-Type": "application/JSON"
    }
  };

  const postData = JSON.stringify({
    template_id: process.env.MSG91_TEMPLATE_ID, //MSG91_TEMPLATE_ID  Use environment variables
    mobile: mobileNumber,
    authkey: process.env.MSG91_AUTH_KEY, // Use environment variables
    realTimeResponse: "true" // or "false" depending on your preference
  });
  console.log(postData)
  // return
  const req = https.request(options, function (res) {
    let chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString()); // Handle the response as needed
    });
  });

  req.on("error", function (e) {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}
async function verifyOtpFromMsg91(mobile, otp) {
  const options = {
    method: "GET",
    hostname: "control.msg91.com",
    path: `/api/v5/otp/verify?otp=${otp}&mobile=${mobile}`,
    headers: {
      "authkey": process.env.MSG91_AUTH_KEY,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        resolve(JSON.parse(body));
      });
    });

    req.on("error", (e) => reject(e));
    req.end();
  });
}

module.exports = {
  test: async (req, res) => {
    try {
      res.send("Hello i am working");
    } catch (error) {
      res.send("Hello i am not working");
    }
  },

  /*                   Auth Module Management           */

  login: async (req, res) => {
    try {
      const { email, emp_id, password } = req.body;
      if (email == undefined && emp_id == undefined) {
        return helper.error403(res, "Email and password is incorrect");
      }
      if (email) {
        var userCred = req.body.email;
      } else if (emp_id) {
        var userCred = req.body.emp_id;
      }
      const non_required = {
        emp_id: req.body.emp_id,
        email: req.body.email,
      };
      const userlogin = await db.users.findOne({
        where: {
          [Op.or]: [{ email: userCred }, { emp_id: userCred }],
        },
        raw: true,
      });
      if (!userlogin) {
        return helper.error403(res, "Email and password is incorrect");
      }
      if (userlogin.user_status == 1) {
        return helper.error403(res, "Your Account Deactivate,Please contact Hr");

      }

      const token = jwt.sign(
        {
          id: userlogin.id,
          email: userlogin.email,
          role_type: userlogin.role_type,
          device_token: "433324324",
        },
        "my_secret_key",
        {
          expiresIn: "8h"
        }
      );


      if (userlogin == null) {
        return helper.error403(res, "Email and password is incorrect");
      } else {
        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (isMatch == true) {
          console.log("<<<<<<<<<<<<<<<<<<<<<DONE>>>>>>>>>>>>>>>>>>");
          const updatessss = await db.users.update(
            {
              device_type: req.body.device_type,
              device_token: req.body.device_token,
            },
            {
              where: {
                id: userlogin.id,
              },
            }
          );
          const userDetail = await db.users.findOne({
            where: {
              id: userlogin.id,
            },
            raw: true,
          });
          // Create a new object with the required fields
          const responseUserDetail = {
            id: userDetail.id,
            name: userDetail.name,
            emp_id: userDetail.emp_id,
            email: userDetail.email,
            user_name: userDetail.user_name,
            role_type: userDetail.role_type,
            gender: userDetail.gender,
            phone: userDetail.phone,
            avatar: userDetail.avatar,
            password: userDetail.password,
            user_status: userDetail.user_status,
            createdAt: userDetail.createdAt,
            updatedAt: userDetail.updatedAt,
          };

          // userDetail.token = token;

          return helper.success(res, "Login succesfully done", { userDetail: responseUserDetail, token });
        } else {
          return helper.error403(res, "Email and password is incorrect");
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  // reset_password: async (req, res) => {
  //   try {
  //     const { token, newPassword, confirmPassword } = req.body;
  
  //     if (!token || !newPassword || !confirmPassword) {
  //       return helper.error403(res, 'All fields are required');
  //     }
  
  //     if (newPassword !== confirmPassword) {
  //       return helper.error403(res, 'Passwords do not match');
  //     }
  
  //     const user = await db.users.findOne({
  //       where: {
  //         resetPasswordToken: token,
  //         resetPasswordExpires: { [Op.gt]: new Date() },
  //       },
  //     });
  
  //     if (!user) {
  //       return helper.error403(res, 'Invalid or expired token');
  //     }
  
  //     const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  //     await db.users.update(
  //       {
  //         password: hashedPassword,
  //         resetPasswordToken: null,
  //         resetPasswordExpires: null,
  //       },
  //       {
  //         where: { email: user.email },
  //       }
  //     );
  
  //     return helper.success(res, 'Password reset successfully');
  //   } catch (error) {
  //     console.error(error);
  //     return helper.error403(res, 'Server error');
  //   }
  // },
  

  // forgot_password: async (req, res) => {
  //     try {
  //       const { email } = req.body;
  //       if (!email) {
  //         return helper.error403(res, 'Credentials are incorrect');
  //       }
    
  //       const userForgotPassword = await db.users.findOne({
  //         where: {
  //           email
  //         },
  //         raw: true,
  //       });
    
  //       if (!userForgotPassword) {
  //         return helper.error403(res, 'Credentials are incorrect');
  //       }
    
  //       const resetToken = crypto.randomBytes(20).toString('hex');
  //       const resetPasswordExpires = Date.now() + 3600000; // 1 hour

  //       const base64String = crypto
  //         .createHash('sha256')
  //         .update(userForgotPassword.email + 'How are you?')
  //         .digest('hex');
    
  //       await db.users.update(
  //         {
  //           // getforget: base64String,
  //           resetPasswordToken: resetToken,
  //           resetPasswordExpires: new Date(resetPasswordExpires),
  //         },
  //         {
  //           where: {
  //             email,
  //           },
  //         }
  //       );
    
  //       const getUrl = `${req.protocol}://${req.get('host')}/api/auth/forget_page?token=${resetToken}`;
  //       const smtpTransport = nodemailer.createTransport({
  //         host: 'smtp.gmail.com',
  //         port: 587,
  //         secure: false,
  //         auth: {
  //           user: 'traineraswin2@gmail.com',
  //           pass: 'rijl tkww letk fide',
  //         },
  //       });
    
  //       console.log(getUrl,"aaaaaaaaaaaa")
       
  //       const mailOptions = {
  //         from: 'Developer traineraswin2@gmail.com',
  //         to: userForgotPassword.email,
  //         subject: 'Password Reset Link',
  //         html: `Your Link is <a href="${getUrl}">${getUrl}</a>`,
  //       };
    
  //       await smtpTransport.sendMail(mailOptions);

  //       return helper.success(res, 'Email sent successfully',resetToken);
  //     } catch (error) {
  //       console.error(error);
  //       return helper.error403(res, 'Server error');
  //     }
  // },

  get_forget_page: async (req, res) => {
    try {
      const { token } = req.query;
  
      if (!token) {
        return res.status(400).send('Invalid link');
      }
  
      const user = await db.users.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { [Op.gt]: new Date() },
        },
      });
  
      if (!user) {
        return res.status(400).send('Invalid or expired link');
      }
  
      // Serve the password reset page
      res.send(`<form action='${req.protocol}://${req.get('host')}/api/auth/reset_password' method="POST">
                  <input type="hidden" name="token" value="${token}"/>
                  <input type="password" name="newPassword" placeholder="New Password"/>
                  <input type="password" name="confirmPassword" placeholder="Confirm Password"/>
                  <button type="submit">Reset Password</button>
                </form>`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },
  

 


  /*                   User Module Management           */

  // userRegisterLogin: async (req, res) => {
  //   try {
  //     const required = { phone: req.body.phone };
  //     const non_required = {};
  //     let requestData = await helper.vaildObject(required, non_required, res);

  //     let findPhone = await db.users.findOne({
  //       where: { id: requestData.phone },
  //       raw: true,
  //     });

  //     if (!findPhone) {
  //       findPhone = await db.users.create({ phone: req.body.phone || null });
  //     }

  //     const otp = helper.otpGenerator.generate();
  //     await sendOtp(findPhone.phone, otp);

  //     await db.users.update({ otp }, { where: { id: findPhone.id } });

  //     return helper.success(res, "OTP sent successfully", { otpSent: true });
  //   } catch (error) {
  //     console.log(error);
  //     return helper.error500(res, "Internal Server Error");
  //   }
  // }

  // userRegisterLogin: async (req, res) => {
  //   try {
  //     const required = { phone: req.body.phone };
  //     const non_required = { role_type: 'User' };
  //     let requestData = await helper.vaildObject(required, non_required, res);
  
  //     let user = await db.users.findOne({
  //       where: { phone: requestData.phone },
  //       raw: true,
  //     });
  
  //     if (!user) {
  //       // Create the user if not found
  //       user = await db.users.create({
  //         phone: requestData.phone,
  //       });
  
  //       console.log("User created successfully:", user);
  //     }
  
  //     // Ensure user object is properly initialized
  //     if (!user || !user.id) {
  //       throw new Error("Failed to create or retrieve user.");
  //     }
  
  //     const otp = helper.generate();

      
  //     // otpSentAt: new Date().getTime(),
  //     await db.users.update({ otp,otpSentAt: new Date().getTime(), otpSent: false,}, { where: { id: user.id } });

     
  //       // return helper.success(res, "OTP sent successfully", { otpSent: true ,otp});

  //       sendOtp(`91${requestData.phone}`); // Ensure the mobile number is in the correct format with country code

  //       return helper.success(res, "OTP sent successfully", { otp:otp });

     
  //   } catch (error) {
  //     console.log(error);
  //     return helper.error500(res, "Internal Server Error");
  //   }
  // },

  userRegisterLogin: async (req, res) => {
    try {
      const required = { phone: req.body.phone };
      const non_required = { role_type: 'User' };
      let requestData = await helper.vaildObject(required, non_required, res);
  
      let user = await db.users.findOne({
        where: { phone: requestData.phone },
        raw: true,
      });
  
      if (!user) {
        // Create the user if not found
        user = await db.users.create({
          phone: requestData.phone,
        });
  
        console.log("User created successfully:", user);
      }
  
      // Ensure user object is properly initialized
      if (!user || !user.id) {
        throw new Error("Failed to create or retrieve user.");
      }
      const otp = await sendOtp(`91${requestData.phone}`);

      // const otp =sendOtp(`91${requestData.phone}`);
      console.log(otp,"aaaaaaaaaaa")
      const otpSentAt = new Date().getTime();
  
      await db.users.update(
        { otp, otpSentAt, otpSent: false },
        { where: { id: user.id } }
      );
  
      // Send the OTP using MSG91
      sendOtp(`91${requestData.phone}`); // Ensure the mobile number is in the correct format with country code
      // sendOtp(`917619850994`); 
      // Return the response indicating success
      return helper.success(res, "OTP sent successfully", { otpSent: true });
  
    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },


  // verifyOtp: async (req, res) => {
  //   try {
  //     const { phone, otp } = req.body;

  //     if (!phone || !otp) {
  //       return helper.error400(res, "Phone number and OTP are required");
  //     }

  //     // Find the user by phone number
  //     const user = await db.users.findOne({
  //       where: {
  //         phone: phone,
  //         otp: otp,
  //       },
  //       raw: true,
  //     });

  //     if (!user) {
  //       return helper.error403(res, "Invalid OTP or phone number");
  //     }

  //     // Check if OTP has expired
  //     const otpSentAt = user.otpSentAt;
  //     const otpValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
  //     const currentTime = new Date().getTime();
  //     if (currentTime - otpSentAt > otpValidityDuration) {
  //       return helper.error403(res, "OTP has expired");
  //     }

  //     // Mark OTP as used and reset otpSent
  //     await db.users.update(
  //       { otpSent: false, otp: null ,otpSentAt:null}, // Clear the OTP
  //       { where: { id: user.id } }
  //     );

  //     // Generate and send a login token
  //     const token = jwt.sign(
  //       {
  //         id: user.id,
  //         email: user.email,
  //         role_type: user.role_type,
  //         device_token: "433324324", // Example device token
  //       },
  //       "my_secret_key",
  //       {
  //         expiresIn: "8h"
  //       }
  //     );

     
  //     // Respond with success and the token
  //     return helper.success(res, "OTP verified successfully", { user:{
  //       "id": user.id,
  //       "role_type": "User",
  //       "phone": user.phone,
  //       "subscription_status":user.subscription_status,
  //     },token });
  //   } catch (error) {
  //     console.error(error);
  //     return helper.error500(res, "Internal Server Error");
  //   }
  // },
  verifyOtp: async (req, res) => {
    try {
      const { phone, otp } = req.body;
  
      if (!phone || !otp) {
        return helper.error400(res, "Phone number and OTP are required");
      }
  
      const mobile = `91${phone}`; // Assuming you are dealing with Indian phone numbers
  
      // Verify OTP via MSG91
      const msg91Response = await verifyOtpFromMsg91(mobile, otp);
  
      if (msg91Response.type !== "success") {
        return helper.error403(res, "Invalid OTP or phone number");
      }
  
      // Find the user by phone number
      const user = await db.users.findOne({
        where: { phone },
        raw: true,
      });
  
      if (!user) {
        return helper.error403(res, "User not found");
      }
  
      // Check if OTP has expired (optional, since MSG91 handles it)
      const otpSentAt = user.otpSentAt;
      const otpValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
      const currentTime = new Date().getTime();
      if (currentTime - otpSentAt > otpValidityDuration) {
        return helper.error403(res, "OTP has expired");
      }
  
      // Mark OTP as used and reset otpSent
      await db.users.update(
        { otpSent: false, otp: null, otpSentAt: null }, // Clear the OTP
        { where: { id: user.id } }
      );
  
      // Generate and send a login token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role_type: user.role_type,
          device_token: "433324324", // Example device token
        },
        "my_secret_key",
        {
          expiresIn: "8h"
        }
      );
  
      // Respond with success and the token
      return helper.success(res, "OTP verified successfully", {
        user: {
          id: user.id,
          role_type: "User",
          phone: user.phone,
          subscription_status: user.subscription_status,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return helper.error500(res, "Internal Server Error");
    }
  },

//------------------ Auth Module

forgot_password: async (req, res) => {
  try {
    const {email} = req.body;
    if (email) {
      var userCred = req.body.email;
    }
    const non_required = {};
    const userForgotPassword = await db.users.findOne ({
      where: {
       email: userCred,
      },
      raw: true,
    });
    if (!userForgotPassword) {
      return helper.error403 (res, 'Credentials is incorrect');
    }

    var base64String = crypto
      .createHash ('sha256', userForgotPassword.email)
      .update ('How are you?')
      .digest ('hex');
    if (userForgotPassword == null) {
      return helper.error403 (res, 'This email is not be registred');
    } else {
      await db.users.update (
        {
          getforget: base64String,
        },
        {
          where: {
            email: req.body.email,
          },
        }
      );
    }
    const getUrl = `${req.protocol}://${req.get('host')}/api/auth/forget_page?email=${base64String}`;

    // let getUrl = `${req.protocol}://${req.get ('host')}/api/forget_page?email=${base64String}`;
    var smtpTransport = nodemailer.createTransport (
      {host: 'smtp.gmail.com', port: 587, secure: false},
      {
        service: 'Gmail',
        auth: {
          user: 'traineraswin2@gmail.com',
          pass: 'rijl tkww letk fide',
        },
      }
    );
    const otp = Math.floor (1000 + Math.random () * 9000);

    var mail = {
      from: `Testing" traineraswin2@gmail.com `,
      to: userForgotPassword.email,
      subject: 'Send Email Using Node.js',
      html: `Your Otp No ${otp}`,
    };
    let info = await smtpTransport.sendMail (mail);
    const otp_update = await db.users.update (
      {
        otpEmail: otp,
      },
      {
        where: {
          email: userForgotPassword.email,
        },
      }
    );
    if (!otp_update) {
      return helper.error403 (res, 'otp not available');
    }
    const profileDetail = {
      otp: otp,
      user_id: userForgotPassword.id,
    };
    return helper.success (res, 'otp sent succesfully ');
  } catch (error) {
    console.log (error);
    // console.log("ERROR", error);
    // return helper.error403(res, error)
  }
},



verifyEmailOtp: async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return helper.error400(res, "email number and OTP are required");
    }

    // Find the user by phone number
    const user = await db.users.findOne({
      where: {
        email: email,
        otpEmail: otp,
      },
      raw: true,
    });

    if (!user) {
      return helper.error403(res, "Invalid OTP or email id");
    }

    // Check if OTP has expired
    // const otpSentAt = user.otpSentAt;
    // const otpValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
    // const currentTime = new Date().getTime();
    // if (currentTime - otpSentAt > otpValidityDuration) {
    //   return helper.error403(res, "OTP has expired");
    // }

    // Mark OTP as used and reset otpSent
    await db.users.update(
      { otpEmailSent: true, otpEmail: null}, // Clear the OTP
      { where: { id: user.id } }
    );

    // Generate and send a login token
  

   
    // Respond with success and the token
    return helper.success(res, "OTP verified successfully", {});
  } catch (error) {
    console.error(error);
    return helper.error500(res, "Internal Server Error");
  }
},

reset_password: async (req, res) => {

  const required = {}
  const non_required = {
    email: req.body.email,
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
    // otpEmail: req.body.otp,      
  };

  // Validate the requestData
  let requestData = await helper.vaildObject({}, non_required, res);


  try {
   
    if (requestData.newPassword !== requestData.confirmPassword) {
      return helper.error403(res, 'Passwords do not match');
          }
    const hash = await bcrypt.hash (req.body.newPassword, 10);
     const newPassword = await db.users.update (
      {
        password: hash,
        otpEmailSent:0,
      },
      {
        where: {
          email: requestData.email,
          otpEmailSent:1,
        },
      }
    );
    return helper.success (res, 'Password changed successfully', {});
  } catch (error) {
    return helper.error403 (res, error);
  }
},

// -------------------User Panel Without Token

userLabList: async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    // Query to get the total count of labs with non-null fields
    const totalCount = await db.users.count({
      where: {
        role_type: "Lab",
        user_status: {
          [Op.not]: 1
        },
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ],
        latitude: { [Op.not]: null },
        longitude: { [Op.not]: null },
        city: { [Op.not]: null },
        state: { [Op.not]: null },
        pincode: { [Op.not]: null },
        fullAddress: { [Op.not]: null }
      }
    });

    // Query to get labs for the current page with non-null fields
    const findLab = await db.users.findAll({
      where: {
        role_type: "Lab",
        user_status: {
          [Op.not]: 1
        },
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ],
        latitude: { [Op.not]: null },
        longitude: { [Op.not]: null },
        city: { [Op.not]: null },
        state: { [Op.not]: null },
        pincode: { [Op.not]: null },
        fullAddress: { [Op.not]: null }
      },
      limit: limit,
      offset: offset
    });

    const LabCount = findLab.length;
    const totalPages = Math.ceil(totalCount / limit);

    return helper.success(res, "Lab Successfully Received", {
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      findLab: findLab
    });
  } catch (error) {
    console.log(error);
    return helper.error(res, "Internal Server Error", 500);
  }
}


};
