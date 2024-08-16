const db = require("../models");
const bcrypt = require("bcrypt");
const helper = require("../config/helper");
const { sendEmail } = require("../config/helper");
const moment = require("moment");
const mongoose = require("mongoose");

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

//Common Api

exports.getProfile = async (req, res) => {
  try {
    console.log(req.user._id, "Fetching user profile");

    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return helper.error400(res, "Invalid User ID");
    }

    const userProfile = await db.User.findById(req.user._id).select(
      "-password"
    );
    console.log("User profile retrieved:", userProfile);

    if (!userProfile) {
      return helper.error404(res, "User profile not found");
    }

    return helper.success(res, "Profile successfully retrieved", userProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return helper.error500(
      res,
      "An error occurred while fetching the profile."
    );
  }
};

exports.completeProfile = async (req, res) => {
  try {
    const required = {
      newPassword: req.body.newPassword,
      oldPassword: req.body.oldPassword,
    };
    const non_required = {};
    let requestData = await helper.validObject(required, non_required, res);

    const user = await db.User.findById(userId);

    if (!user) {
      return helper.error403(res, 'User not found');
    }

    const isOldPasswordValid = await bcrypt.compare(
      requestData.oldPassword,
      user.password
    );

    if (!isOldPasswordValid) {
      return helper.error403(res, 'Old password does not match');
    }

    if (requestData.oldPassword === requestData.newPassword) {
      return helper.error403(res, 'New password must be different from old password');
    }

    const hash = await bcrypt.hash(requestData.newPassword, 10);

    await db.User.findByIdAndUpdate(
      userId,
      { password: hash },
      { new: true } 
    );

    return helper.success(res, 'Password changed successfully');

  } catch (error) {
    console.error(error);
    return helper.error500(res, 'Internal server error');
  }
};


exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return helper.error403(res, 'User ID is required');
    }

    const findUser = await db.User.findById(userId);

    if (!findUser) {
      return helper.error403(res, 'User not found');
    }

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

    let requestData = await helper.validObject({}, non_required, res);

    if (req.files && req.files.avatar) {
      requestData.avatar = await helper.imageUpload(req.files.avatar, 'profile');
    }

    if (requestData.email && requestData.email !== findUser.email) {
      const existingUserWithEmail = await User.findOne({
        email: requestData.email,
        _id: { $ne: userId } 
      });

      if (existingUserWithEmail) {
        return helper.error403(res, 'Email already exists');
      }
    }

    await db.User.findByIdAndUpdate(userId, requestData, { new: true });

    return helper.success(res, 'User updated successfully');

  } catch (error) {
    console.error('Error updating User:', error);
    return helper.error500(res, 'Failed to update User');
  }
};

exports.dashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const findUser = await db.User.findById(userId);

    if (!findUser) {
      return helper.error403(res, 'User not found');
    }

    const roleType = findUser.role_type;

    const totalAppointment = await db.Appointment.countDocuments();
    const totalLab = await db.User.countDocuments({ role_type: 'Lab' });
    const totalUser = await db.User.countDocuments({ role_type: 'User' });

    console.log(totalAppointment, "aaaaaaa")
    let responseData = {
      totalAppointment,
      totalLab,
      totalUser
    };

    if (roleType === 'Admin') {
      const totalAgency = await db.User.countDocuments({ role_type: 'Agency' });
      const totalSubscription = await db.User.countDocuments({ subscription_status: 0 });
      responseData = { ...responseData, totalAgency, totalSubscription };
    } else if (roleType === 'Lab') {
      responseData.totalTest = 0; 
    } else if (roleType === 'Agency') {
      const totalAgency = await db.User.countDocuments({ role_type: 'Agency' });
      responseData = { ...responseData, totalAgency };
    }

    return helper.success(res, 'Dashboard Successfully Received', responseData);

  } catch (error) {
    console.error(error);
    return helper.error500(res, 'Failed to fetch data');
  }
};
///////-------------------------Admin ----------------------------------------------/////////
//////////Agency Start
exports.createAgency = async (req, res) => {
  try {
    const { name, email, user_name, password } = req.body;

    if (!name || !email || !user_name || !password) {
      return helper.error400(res, "Missing required fields");
    }

    const existingEmail = await db.User.findOne({ email });
    if (existingEmail) {
      return helper.error403(res, "Email already exists");
    }

    const existingUserName = await db.User.findOne({ user_name });
    if (existingUserName) {
      return helper.error403(res, "Username already exists");
    }

    console.log("Password before hashing:", password);

    const saltRounds = 10;
    console.log("Salt rounds:", saltRounds);

    if (typeof password !== "string") {
      return helper.error400(res, "Invalid password format");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hashedPassword);

    const newUser = new db.User({
      name,
      email,
      user_name,
      password: hashedPassword,
      role_type: "Agency",
      avatar:
        req.files && req.files.avatar
          ? helper.imageUpload(req.files.avatar, "profile")
          : undefined,
    });

    await newUser.save();

    newUser.emp_id = `EMP-${newUser._id}`;
    await newUser.save();

    const emailSubject = "Agency Account Created";
    const emailBody = `
      <p>Dear ${name},</p>
      <p>Your agency account has been successfully created.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Username:</strong> ${user_name}</p>
      <p>Please change your password upon first login.</p>
    `;
    await sendEmail(email, emailSubject, emailBody);

    return helper.success(res, "Agency successfully created", newUser);
  } catch (error) {
    console.error("Error in createAgency:", error);
    return helper.error500(res, "Internal Server Error");
  }
};

exports.getAllAgencies = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const totalCount = await db.User.countDocuments({
      role_type: "Agency",
      user_status: { $ne: 1 },
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    });

    const agencies = await db.User.find({
      role_type: "Agency",
      user_status: { $ne: 1 },
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    return helper.success(res, "Agencies successfully retrieved", {
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      agencies,
    });
  } catch (error) {
    console.error(error);
    return helper.error500(res, "Internal Server Error");
  }
};
exports.getAgencyById = async (req, res) => {
  try {
    const agencyId = req.query.agenctId; 
    if (!mongoose.Types.ObjectId.isValid(agencyId)) {
      return res
        .status(400)
        .json({ success: 0, code: 400, message: "Invalid Agency ID" });
    }

    const agency = await db.User.findById(agencyId);

    if (!agency) {
      return res
        .status(404)
        .json({ success: 0, code: 404, message: "Agency not found" });
    }

    return res
      .status(200)
      .json({
        success: 1,
        code: 200,
        message: "Agency Successfully Received",
        data: agency,
      });
  } catch (error) {
    console.error("Error in getAgencyById:", error);
    return res
      .status(500)
      .json({ success: 0, code: 500, message: "Internal Server Error" });
  }
};

exports.updateAgencyById = async (req, res) => {
  try {
    console.log("Query Parameter:", req.query.agencyId);

    const { agencyId } = req.query;

    if (!agencyId) {
      return helper.error403(res, "Agency ID is required");
    }

    const objectId = mongoose.Types.ObjectId.isValid(agencyId)
      ? new mongoose.Types.ObjectId(agencyId)
      : null;

    if (!objectId) {
      return helper.error403(res, "Invalid Agency ID");
    }

    const agency = await db.User.findOne({
      _id: objectId,
      role_type: "Agency",
    });

    if (!agency) {
      return helper.error403(res, "Agency ID not found");
    }

    const updatedData = {
      name: req.body.name || agency.name,
      email: req.body.email || agency.email,
      user_name: req.body.user_name || agency.user_name,
      avatar:
        req.files && req.files.avatar
          ? helper.imageUpload(req.files.avatar, "profile")
          : agency.avatar,
    };

    if (updatedData.email && updatedData.email !== agency.email) {
      const existingAgencyWithEmail = await db.User.findOne({
        email: updatedData.email,
        _id: { $ne: objectId },
      });

      if (existingAgencyWithEmail) {
        return helper.error403(res, "Email already exists");
      }
    }

    await db.User.updateOne({ _id: objectId }, updatedData);

    return helper.success(res, "Agency updated successfully");
  } catch (error) {
    console.error("Error updating agency:", error);
    return helper.error500(res, "Internal Server Error");
  }
};

exports.deactivateAgency = async (req, res) => {
  try {
    const { agencyId } = req.query;

    if (!agencyId) {
      return helper.error403(res, "Agency ID is required");
    }

    const objectId = mongoose.Types.ObjectId.isValid(agencyId)
      ? new mongoose.Types.ObjectId(agencyId)
      : null;

    if (!objectId) {
      return helper.error403(res, "Invalid Agency ID");
    }

    const result = await db.User.updateOne(
      { _id: objectId, role_type: "Agency" },
      { $set: { user_status: 1 } }
    );

    if (result.nModified === 0) {
      return helper.error403(res, "Agency ID does not exist");
    }

    return helper.success(res, "Agency deactivated successfully");
  } catch (error) {
    console.error("Error deactivating agency:", error);
    return helper.error500(res, "Internal Server Error");
  }
};

exports.activateAgency = async (req, res) => {
  try {
    const { agencyId } = req.query;

    if (!agencyId) {
      return helper.error403(res, "Agency ID is required");
    }

    const objectId = mongoose.Types.ObjectId.isValid(agencyId)
      ? new mongoose.Types.ObjectId(agencyId)
      : null;

    if (!objectId) {
      return helper.error403(res, "Invalid Agency ID");
    }

    const result = await db.User.updateOne(
      { _id: objectId, role_type: "Agency" },
      { $set: { user_status: 0 } }
    );

    if (result.nModified === 0) {
      return helper.error403(res, "Agency ID does not exist");
    }

    return helper.success(res, "Agency deactivated successfully");
  } catch (error) {
    console.error("Error deactivating agency:", error);
    return helper.error500(res, "Internal Server Error");
  }
};
exports.newPasswordAgency = async (req, res) => {
  try {
    const { agencyId } = req.query;
    const { newPassword } = req.body;

    if (!newPassword) {
      return helper.error400(res, "New password is required");
    }

    const objectId = mongoose.Types.ObjectId.isValid(agencyId)
      ? new mongoose.Types.ObjectId(agencyId)
      : null;

    if (!objectId) {
      return helper.error403(res, "Invalid Agency ID");
    }

    const agency = await db.User.findOne({
      _id: objectId,
      role_type: "Agency",
    });

    if (!agency) {
      return helper.error403(res, "Agency not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.User.updateOne(
      { _id: objectId },
      { $set: { password: hashedPassword } }
    );

    return helper.success(res, "Password changed successfully");
  } catch (error) {
    console.error("Error changing password:", error);
    return helper.error500(res, "Internal Server Error");
  }
};

// Lab Module
exports.createLab = async (req, res) => {
  try {
    const { name, email, user_name, password, discount } = req.body;

    if (!name || !email || !user_name || !password) {
      return helper.error400(res, "Missing required fields");
    }

    const existingEmail = await db.User.findOne({ email });
    if (existingEmail) {
      return helper.error403(res, "Email already exists");
    }

    const existingUserName = await db.User.findOne({ user_name });
    if (existingUserName) {
      return helper.error403(res, "Username already exists");
    }

    console.log("Password before hashing:", password);

    const saltRounds = 10;
    console.log("Salt rounds:", saltRounds);

    if (typeof password !== "string") {
      return helper.error400(res, "Invalid password format");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hashedPassword);

    const newUser = new db.User({
      name,
      email,
      user_name,
      password: hashedPassword,
      role_type: "Lab",
      avatar: req.files && req.files.avatar ? helper.imageUpload(req.files.avatar, "profile") : undefined,
      discount: discount
    });

    await newUser.save();

    newUser.emp_id = `EMP-${newUser._id}`;
    await newUser.save();

    const emailSubject = "Lab Account Created";
    const emailBody = `
      <p>Dear ${name},</p>
      <p>Your lab account has been successfully created.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Username:</strong> ${user_name}</p>
      <p>Please change your password upon first login.</p>
    `;
    await sendEmail(email, emailSubject, emailBody);

    return helper.success(res, "Lab successfully created", newUser);
  } catch (error) {
    console.error("Error creating lab:", error);
    return helper.error500(res, "Internal Server Error");
  }
};


exports.getAllLabs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const totalCount = await db.User.countDocuments({
      role_type: "Lab",
      user_status: { $ne: 1 },
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    });

    const labs = await db.User.find({
      role_type: "Lab",
      user_status: { $ne: 1 },
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    return helper.success(res, "Labs successfully retrieved", {
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      labs,
    });
  } catch (error) {
    console.error(error);
    return helper.error500(res, "Internal Server Error");
  }
};
exports.getLabBYId = async (req, res) => {
  try {
    const labId = req.query.labId;

    if (!mongoose.Types.ObjectId.isValid(labId)) {
      return res
        .status(400)
        .json({ success: 0, code: 400, message: "Invalid Agency ID" });
    }

    const labs = await db.User.findById(labId);

    if (!labs) {
      return res
        .status(404)
        .json({ success: 0, code: 404, message: "labs not found" });
    }

    return res
      .status(200)
      .json({
        success: 1,
        code: 200,
        message: "labs Successfully Received",
        data: labs,
      });
  } catch (error) {
    console.error("Error in getlabsById:", error);
    return res
      .status(500)
      .json({ success: 0, code: 500, message: "Internal Server Error" });
  }
};

exports.updateLabById = async (req, res) => {
  try {
    console.log("Query Parameter:", req.query.labId);

    const { labId } = req.query;

    if (!labId) {
      return helper.error403(res, "Agency ID is required");
    }

    const objectId = mongoose.Types.ObjectId.isValid(labId)
      ? new mongoose.Types.ObjectId(labId)
      : null;

    if (!objectId) {
      return helper.error403(res, "Invalid Agency ID");
    }

    const lab = await db.User.findOne({
      _id: objectId,
      role_type: "Lab",
    });

    if (!lab) {
      return helper.error403(res, "Lab ID not found");
    }

    const updatedData = {
      name: req.body.name || lab.name,
      email: req.body.email || lab.email,
      user_name: req.body.user_name || lab.user_name,
      avatar:
        req.files && req.files.avatar
          ? helper.imageUpload(req.files.avatar, "profile")
          : lab.avatar,
    };

    if (updatedData.email && updatedData.email !== lab.email) {
      const existingAgencyWithEmail = await db.User.findOne({
        email: updatedData.email,
        _id: { $ne: objectId },
      });

      if (existingAgencyWithEmail) {
        return helper.error403(res, "Email already exists");
      }
    }

    await db.User.updateOne({ _id: objectId }, updatedData);

    return helper.success(res, "Lab updated successfully");
  } catch (error) {
    console.error("Error updating Lab:", error);
    return helper.error500(res, "Internal Server Error");
  }
};

exports.deactivateLab = async (req, res) => {
  try {
    const { labId } = req.query;

    if (!labId) {
      return helper.error403(res, "Lab ID is required");
    }

    const objectId = mongoose.Types.ObjectId.isValid(labId)
      ? new mongoose.Types.ObjectId(labId)
      : null;

    if (!objectId) {
      return helper.error403(res, "Invalid Lab ID");
    }

    const result = await db.User.updateOne(
      { _id: objectId, role_type: "Lab" },
      { $set: { user_status: 1 } }
    );

    if (result.nModified === 0) {
      return helper.error403(res, "Lab ID does not exist");
    }

    return helper.success(res, "Lab deactivated successfully");
  } catch (error) {
    console.error("Error deactivating lab:", error);
    return helper.error500(res, "Internal Server Error");
  }
};

exports.activateLab = async (req, res) => {
  try {
    const { labId } = req.query;

    if (!labId) {
      return helper.error403(res, "Agency ID is required");
    }

    const objectId = mongoose.Types.ObjectId.isValid(labId)
      ? new mongoose.Types.ObjectId(labId)
      : null;

    if (!objectId) {
      return helper.error403(res, "Invalid Agency ID");
    }

    const result = await db.User.updateOne(
      { _id: objectId, role_type: "Lab" },
      { $set: { user_status: 0 } }
    );

    if (result.nModified === 0) {
      return helper.error403(res, "Lab ID does not exist");
    }

    return helper.success(res, "Lab deactivated successfully");
  } catch (error) {
    console.error("Error deactivating lab:", error);
    return helper.error500(res, "Internal Server Error");
  }
};
exports.newPasswordLab = async (req, res) => {
  try {
    const { labId } = req.query;
    const { newPassword } = req.body;

    if (!newPassword) {
      return helper.error400(res, "New password is required");
    }

    const objectId = mongoose.Types.ObjectId.isValid(labId)
      ? new mongoose.Types.ObjectId(labId)
      : null;

    if (!objectId) {
      return helper.error403(res, "Invalid Lab ID");
    }

    const agency = await db.User.findOne({
      _id: objectId,
      role_type: "Lab",
    });

    if (!agency) {
      return helper.error403(res, "Lab not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.User.updateOne(
      { _id: objectId },
      { $set: { password: hashedPassword } }
    );

    return helper.success(res, "Password changed successfully");
  } catch (error) {
    console.error("Error changing password:", error);
    return helper.error500(res, "Internal Server Error");
  }
};

// //////////////////////////User
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const totalCount = await db.User.countDocuments({
      role_type: "User",
      user_status: { $ne: 1 },
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    });

    const labs = await db.User.find({
      role_type: "User",
      user_status: { $ne: 1 },
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    return helper.success(res, "Users successfully retrieved", {
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      labs,
    });
  } catch (error) {
    console.error(error);
    return helper.error500(res, "Internal Server Error");
  }
};


////////////////   Appointment
exports.getAllAppointment = async (req, res) => {
  try {
    const { id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    const findRole = await db.User.findById(id).exec();

    if (!findRole) {
      return helper.error403(res, "User not found");
    }

    const isAdmin = findRole.role_type === "Admin";
    const filter = isAdmin ? {} : { $or: [{ lab_id: id }, { user_id: id }] };

    const totalCount = await db.Appointment.countDocuments(filter).exec();

    const findAppointment = await db.Appointment.find(filter)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'user_id',
        select: 'phone',
        model: db.User,  
        justOne: true,
        options: { lean: true }
      })
      .populate({
        path: 'lab_id',
        select: 'name',
        model: db.User,  
        justOne: true,
        options: { lean: true }
      })
      .populate({
        path: 'member_id',
        select: 'name email',
        model: db.Member,  
        justOne: true,
        options: { lean: true }
      })
      .exec();

    const totalPages = Math.ceil(totalCount / limit);

    return helper.success(res, "Appointment Successfully Received", {
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      findAppointment,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return helper.error500(res, "Failed to fetch appointments");
  }
};

exports.getAppointmentBYId = async (req, res) => {
  try {
    const required = {
      appointment_id: req.query.appointment_id 
    };
    const non_required = {};

    let requestData = await helper.validObject(required, non_required, res);

    if (!requestData) {
      return;
    }

    const findAppointment = await db.Appointment.findById(requestData.appointment_id);

    if (!findAppointment) {
      return helper.error403(res, "Appointment ID does not exist");
    }

    return helper.success(res, "Appointment Successfully Received", findAppointment);
  } catch (error) {
    console.log(error);
    return helper.error500(res, "Internal Server Error");
  }
};

exports.updateAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.query.appointment_id;

    if (!appointmentId) {
      return helper.error403(res, 'Appointment ID is required');
    }

    const findAppointment = await db.Appointment.findById(appointmentId);

    if (!findAppointment) {
      return helper.error403(res, 'Appointment ID not found');
    }

    const updatedData = {
      price: req.body.price || findAppointment.price,
      upload_bill: findAppointment.upload_bill,
      upload_report: findAppointment.upload_report,
    };

    if (req.files && req.files.upload_bill) {
      updatedData.upload_bill = helper.imageUpload(req.files.upload_bill, 'profile');
    }

    if (req.files && req.files.upload_report) {
      updatedData.upload_report = helper.imageUpload(req.files.upload_report, 'profile');
    }

    await db.Appointment.findByIdAndUpdate(appointmentId, updatedData, { new: true });

    return helper.success(res, 'Appointment updated successfully');
  } catch (error) {
    console.error('Error updating appointment:', error);
    return helper.error403(res, 'Failed to update appointment');
  }
};

exports.updateAppointmentStatusById = async (req, res) => {
  try {
    const appointmentId = req.query.appointment_id;

    if (!appointmentId) {
      return helper.error403(res, 'Appointment ID is required');
    }

    const findAppointment = await db.Appointment.findById(appointmentId);

    if (!findAppointment) {
      return helper.error403(res, 'Appointment ID not found');
    }

    const updatedData = {
      status: req.body.status || findAppointment.status,
    };

    await db.Appointment.findByIdAndUpdate(appointmentId, updatedData, { new: true });

    return helper.success(res, 'Appointment status updated successfully');
  } catch (error) {
    console.error('Error updating appointment:', error);
    return helper.error403(res, 'Failed to update appointment');
  }
};

///////-------------------------Admin ----------------------------------------------/////////


// ______USER


exports.createAppointment = async (req, res) => {
  // try {
  //   const required = {
  //     user_id: req.user.id,
  //     lab_id: req.body.lab_id,
  //     appointment_date: req.body.appointment_date,
  //     member_id: req.body.member_id,
  //     prescription: req.body.prescription,
  //   };

  //       if (!member_id || !appointment_date || !lab_id || !user_id) {
  //         return helper.error400(res, 'Missing required fields');
  //       }
  //   const non_required = {
  //     // subscription_id: req.body.subscription_id || "none",
  //     prescription_image: req.files && req.files.prescription_image,
  //   };

  //   let requestData = await helper.validObject(required, non_required, res);

  //   if (req.files && req.files.prescription_image) {
  //     const image = req.files.prescription_image;
  //     const extension = path.extname(image.name);
  //     const fileImage = uuid() + extension;
  //     const filePath = path.join(process.cwd(), 'public', 'images', 'profile', fileImage);

  //     image.mv(filePath, (err) => {
  //       if (err) {
  //         console.error("Error uploading file:", err);
  //         return helper.error500(res, "Error uploading file");
  //       }
  //     });

  //     requestData.prescription_image = `/images/profile/${fileImage}`;
  //   }

  //   const appointmentCreate = await db.Appointment.create(requestData);

  //   return helper.success(
  //     res,
  //     'Appointment created successfully', 
  //     { appointment: appointmentCreate }
  //   );

  // } catch (error) {
  //   console.error("Error creating appointment:", error);
  //   return helper.error500(res, "Failed to create appointment");
  // }

  try {
    const { member_id, appointment_date, lab_id } = req.body;
    const user_id = req.user.id
    if (!member_id || !appointment_date || !lab_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAppointment = new db.Appointment({
      member_id,
      appointment_date,
      lab_id,
      user_id,
    });

    await newAppointment.save();

    return res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: newAppointment,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);

    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.createUserSubscription = async (req, res) => {
  try {
    const findUser = await db.User.findById(req.user.id);

    if (!findUser) {
      return helper.error403(res, 'User ID not found');
    }

    const updatedData = {
      subscription_status: 0,
    };

    await db.User.findByIdAndUpdate(findUser._id, updatedData, { new: true });

    if (req.body.membersData) {
      const membersData = req.body.membersData;

      if (!Array.isArray(membersData)) {
        return helper.error400(res, 'membersData must be an array');
      }

      if (membersData.length > 3) {
        return helper.error400(res, 'Cannot process more than 3 members at a time');
      }

      membersData.forEach(member => {
        member.user_id = findUser._id;
      });

      const members = await db.Member.insertMany(membersData);

      const response = {
        findUser: {
          id: findUser._id,
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
      const response = {
        findUser: {
          id: findUser._id,
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
    console.error("Error creating subscription:", error);
    return helper.error500(res, error.message || 'An error occurred while creating the subscription');
  }
};

exports.getUserSubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const findMembers = await db.Member.find({ user_id: userId });

    return helper.success(res, "Member List Successfully Received", {
      findMembers: findMembers,
    });
  } catch (error) {
    console.error("Error fetching member list:", error);
    return helper.error500(res, "Internal Server Error");
  }
};

exports.userListDownloadXml = async (req, res) => {
  try {
    const findUser = await db.User.find({ role_type: "User" }).exec();

    // Convert MongoDB documents to JSON
    const jsonData = findUser.map(user => user.toObject());

    // Create a new workbook and worksheet using the JSON data
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    // Define the file path for saving the Excel file
    const filePath = path.join(__dirname, 'users.xlsx');
    XLSX.writeFile(wb, filePath);

    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

    // Send the file to the client
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
    console.log('Error in userListDownloadXml:', error);
    return res.status(500).send('An error occurred');
  }
};

exports.agencyListDownloadXml = async (req, res) => {
  try {
    const findUser = await db.User.find({ role_type: "Agency" }).exec();
    const jsonData = findUser.map(user => user.toObject());

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    const filePath = path.join(__dirname, 'agency.xlsx');
    XLSX.writeFile(wb, filePath);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=agency.xlsx');

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error while sending file:', err);
        return res.status(500).send('Error downloading file');
      }

      fs.unlink(filePath, (err) => {
        if (err) console.log('Failed to delete file:', err);
      });
    });

  } catch (error) {
    console.log('Error in agencyListDownloadXml:', error);
    return res.status(500).send('An error occurred while processing your request.');
  }

};

exports.labListDownloadXml = async (req, res) => {
  try {
    const findUser = await db.User.find({ role_type: "Lab" }).exec();
    const jsonData = findUser.map(user => user.toObject());

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

      fs.unlink(filePath, (err) => {
        if (err) console.log('Failed to delete file:', err);
      });
    });

  } catch (error) {
    console.log('Error in labListDownloadXml:', error);
    return res.status(500).send('An error occurred while processing your request.');
  }

};

exports.userSubscriptionListDownloadXml = async (req, res) => {
  try {
    const findUser = await db.User.find({ role_type: "User", subscription_status: "0" }).exec();
    const jsonData = findUser.map(user => user.toObject());

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

      fs.unlink(filePath, (err) => {
        if (err) console.log('Failed to delete file:', err);
      });
    });

  } catch (error) {
    console.log('Error in userSubscriptionListDownloadXml:', error);
    return res.status(500).send('An error occurred while processing your request.');
  }
};
exports.userUnSubscriptionListDownloadXml = async (req, res) => {

  try {
    const findUser = await db.User.find({ role_type: "User", subscription_status: "1" }).exec();
    const jsonData = findUser.map(user => user.toObject());

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

      fs.unlink(filePath, (err) => {
        if (err) console.log('Failed to delete file:', err);
      });
    });

  } catch (error) {
    console.log('Error in userUnSubscriptionListDownloadXml:', error);
    return res.status(500).send('An error occurred while processing your request.');
  }
};


