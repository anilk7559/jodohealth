const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const helper = require("../config/helper");
const { promisify } = require("util");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require("dotenv").config();
const https = require("https"); 
const User = require('../models/userModel');


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
exports.test = (req, res) => {
  res.send("This is a test endpoint");
};

exports.login = async (req, res) => {
  try {
    const { email, emp_id, password } = req.body;

    if (!email && !emp_id) {
      return helper.error403(res, "Email and password are incorrect");
    }

    const userCred = email || emp_id;
    const user = await User.findOne({
      $or: [{ email: userCred }, { emp_id: userCred }],
    });

    if (!user) {
      return helper.error403(res, "Email and password are incorrect");
    }

    if (user.user_status === 1) {
      return helper.error403(res, "Your Account is Deactivated. Please contact HR");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return helper.error403(res, "Email and password are incorrect");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role_type: user.role_type, device_token: "433324324" },
      "my_secret_key",
      { expiresIn: "8h" }
    );

    user.device_type = req.body.device_type;
    user.device_token = req.body.device_token;
    await user.save();

    const responseUserDetail = {
      id: user._id,
      name: user.name,
      emp_id: user.emp_id,
      email: user.email,
      user_name: user.user_name,
      role_type: user.role_type,
      gender: user.gender,
      phone: user.phone,
      avatar: user.avatar,
      password: user.password,
      user_status: user.user_status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return helper.success(res, "Login successfully done", { userDetail: responseUserDetail, token });
  } catch (error) {
    console.error(error);
    return helper.error500(res, "Internal Server Error");
  }
};

exports.reset_password = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return helper.error401(res, "User not found.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await user.update({ password: hashedPassword });

    res.json({ status: "success", message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    helper.error500(res, "An error occurred while resetting the password.");
  }
};


exports.reset_password = async (req, res) => {
  const required = {}

  const non_required = {
    email: req.body.email,
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
  };

  let requestData = await helper.validObject({}, required,non_required, res);

  try {
    if (requestData.newPassword !== requestData.confirmPassword) {
      return helper.error403(res, 'Passwords do not match');
    }

    const hash = await bcrypt.hash(req.body.newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      {
        email: requestData.email,
        otpEmailSent: 1,
      },
      {
        password: hash,
        otpEmailSent: 0,
      },
      {
        new: true, 
      }
    );

    if (!updatedUser) {
      return helper.error403(res, 'User not found or OTP not sent');
    }

    return helper.success(res, 'Password changed successfully', {});
  } catch (error) {
    return helper.error403(res, error.message);
  }
},



exports.forgot_password = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return helper.error403(res, 'Email is required');
    }

    const userForgotPassword = await User.findOne({
      email: email,
    }).lean();

    if (!userForgotPassword) {
      return helper.error403(res, 'Credentials are incorrect');
    }

    const base64String = crypto
      .createHash('sha256')
      .update(userForgotPassword.email + 'How are you?') 
      .digest('hex');

    await User.updateOne(
      { email: email },
      { getforget: base64String }
    );

    const getUrl = `${req.protocol}://${req.get('host')}/api/auth/forget_page?email=${base64String}`;

    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'traineraswin2@gmail.com',
        pass: 'rijl tkww letk fide',
      },
    });

    const otp = Math.floor(1000 + Math.random() * 9000);

    const mail = {
      from: `Testing <traineraswin2@gmail.com>`,
      to: userForgotPassword.email,
      subject: 'Send Email Using Node.js',
      html: `Your OTP is ${otp}`,
    };

    await smtpTransport.sendMail(mail);

    const otpUpdate = await User.updateOne(
      { email: userForgotPassword.email },
      { otpEmail: otp }
    );

    if (!otpUpdate) {
      return helper.error403(res, 'OTP not available');
    }

    return helper.success(res, 'OTP sent successfully');
  } catch (error) {
    console.log(error);
    return helper.error500(res, 'Internal Server Error');
  }
};

exports.get_forget_page = async(req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send('Invalid link');
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, 
    });

    if (!user) {
      return res.status(400).send('Invalid or expired link');
    }

    res.send(`
      <form action='${req.protocol}://${req.get('host')}/api/auth/reset_password' method="POST">
        <input type="hidden" name="token" value="${token}"/>
        <input type="password" name="newPassword" placeholder="New Password"/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password"/>
        <button type="submit">Reset Password</button>
      </form>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.userRegisterLogin = async (req, res) => {
  // try {
  //   const required = { phone: req.body.phone };
  //   const non_required = { role_type: 'User' };
  //   let requestData = await helper.validObject(required, non_required, res);

  //   let user = await User.findOne({ phone: requestData.phone }).exec();

  //   if (!user) {
  //     user = new User({
  //       phone: requestData.phone,
  //       role_type: 'User',
  //     });

  //     user = await user.save();

  //     console.log("User created successfully:", user);
  //   }

  //   if (!user || !user._id) {
  //     throw new Error("Failed to create or retrieve user.");
  //   }

  //   const otp = helper.generate();

  //   user.otp = otp;
  //   user.otpSentAt = new Date();
  //   user.otpSent = false;
  //   await user.save();

  //   return helper.success(res, "OTP sent successfully", { otp });

  // } catch (error) {
  //   console.error("Error in userRegisterLogin:", error);
  //   return helper.error500(res, "Internal Server Error");
  // }

  try {
    const required = { phone: req.body.phone };
    const non_required = { role_type: 'User' };
    let requestData = await helper.validObject(required, non_required, res);

    let user = await User.findOne({
      where: { phone: requestData.phone },
      raw: true,
    });

    if (!user) {
      // Create the user if not found
      user = await User.create({
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

    await User.update(
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
};

exports.verifyOtp = async (req, res) => {
  // try {
  //   const { phone, otp } = req.body;

  //   if (!phone || !otp) {
  //     return helper.error400(res, "Phone number and OTP are required");
  //   }

  //   const user = await User.findOne({ phone, otp }).exec();

  //   if (!user) {
  //     return helper.error403(res, "Invalid OTP or phone number");
  //   }

  //   const otpSentAt = user.otpSentAt.getTime();
  //   const otpValidityDuration = 5 * 60 * 1000; 
  //   const currentTime = new Date().getTime();
  //   if (currentTime - otpSentAt > otpValidityDuration) {
  //     return helper.error403(res, "OTP has expired");
  //   }

  //   user.otpSent = false;
  //   user.otp = null;
  //   user.otpSentAt = null;
  //   await user.save();

  //   const token = jwt.sign(
  //     {
  //       id: user._id,
  //       email: user.email,
  //       role_type: user.role_type,
  //       device_token: "433324324",
  //     },
  //     "my_secret_key",
  //     {
  //       expiresIn: "8h"
  //     }
  //   );

  //   return helper.success(res, "OTP verified successfully", { 
  //     user: {
  //       id: user._id,
  //       role_type: user.role_type,
  //       phone: user.phone,
  //       subscription_status: user.subscription_status,
  //     },
  //     token 
  //   });
  // } catch (error) {
  //   console.error("Error verifying OTP:", error);
  //   return helper.error500(res, "Internal Server Error");
  // }

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
    const user = await User.findOne({
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
    await User.update(
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
};

