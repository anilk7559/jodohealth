var db = require("../models");
const helper = require("../config/helper");
const { Op, where } = require('sequelize');
const jwt = require("jsonwebtoken");
const razorpay = require('../paymentGatway/razorpay');
const phonepe = require('../paymentGatway/phonepe');
const { sendEmail } = require("../config/helper");
const { sequelize } = require('../models'); // Import sequelize instance for using Sequelize.literal

const js2xmlparser = require("js2xmlparser");
const PDFDocument = require('pdfkit');
var path = require('path');
const fs = require('fs');

//Password Encryption
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { decode } = require("jsonwebtoken");
const { raw } = require("body-parser");
const moment = require('moment');
let tokenBlacklist = [];
const XLSX = require('xlsx');

// called a model
const users = db.users;
const Subscription = db.subscriptions;
const Appointment = db.appointments;

const members = db.members;
const crypto = require("crypto");

const Razorpay = require("razorpay");
function nanoid() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  return `receipt_${timestamp}_${randomNum}`;
}
// let rzp = new Razorpay({
//   key_id: process.env.KEY_ID, // your `KEY_ID`
//   key_secret: process.env.KEY_SECRET, // your `KEY_SECRET`
// });
module.exports = {

  /////////////////////////////User module ////////////


  //========================================== Common  ===========================================================

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await helper.verifyRefreshToken(refreshToken)

      const accessToken = await helper.signAccessToken(userId)
      const refToken = await helper.signRefreshToken(userId)
      res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await helper.verifyRefreshToken(refreshToken)
      console.log(userId, "11111111111111111111111")
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw createError.InternalServerError()
        }
        console.log(val)
        res.sendStatus(204)
      })
    } catch (error) {
      next(error)
    }
  },

  getProfile: async (req, res) => {
    try {
      const getProfile = await db.users.findOne({
        where: {
          id: req.user.id
        },
        attributes: { exclude: ['password'] }

      });
      if (!getProfile) {
        return helper.error403(res, " User Id not exit");
      }

      return helper.success(res, "Get Profile Successfully Received",
        getProfile);
    } catch (error) {
      console.log(error);
    }
  },
  changePassword: async (req, res) => {
    const userId = req.user.id;

    try {
      // Validate the required fields
      const required = {
        newPassword: req.body.newPassword,
        oldPassword: req.body.oldPassword,
      };
      const non_required = {};
      let requestData = await helper.vaildObject(required, non_required, res);

      // Fetch the user from the database
      const changepass = await db.users.findOne({
        where: { id: userId },
        raw: true,
      });

      if (!changepass) {
        return helper.error403(res, 'User not found');
      }

      // Compare old password
      const isOldPasswordValid = await bcrypt.compare(
        requestData.oldPassword,
        changepass.password
      );

      if (!isOldPasswordValid) {
        return helper.error403(res, 'Old password does not match');
      }

      // Ensure the new password is different from the old one
      if (requestData.oldPassword === requestData.newPassword) {
        return helper.error403(res, 'New password must be different from old password');
      }

      // Hash the new password and update it in the database
      const hash = await bcrypt.hash(requestData.newPassword, 10);

      await db.users.update(
        { password: hash },
        { where: { id: userId } }
      );

      // Return success response
      return helper.success(res, 'Password changed successfully');

    } catch (error) {
      console.error(error); // Log the error for debugging
      return helper.error500(res, 'Internal server error');
    }
  },

  // dashboard: async (req, res) => {
  //   try {
  //     const { id } = req.user;
  //     const page = parseInt(req.query.page) || 1;
  //     const limit = parseInt(req.query.limit) || 10;
  //     const offset = (page - 1) * limit;
  //     const search = req.query.search || '';

  //     const findRole = await db.users.findOne({ where: { id } });

  //     if (!findRole) {
  //       return helper.error403(res, "User not found");
  //     }

  //     const isAdmin = findRole.role_type === "Admin";
  //     const whereClause = isAdmin ? {} : { [Op.or]: [{ lab_id: id }, { agency_id: id }] };

  //     const totalCount = await db.appointments.count({ where: whereClause });

  //     const findAppointment = await db.appointments.findAll({
  //       where: whereClause,
  //       limit,
  //       offset,
  //       attributes: {
  //         include: [
  //           [
  //             db.sequelize.literal(
  //               '(SELECT phone FROM users WHERE users.id = appointments.user_id)'
  //             ),
  //             'user_number',
  //           ],
  //           [
  //             db.sequelize.literal(
  //               '(SELECT name FROM users WHERE users.id = appointments.lab_id)'
  //             ),
  //             'lab_name',
  //           ],
  //           [
  //             db.sequelize.literal(
  //               '(SELECT name FROM members WHERE members.id = appointments.member_id)'
  //             ),
  //             'member_name',
  //           ],
  //           [
  //             db.sequelize.literal(
  //               '(SELECT email FROM members WHERE members.id = appointments.member_id)'
  //             ),
  //             'member_email',
  //           ],
  //         ],
  //       },

  //     });

  //     const totalPages = Math.ceil(totalCount / limit);

  //     return helper.success(res, "Appointment Successfully Received", {
  //       totalCount,
  //       totalPages,
  //       currentPage: page,
  //       pageSize: limit,
  //       findAppointment,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return helper.error403(res, "Failed to fetch appointments");
  //   }
  // },

  dashboard: async (req, res) => {
    try {
      const id = req.user.id; 
      const findRole = await db.users.findOne({ where: { id } });
  
      if (!findRole) {
        return helper.error403(res, "User not found");
      }
  
      const roleType = findRole.role_type;
  
      // Common query results
      const totalAppointment = await db.appointments.count();
      const totalLab = await db.users.count({ where: { role_type: "Lab" } });
      const totalUser = await db.users.count({ where: { role_type: "User" } });
  
      let responseData = {
        totalAppointment,
        totalLab,
        totalUser
      };
  
      if (roleType === "Admin") {
        const totalAgency = await db.users.count({ where: { role_type: "Agency" } });
        const totalSubscription = await db.users.count({ where: { subscription_status: 0 } });
        responseData = { ...responseData, totalAgency, totalSubscription };
      } else if (roleType === "Lab") {
        responseData.totalTest = 0; // Set `totalTest` for Lab role
      } else if (roleType === "Agency") {
        const totalAgency = await db.users.count({ where: { role_type: "Agency" } });
        responseData = { ...responseData, totalAgency };
      }
  
      return helper.success(res, "Dashboard Successfully Received", responseData);
  
    } catch (error) {
      console.error(error);
      return helper.error403(res, "Failed to fetch data");
    }
  }, 
  
  completeProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      // Check if the User ID is provided
      if (!userId) {
        return helper.error403(res, 'User ID is required');
      }

      // Find the User by ID
      const findUser = await db.users.findOne({
        where: {
          id: userId,
        }
      });

      // If user not found, return error
      if (!findUser) {
        return helper.error403(res, 'User not found');
      }

      // Construct the non_required object with fallback to findUser values
      const required = {}
      const non_required = {
        latitude: req.body.latitude || findUser.latitude,
        longitude: req.body.longitude || findUser.longitude,
        avatar: (req.files && req.files.avatar) || findUser.avatar,
        name: req.body.name || findUser.name,
        email: req.body.email || findUser.email,
        city: req.body.city || findUser.city,
        state: req.body.state || findUser.state,
        pincode: req.body.pincode || findUser.pincode,
        fullAddress: req.body.fullAddress || findUser.fullAddress,
        phone: req.body.phone || findUser.phone,
        age: req.body.age || findUser.age,
        gender: req.body.gender || findUser.gender,


      };

      // Validate the requestData
      let requestData = await helper.vaildObject({}, non_required, res);

      // Update the avatar if a new file is uploaded
      if (req.files && req.files.avatar) {
        requestData.avatar = await helper.imageUpload(req.files.avatar, 'profile');
      }

      // Check if the email is changing and if it already exists
      if (requestData.email && requestData.email !== findUser.email) {
        const existingUserWithEmail = await db.users.findOne({
          where: {
            email: requestData.email,
            id: { [db.Sequelize.Op.not]: userId } // Exclude the current user
          }
        });

        if (existingUserWithEmail) {
          return helper.error403(res, 'Email already exists');
        }
      }

      // Update the User with the new data
      await findUser.update(requestData);
      return helper.success(res, 'User updated successfully');

    } catch (error) {
      console.error('Error updating User:', error);
      return helper.error403(res, 'Failed to update User');
    }
  },





  // ============================================Agency Module ========================================================
  create_agency: async (req, res) => {
    try {
      const required = {
        name: req.body.name,
        email: req.body.email,
        user_name: req.body.user_name,
        role_type: "Agency",
        password: req.body.password
      }
      const non_required = {
        emp_id: req.body.emp_id,
        avatar: req.files && req.files.avatar,
      }

      let requestData = await helper.vaildObject(required, non_required, res);
      if (req.files && req.files.avatar) {
        requestData.avatar = helper.imageUpload(req.files.avatar, 'profile');
      }
      // Check if email already exists
      const exitEmail = await db.users.findOne({
        where: {
          email: requestData.email,
        },
      });
      if (exitEmail) {
        return helper.error403(res, "Email already Exists");
      }

      // Check if user name already exists
      const exitUserName = await db.users.findOne({
        where: {
          user_name: requestData.user_name,
        },
      });
      if (exitUserName) {
        return helper.error403(res, "User Name already Exists");
      }

      // Hash the password
      const password = bcrypt.hashSync(req.body.password, 10);
      requestData.password = password;

      // Check if role type is not "Admin"
      if (requestData.role_type !== "Admin") {
        const agencyCreated = await db.users.create(requestData);
        const empId = `EMP-${agencyCreated.id}`;
        agencyCreated.emp_id = empId;
        await agencyCreated.save();

        // Send email with username and password
        const emailSubject = 'Agency Account Created';
        const emailBody = `
        <p>Dear ${requestData.name},</p>
        <p>Your agency account has been successfully created.</p>
                 <p><strong>Email:</strong> ${requestData.email}</p>

        <p><strong>Username:</strong> ${requestData.user_name}</p>
        <p><strong>Password:</strong> ${req.body.password}</p>
        <p>Please change your password upon first login.</p>
      `;
        await sendEmail(requestData.email, emailSubject, emailBody);

        return helper.success(res, "Agency successfully Created", agencyCreated);
      } else {
        return helper.error403(res, "Role Admin Not Allowed");
      }
    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },

  getAllAgencyList: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || '';
      // Query to get the interviews for the tottal page
      const totalCount = await db.users.count({
        where: {
          role_type: "Agency",
          user_status: {
            [Op.not]: 1
          },
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
          ]
        },
      });

      // Query to get the interviews for the current page
      const findAgency = await db.users.findAll({
        where: {
          role_type: "Agency",
          user_status: {
            [Op.not]: 1
          },
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
          ]
        },
        limit: limit,
        offset: offset
      });



      const AgencyCount = findAgency.length;
      const totalPages = Math.ceil(AgencyCount / limit);

      return helper.success(res, "Agency Successfully Received", {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize: limit,
        findAgency: findAgency
      });
    } catch (error) {
      console.log(error);
    }

  },

  getAgencyListBYId: async (req, res) => {
    try {
      const required = {}
      const non_required = {}
      let requestData = await helper.vaildObject(required, non_required, res);

      const findAgency = await db.users.findOne({
        where: {
          id: req.query.agenctId,
          role_type: "Agency"
        }
      });
      if (!findAgency) {
        return helper.error403(res, " Agency Id not exit");

      }

      return helper.success(res, "Agency Successfully Received",
        findAgency);
    } catch (error) {
      console.log(error);
    }
  },

  updateAgencyById: async (req, res) => {
    try {
      const agencyId = req.query.agencyId;

      // Check if the agency ID is provided
      if (!agencyId) {
        return helper.error403(res, 'Agency ID is required');
      }

      // Find the agency by ID
      const findAgency = await db.users.findOne({
        where: {
          id: agencyId,
          role_type: "Agency"
        }
      });

      // If user not found, return error
      if (!findAgency) {
        return helper.error403(res, 'Agency ID not found');
      }
      // Construct the updated data object
      const updatedData = {
        name: req.body.name || findAgency.name,
        email: req.body.email || findAgency.email,
        user_name: req.body.user_name || findAgency.user_name,
        avatar: req.files && req.files.avatar ? req.files.avatar : findAgency.avatar, // Use existing avatar if not provided
      };

      if (req.files && req.files.avatar) {
        updatedData.avatar = helper.imageUpload(req.files.avatar, 'profile');
      }

      // Check if the email is changing and if it already exists
      if (updatedData.email && updatedData.email !== findAgency.email) {
        const existingAgencyWithEmail = await db.users.findOne({
          where: {
            email: updatedData.email,
            id: { [db.Sequelize.Op.not]: agencyId } // Exclude the current user
          }
        });

        if (existingAgencyWithEmail) {
          return helper.error403(res, 'Email already exists');
        }
      }

      // Update the Agency with the new data
      await findAgency.update(updatedData);
      return helper.success(res, 'Agency updated successfully');

    } catch (error) {
      console.error('Error updating agency:', error);
      return helper.error403(res, 'Failed to update Agency');
    }
  },

  deactivateAgency: async (req, res) => {
    try {
      const agencyId = req.query.agencyId;

      // Check if the agency ID is provided
      if (!agencyId) {
        return helper.error403(res, 'Agency ID is required');
      }

      // Find the agency by ID
      const data = await db.users.findOne({
        where: {
          id: agencyId,
          role_type: "Agency"
        },
        raw: true,
      });

      // If agency not found, return error
      if (!data) {
        return helper.error403(res, 'Agency ID does not exist');
      }

      // Update the user status to deactivate the agency
      await db.users.update({ user_status: 1 }, {
        where: {
          id: agencyId,
        },
      });

      return helper.success(res, 'Agency deactivated successfully', {});

    } catch (error) {
      console.error('Error deactivating agency:', error);
      return helper.error403(res, 'Failed to deactivate agency');
    }
  },
  activateAgency: async (req, res) => {
    try {
      const agencyId = req.query.agencyId;

      // Check if the agency ID is provided
      if (!agencyId) {
        return helper.error403(res, 'Agency ID is required');
      }

      // Find the agency by ID
      const data = await db.users.findOne({
        where: {
          id: agencyId,
          role_type: "Agency"
        },
        raw: true,
      });

      // If agency not found, return error
      if (!data) {
        return helper.error403(res, 'Agency ID does not exist');
      }

      // Update the user status to deactivate the agency
      await db.users.update({ user_status: 0 }, {
        where: {
          id: agencyId,
        },
      });

      return helper.success(res, 'Agency deactivated successfully', {});

    } catch (error) {
      console.error('Error deactivating agency:', error);
      return helper.error403(res, 'Failed to deactivate agency');
    }
  },
  newPasswordAgency: async (req, res) => {
    const agencyId = req.query.agencyId;
    try {
      const required = {
        newPassword: req.body.newPassword,
      };
      const non_required = {}
      let requestData = await helper.vaildObject(required, non_required, res);

      const agency = await db.users.findOne({
        where: {
          id: agencyId,
          role_type: "Agency"
        },
        raw: true,
      });
      if (!agency) {
        return helper.error403(res, 'Agency not found');
      }
      const hash = await bcrypt.hash(requestData.newPassword, 10);

      await db.users.update(
        {
          password: hash,
        },
        {
          where: {
            id: agencyId,
          },
        }
      );
      return helper.success(
        res,
        'Password changed successfully',
      );

    } catch (error) {
      return helper.error403(res, error);
    }
  },

  // ============================================Lab Module ========================================================
  create_lab: async (req, res) => {
    try {
      const required = {
        name: req.body.name,
        email: req.body.email,
        user_name: req.body.user_name,
        role_type: "Lab",
        password: req.body.password,
        discount: req.body.discount,
      }
      const non_required = {
        emp_id: req.body.emp_id,
        avatar: req.files && req.files.avatar,
        lab_info_pdf: req.files && req.files.lab_info_pdf,

      }

      let requestData = await helper.vaildObject(required, non_required, res);
      console.log(required, "aaaaaaaaaaaaaaa")
      // return
      if (req.files && req.files.avatar) {
        requestData.avatar = helper.imageUpload(req.files.avatar, 'profile');
      }
      if (req.files && req.files.lab_info_pdf) {
        requestData.lab_info_pdf = helper.imageUpload(req.files.lab_info_pdf, 'profile');
      }
      // Check if email already exists
      const findRole = await db.users.findOne({
        where: {
          id: req.user.id,
        },
      });

      const exitEmail = await db.users.findOne({
        where: {
          email: requestData.email,
        },
      });
      if (exitEmail) {
        return helper.error403(res, "Email already Exists");
      }

      // Check if user name already exists
      const exitUserName = await db.users.findOne({
        where: {
          user_name: requestData.user_name,
        },
      });
      if (exitUserName) {
        return helper.error403(res, "User Name already Exists");
      }

      // Hash the password
      const password = bcrypt.hashSync(req.body.password, 10);
      requestData.password = password;
      console.log(requestData, "pppppppppppppppppppppp")
      // Check if role type is not "Admin"
      if (requestData.role_type !== "Admin") {
        const labCreated = await db.users.create(requestData);

        const empId = `EMP-${labCreated.id}`;
        const agencyId = findRole.id;
        labCreated.agency_id = agencyId
        labCreated.emp_id = empId;
        await labCreated.save();
        console.log(labCreated, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        // Send email with username and password
        const emailSubject = 'Lab Account Created';
        const emailBody = `
        <p>Dear ${requestData.name},</p>
        <p>Your lab account has been successfully created.</p>
         <p><strong>Email:</strong> ${requestData.email}</p>
        <p><strong>Username:</strong> ${requestData.user_name}</p>
        <p><strong>Password:</strong> ${req.body.password}</p>
        <p>Please change your password upon first login.</p>
      `;
        await sendEmail(requestData.email, emailSubject, emailBody);
        return helper.success(res, "Lab successfully Created", labCreated);
      } else {
        return helper.error403(res, "Role Admin Not Allowed");
      }
    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },

  getAllLabList: async (req, res) => {
    try {
      const findRole = await db.users.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (findRole.role_type == "Admin") {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';
        // Query to get the interviews for the tottal page
        const totalCount = await db.users.count({
          where: {
            role_type: "Lab",
            user_status: {
              [Op.not]: 1
            },
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } }
            ]
          },
        });

        // Query to get the interviews for the current page
        const findLab = await db.users.findAll({
          where: {
            role_type: "Lab",
            user_status: {
              [Op.not]: 1
            },
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } }
            ]
          },
          limit: limit,
          offset: offset
        });



        const LabCount = findLab.length;
        const totalPages = Math.ceil(LabCount / limit);

        return helper.success(res, "Lab Successfully Received", {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize: limit,
          findLab: findLab
        });
      }
      else {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';
        // Query to get the interviews for the tottal page
        const totalCount = await db.users.count({
          where: {
            role_type: "Lab",
            agency_id: req.user.id,
            user_status: {
              [Op.not]: 1
            },
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } }
            ]
          },
        });

        // Query to get the interviews for the current page
        const findLab = await db.users.findAll({
          where: {
            role_type: "Lab",
            agency_id: req.user.id,
            user_status: {
              [Op.not]: 1
            },
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } }
            ]
          },
          limit: limit,
          offset: offset
        });



        const LabCount = findLab.length;
        const totalPages = Math.ceil(LabCount / limit);

        return helper.success(res, "Lab Successfully Received", {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize: limit,
          findLab: findLab
        });
      }
    } catch (error) {
      console.log(error);
    }

  },

  getLabListBYId: async (req, res) => {
    try {
      const required = {}
      const non_required = {}
      let requestData = await helper.vaildObject(required, non_required, res);

      const findLab = await db.users.findOne({
        where: {
          id: req.query.labId,
          role_type: "Lab"
        }
      });
      if (!findLab) {
        return helper.error403(res, " Lab Id not exit");

      }

      return helper.success(res, "Lab Successfully Received",
        findLab);
    } catch (error) {
      console.log(error);
    }
  },

  updateLabById: async (req, res) => {
    try {
      const labId = req.query.labId;

      // Check if the Lab ID is provided
      if (!labId) {
        return helper.error403(res, 'Lab ID is required');
      }

      // Find the Lab by ID
      const findLab = await db.users.findOne({
        where: {
          id: labId,
          role_type: "Lab"
        }
      });

      // If user not found, return error
      if (!findLab.role_type) {
        return helper.error403(res, 'Lab ID not found');
      }
      // Construct the updated data object
      const updatedData = {
        name: req.body.name || findLab.name,
        email: req.body.email || findLab.email,
        user_name: req.body.user_name || findLab.user_name,
        avatar: req.files && req.files.avatar ? req.files.avatar : findLab.avatar,
        lab_info_pdf: req.files && req.files.lab_info_pdf ? req.files.lab_info_pdf : findLab.lab_info_pdf, 
        discount: req.body.discount || findLab.discount,
      };

      if (req.files && req.files.avatar) {
        updatedData.avatar = helper.imageUpload(req.files.avatar, 'profile');
      }
      if (req.files && req.files.lab_info_pdf) {
        updatedData.lab_info_pdf = helper.imageUpload(req.files.lab_info_pdf, 'profile');
      }

      // Check if the email is changing and if it already exists
      if (updatedData.email && updatedData.email !== findLab.email) {
        const existingLabWithEmail = await db.users.findOne({
          where: {
            email: updatedData.email,
            id: { [db.Sequelize.Op.not]: labId } // Exclude the current user
          }
        });

        if (existingLabWithEmail) {
          return helper.error403(res, 'Email already exists');
        }
      }

      // Update the Lab with the new data
      await findLab.update(updatedData);
      return helper.success(res, 'Lab updated successfully');

    } catch (error) {
      console.error('Error updating Lab:', error);
      return helper.error403(res, 'Failed to update Lab');
    }
  },

  deactivateLab: async (req, res) => {
    try {
      const labId = req.query.labId;

      // Check if the Lab ID is provided
      if (!labId) {
        return helper.error403(res, 'Lab ID is required');
      }

      // Find the Lab by ID
      const data = await db.users.findOne({
        where: {
          id: labId,
          role_type: "Lab"
        },
        raw: true,
      });

      // If Lab not found, return error
      if (!data) {
        return helper.error403(res, 'Lab ID does not exist');
      }

      // Update the user status to deactivate the Lab
      await db.users.update({ user_status: 1 }, {
        where: {
          id: labId,
        },
      });

      return helper.success(res, 'Lab deactivated successfully', {});

    } catch (error) {
      console.error('Error deactivating Lab:', error);
      return helper.error403(res, 'Failed to deactivate Lab');
    }
  },
  activateLab: async (req, res) => {
    try {
      const LabId = req.query.LabId;

      // Check if the agency ID is provided
      if (!LabId) {
        return helper.error403(res, 'Lab ID is required');
      }

      // Find the Lab by ID
      const data = await db.users.findOne({
        where: {
          id: LabId
        },
        raw: true,
      });

      // If Lab not found, return error
      if (!data) {
        return helper.error403(res, 'Lab ID does not exist');
      }

      // Update the user status to deactivate the Lab
      await db.users.update({ user_status: 0 }, {
        where: {
          id: LabId,
        },
      });

      return helper.success(res, 'Lab deactivated successfully', {});

    } catch (error) {
      console.error('Error deactivating Lab:', error);
      return helper.error403(res, 'Failed to deactivate Lab');
    }
  },
  newPasswordLab: async (req, res) => {
    const labId = req.query.labId;
    try {
      const required = {
        newPassword: req.body.newPassword,
      };
      const non_required = {}
      let requestData = await helper.vaildObject(required, non_required, res);

      const lab = await db.users.findOne({
        where: {
          id: labId,
          role_type: "Lab"
        },
        raw: true,
      });
      if (!lab) {
        return helper.error403(res, 'lab not found');
      }
      const hash = await bcrypt.hash(requestData.newPassword, 10);

      await db.users.update(
        {
          password: hash,
        },
        {
          where: {
            id: labId,
          },
        }
      );
      return helper.success(
        res,
        'Password changed successfully',
      );

    } catch (error) {
      return helper.error403(res, error);
    }
  },

  // ---------------------------------User-Panel ---------------------------------------------
  createSubscription: async (req, res) => {
    const { user_id, lab_id, agency_id, transaction_id } = req.body;

    try {
      // Validate request data
      if (!user_id || !transaction_id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      // Check if user exists
      const user = await users.findOne({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Optionally check if lab or agency exists if they are provided
      if (lab_id) {
        const lab = await users.findOne({ where: { id: lab_id } });
        if (!lab) {
          return res.status(404).json({ error: 'Lab not found' });
        }
      }

      if (agency_id) {
        const agency = await users.findOne({ where: { id: agency_id } });
        if (!agency) {
          return res.status(404).json({ error: 'Agency not found' });
        }
      }

      // Calculate subscription_end date (6 months from subscription_start)
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() + 6);


      const newSubscription = await Subscription.create({
        user_id,
        lab_id,
        agency_id,
        transaction_id,
        subscription_start: startDate,
        subscription_end: endDate
      });

      return helper.success(
        res,
        'Subscription created successfully',
        { subscription: newSubscription }
      );

    } catch (error) {
      return helper.error403(res, error);
    }
  },
  createAppointment: async (req, res) => {
    try {
      const required = {
        user_id: req.user.id,
        lab_id: req.body.lab_id,
        appointment_date: req.body.appointment_date,
        member_id: req.body.member_id,
        prescription: req.body.prescription,
      }
      const non_required = {
        subscription_id: req.body.subscription_id || "none",
        prescription_image: req.files && req.files.prescription_image,
      }

      let requestData = await helper.vaildObject(required, non_required, res);

      // return
      if (req.files && req.files.prescription_image) {
        requestData.prescription_image = helper.imageUpload(req.files.prescription_image, 'profile');
      }

      const appointmentCreate = await Appointment.create(requestData);

      return helper.success(
        res,
        'Appointment created successfully', { appointment: appointmentCreate }
      );

    } catch (error) {
      return helper.error403(res, error);
    }
  },



  // getAllAppointment: async (req, res) => {
  //   try {
  //     const { id } = req.user;
  //     const page = parseInt(req.query.page) || 1;
  //     const limit = parseInt(req.query.limit) || 10;
  //     const offset = (page - 1) * limit;
  //     const search = req.query.search || '';

  //     const findRole = await db.users.findOne({ where: { id } });

  //     if (!findRole) {
  //       return helper.error403(res, "User not found");
  //     }

  //     const isAdmin = findRole.role_type === "Admin";
  //     const whereClause = isAdmin ? {} : { lab_id: id };

  //     const totalCount = await db.appointments.count({ where: whereClause });

  //     const findAppointment = await db.appointments.findAll({
  //       where: whereClause,
  //       limit,
  //       offset,
  //       attributes: {
  //         include: [
  //           [
  //             db.sequelize.literal(
  //               '(SELECT phone FROM users WHERE users.id = appointments.user_id)'
  //             ),
  //             'user_number',
  //           ],
  //           [
  //             db.sequelize.literal(
  //               '(SELECT name FROM users WHERE users.id = appointments.lab_id)'
  //             ),
  //             'lab_name',
  //           ],
  //           [
  //             db.sequelize.literal(
  //               '(SELECT name FROM members WHERE members.id = appointments.member_id)'
  //             ),
  //             'member_name',
  //           ],
  //           [
  //             db.sequelize.literal(
  //               '(SELECT email FROM members WHERE members.id = appointments.member_id)'
  //             ),
  //             'member_email',
  //           ],
  //         ],
  //       },
  //     });

  //     const totalPages = Math.ceil(totalCount / limit);

  //     return helper.success(res, "Appointment Successfully Received", {
  //       totalCount,
  //       totalPages,
  //       currentPage: page,
  //       pageSize: limit,
  //       findAppointment,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return helper.error403(res, "Failed to fetch appointments");
  //   }
  // },

  getAllAppointment: async (req, res) => {
    try {
      const { id } = req.user;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || '';

      const findRole = await db.users.findOne({ where: { id } });

      if (!findRole) {
        return helper.error403(res, "User not found");
      }

      const isAdmin = findRole.role_type === "Admin";
      const whereClause = isAdmin ? {} : { [Op.or]: [{ lab_id: id }, { user_id: id }] };

      const totalCount = await db.appointments.count({ where: whereClause });

      const findAppointment = await db.appointments.findAll({
        where: whereClause,
        limit,
        offset,
        attributes: {
          include: [
            [
              db.sequelize.literal(
                '(SELECT phone FROM users WHERE users.id = appointments.user_id)'
              ),
              'user_number',
            ],
            [
              db.sequelize.literal(
                '(SELECT name FROM users WHERE users.id = appointments.lab_id)'
              ),
              'lab_name',
            ],
            [
              db.sequelize.literal(
                '(SELECT name FROM members WHERE members.id = appointments.member_id)'
              ),
              'member_name',
            ],
            [
              db.sequelize.literal(
                '(SELECT email FROM members WHERE members.id = appointments.member_id)'
              ),
              'member_email',
            ],
          ],
        },

      });

      const totalPages = Math.ceil(totalCount / limit);

      return helper.success(res, "Appointment Successfully Received", {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize: limit,
        findAppointment,
      });
    } catch (error) {
      console.error(error);
      return helper.error403(res, "Failed to fetch appointments");
    }
  },

  getAppointmentBYId: async (req, res) => {
    try {
      const required = {
        appointment_id: req.query.appointment_id // Ensure appointment_id is required
      };
      const non_required = {};

      let requestData = await helper.vaildObject(required, non_required, res);

      if (!requestData) {
        return;
      }

      const findAppointment = await db.appointments.findOne({
        where: {
          id: requestData.appointment_id,
        }
      });

      if (!findAppointment) {
        return helper.error403(res, "Appointment ID does not exist");
      }

      return helper.success(res, "Appointment Successfully Received", findAppointment);
    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },

  updateAppointmentById: async (req, res) => {
    try {
      const appointmentId = req.query.appointment_id;

      if (!appointmentId) {
        return helper.error403(res, 'Appointment ID is required');
      }

      const findAppointment = await db.appointments.findOne({
        where: {
          id: appointmentId,
        },
      });

      if (!findAppointment) {
        return helper.error403(res, 'Appointment ID not found');
      }

      const updatedData = {
        price: req.body.price || findAppointment.price,
        upload_bill: req.files && req.files.upload_bill ? req.files.upload_bill : findAppointment.upload_bill,
        upload_report: req.files && req.files.upload_report ? req.files.upload_report : findAppointment.upload_report,
      };

      if (req.files && req.files.upload_bill) {
        updatedData.upload_bill = helper.imageUpload(req.files.upload_bill, 'profile');
      }

      if (req.files && req.files.upload_report) {
        updatedData.upload_report = helper.imageUpload(req.files.upload_report, 'profile');
      }

      // Update the appointment with the new data
      await findAppointment.update(updatedData);
      return helper.success(res, 'Appointment updated successfully');
    } catch (error) {
      console.error('Error updating appointment:', error);
      return helper.error403(res, 'Failed to update appointment');
    }
  },

  updateAppointmentStatusById: async (req, res) => {
    try {
      const appointmentId = req.query.appointment_id;
     

      if (!appointmentId) {
        return helper.error403(res, 'Appointment ID is required');
      }

      const findAppointment = await Appointment.findOne({
        where: {
          id: appointmentId,
        },
      });
     
      if (!findAppointment) {
        return helper.error403(res, 'Appointment ID not found');
      }

      const updatedData = {
        status: req.body.status || findAppointment.status,
      };

      await findAppointment.update(updatedData);

      return helper.success(res, 'Appointment Status updated successfully');
    } catch (error) {
      console.error('Error updating appointment:', error);
      return helper.error403(res, 'Failed to update appointment');
    }
  },

  getAllUser: async (req, res) => {
      try {
      
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const offset = (page - 1) * limit;
          const search = req.query.search || '';
          const totalCount = await users.count({
            where: {
              role_type: "User",
              // user_status: {
              //   [Op.not]: 1
              // },
              // [Op.or]: [
              //   { name: { [Op.like]: `%${search}%` } },
              //   { email: { [Op.like]: `%${search}%` } }
              // ]
            },
          });
          const findUser = await db.users.findAll({
            where: {
              role_type: "User",
              // user_status: {
              //   [Op.not]: 1
              // },
              // [Op.or]: [
              //   { name: { [Op.like]: `%${search}%` } },
              //   { email: { [Op.like]: `%${search}%` } }
              // ]
            },
            limit: limit,
            offset: offset
          });
  
  
  
          const LabCount = findUser.length;
          const totalPages = Math.ceil(LabCount / limit);
  
          return helper.success(res, "User Successfully Received", {
            totalCount,
            totalPages,
            currentPage: page,
            pageSize: limit,
            findUser: findUser
          });
    
      
      } catch (error) {
        console.log(error);
      }
  },

  userListDownloadXml: async (req, res) => {
    try {
      const findUser = await db.users.findAll({
        where: {
            role_type: "User",
        }
    });

    const jsonData = findUser.map(user => user.toJSON());
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    const filePath = path.join(__dirname, 'users.xlsx');
    XLSX.writeFile(wb, filePath);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

    res.sendFile(filePath, (err) => {
      if (err) {
          console.error('Error while sending file:', err);
          return res.status(500).send('Error downloading file');
      }

      // Optionally delete the file after sending it
      fs.unlink(filePath, (err) => {
          if (err) console.log('Failed to delete file:', err);
      });
  });

     
        // return helper.success(res, "User Xml List Successfully Download");
  
    
    } catch (error) {
      console.log(error);
    }
},

agencyListDownloadXml: async (req, res) => {
  try {
    const findUser = await db.users.findAll({
      where: {
        role_type: "Agency",
      }
    });

    const jsonData = findUser.map(user => user.toJSON());
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    const filePath = path.join(__dirname, 'agency.xlsx'); // Changed file name to agency.xlsx
    XLSX.writeFile(wb, filePath);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=agency.xlsx'); // Set the correct filename

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error while sending file:', err);
        return res.status(500).send('Error downloading file');
      }

      // Delete the file after sending it
      fs.unlink(filePath, (err) => {
        if (err) console.log('Failed to delete file:', err);
      });
    });

  } catch (error) {
    console.log('Error in agencyListDownloadXml:', error);
    return res.status(500).send('An error occurred while processing your request.');
  }
},

labListDownloadXml: async (req, res) => {
  try {
    const findUser = await db.users.findAll({
      where: {
          role_type: "Lab",
      }
  });

  const jsonData = findUser.map(user => user.toJSON());
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(jsonData);
  XLSX.utils.book_append_sheet(wb, ws, "Users");
  const filePath = path.join(__dirname, 'labs.xlsx'); 

  XLSX.writeFile(wb, filePath);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=labs.xlsx');

  res.sendFile(filePath, (err) => {
    if (err) {
        console.error('Error while sending file:', err);
        return res.status(500).send('Error downloading file');
    }

    // Optionally delete the file after sending it
    fs.unlink(filePath, (err) => {
        if (err) console.log('Failed to delete file:', err);
    });
});

   
      // return helper.success(res, "User Xml List Successfully Download");

  
  } catch (error) {
    console.log(error);
  }
},

userSubscriptionListDownloadXml: async (req, res) => {
  try {
    const findUser = await db.users.findAll({
      where: {
          role_type: "User",
          subscription_status:"0"
      }
  });

  const jsonData = findUser.map(user => user.toJSON());
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(jsonData);
  XLSX.utils.book_append_sheet(wb, ws, "Users");
  const filePath = path.join(__dirname, 'subscriptions.xlsx');
  XLSX.writeFile(wb, filePath);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=subscriptions.xlsx');

  res.sendFile(filePath, (err) => {
    if (err) {
        console.error('Error while sending file:', err);
        return res.status(500).send('Error downloading file');
    }

    // Optionally delete the file after sending it
    fs.unlink(filePath, (err) => {
        if (err) console.log('Failed to delete file:', err);
    });
});

   
      // return helper.success(res, "User Xml List Successfully Download");

  
  } catch (error) {
    console.log(error);
  }
},

userUnSubscriptionListDownloadXml: async (req, res) => {
  try {
    const findUser = await db.users.findAll({
      where: {
          role_type: "User",
          subscription_status:"1"
      }
  });

  const jsonData = findUser.map(user => user.toJSON());
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(jsonData);
  XLSX.utils.book_append_sheet(wb, ws, "Users");
  const filePath = path.join(__dirname, 'Notsubscriptions.xlsx');
  XLSX.writeFile(wb, filePath);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=Notsubscriptions.xlsx');

  res.sendFile(filePath, (err) => {
    if (err) {
        console.error('Error while sending file:', err);
        return res.status(500).send('Error downloading file');
    }

    // Optionally delete the file after sending it
    fs.unlink(filePath, (err) => {
        if (err) console.log('Failed to delete file:', err);
    });
});

   
      // return helper.success(res, "User Xml List Successfully Download");

  
  } catch (error) {
    console.log(error);
  }
},

userListDownloadPdf: async (req, res) => {
  try {
      const findUser = await db.users.findAll({
          where: { role_type: "User" }
      });

      const filePath = path.join(__dirname, 'users.pdf');

      const doc = new PDFDocument();

      doc.pipe(fs.createWriteStream(filePath));

      doc.fontSize(18).text('User List', { align: 'center' });
      doc.moveDown();

      findUser.forEach((user, index) => {
          doc.fontSize(12).text(`User ${index + 1}`, { underline: true });
          doc.text(`Name: ${user.name}`);
          doc.text(`Email: ${user.email}`);
          doc.text(`Role: ${user.role_type}`);
          doc.text(`Phone: ${user.phone}`);
          doc.text('-------------------------');
          doc.moveDown();
      });

      doc.end();

      // Set headers to force download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');

      // Send the file for download
      res.sendFile(filePath, (err) => {
          if (err) {
              console.error('Error while sending file:', err);
              return res.status(500).send('Error downloading file');
          }

          // Optionally delete the file after sending it
          fs.unlink(filePath, (err) => {
              if (err) console.log('Failed to delete file:', err);
          });
      });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: 0, message: 'Internal Server Error' });
  }}
  ,
  updateSubsciptionStatus: async (req, res) => {
    try {
      const userId = req.query.user_id;
      if (!userId) {
        return helper.error403(res, 'User ID is required');
      }

      const findUser = await db.users.findOne({
        where: {
          id: userId,
        },
      });

      if (!findUser) {
        return helper.error403(res, 'User ID not found');
      }

      const updatedData = {
        subscription_status: req.body.subscription_status || findUser.subscription_status,      
      };

     
      await findUser
      .update(updatedData);
      return helper.success(res, ' Subscription updated successfully');
    } catch (error) {
      console.error('Error updating appointment:', error);
      return helper.error403(res, 'Failed to update appointment');
    }
  },
  createUserSubscription: async (req, res) => {
    console.log(req.user.id, "User ID");
    console.log(req.body);

    // Find user by ID
    const findUser = await db.users.findOne({
      where: {
        id: req.user.id,
      }
    });

    // If user not found, return error
    if (!findUser) {
      return helper.error403(res, 'ID not found');
    }

    const updatedData = {
      subscription_status: 0,
      // name: req.body.userData.name || findUser.name,
      // phone: req.body.userData.phone || findUser.phone,
    };

    try {
      // Update user data
      await findUser.update(updatedData);

      // Check if membersData is provided
      if (req.body.membersData) {
        const membersData = req.body.membersData;

        // Validate membersData
        if (!Array.isArray(membersData)) {
          return res.status(400).json({ message: 'membersData must be an array' });
        }

        if (membersData.length > 3) {
          return res.status(400).json({ message: 'Cannot process more than 3 members at a time' });
        }

        // Add user_id to each member
        membersData.forEach(member => {
          member.user_id = findUser.id;
        });

        // Save members data to the database
        const members = await db.members.bulkCreate(membersData);

        // Prepare the response object
        const response = {
          findUser: {
            id: findUser.id,
            name: findUser.name,
            role_type: findUser.role_type,
            gender: findUser.gender,
            age: findUser.age,
            phone: findUser.phone,
            avatar: findUser.avatar,
          },
          members: members
        };

        return helper.success(
          res,
          'Subscription created successfully',
          response
        );
      } else {
        // If no membersData, prepare response without members
        const response = {
          findUser: {
            id: findUser.id,
            name: findUser.name,
            role_type: findUser.role_type,
            gender: findUser.gender,
            age: findUser.age,
            phone: findUser.phone,
            avatar: findUser.avatar,
          }
        };

        return helper.success(
          res,
          'User data updated successfully',
          response
        );
      }

    } catch (error) {
      console.error(error);
      return helper.error403(res, error.message || 'An error occurred while creating the subscription');
    }
  },

  getUserSubscription: async (req, res) => {
    try {
      const userId = req.user.id;
      const findMembers = await db.members.findAll({
        where: {
          user_id: userId,
        },
      });

      return helper.success(res, "Member List Successfully Received", {
        findMembers: findMembers,
      });
    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },

  createOrder: async (req, res) => {
    try {
      let { amount, currency, customerId } = req.body;
      let options = {
          amount: amount,
          currency,
          receipt: nanoid()
      };
      let order = await rzp.orders.create(options);
      console.log(order, "User order details");
      res
          .status(200)
          .json({ msg: "order created successfully", orderLink: order });
  } catch (err) {
      res.status(500).json({ msg: "Internal server error", err });
  }
  },

  verifyPayment: async (req, res) => {
    try {
      let body = `${req.body.razorpayOrderId}|${req.body.razorpayPaymentId}`;
        let expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
            .update(body.toString())
            .digest('hex');
        if (expectedSignature === req.body.razorpaySignature) {
            console.log("Signature verify successfully");
            res.status(200).json({ msg: "Payment verify successfully" })
        } else {
            res.status(404).json({msg:"Payment verification failed"})
        }
    } catch (err) {
        res.status(500).json({ msg: "Internal server error", err });
    }
  },


};