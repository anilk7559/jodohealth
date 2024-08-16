const path = require('path');
const { v4: uuid } = require('uuid');
const nodemailer = require('nodemailer');
const Razorpay = require("razorpay");


exports.success = (res, message, data = {}) => {
  res.status(200).json({ success: 1, code: 200, message, data });
};

exports.error400 = (res, message) => {
  res.status(400).json({ success: 0, code: 400, message });
};

exports.error401 = (res, message) => {
  res.status(401).json({ success: 0, code: 401, message });
};

exports.error403 = (res, message) => {
  res.status(403).json({ success: 0, code: 403, message });
};

exports.error404 = (res, message) => {
  res.status(404).json({ success: 0, code: 404, message });
};

exports.error500 = (res, message) => {
  res.status(500).json({ success: 0, code: 500, message });
};

exports.generate = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.imageUpload = (file, folder = 'users') => {
  let image = file;
  var extension = path.extname(image.name);
  var fileimage = uuid() + extension;
  image.mv(process.cwd() + '/public/images/' + folder + '/' + fileimage, function (err) {
    if (err) console.log(err);
  });
  const filename = `/images/${folder}/` + fileimage;
  if (extension !== '.jpeg' && extension !== '.jpg' && extension !== '.png') {
    return { extensions: extension, filenames: filename };
  } else {
    return filename;
  }
};

exports.sendEmail = async (to, subject, html) => {
  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'traineraswin2@gmail.com',
      pass: 'qhat pfxo rppe hkwx',
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

exports.validObject = async (required, non_required, res) => {
  let message = "";
  let empty = [];
  let table_name = required.hasOwnProperty("table_name") ? required.table_name : "users";

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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(required.password, saltRounds);
      required.password = hashedPassword;
    }

    const merge_object = Object.assign(required, non_required);
    delete merge_object.checkexit;

    for (let data in merge_object) {
      if (merge_object[data] == undefined) {
        delete merge_object[data];
      } else {
        if (typeof merge_object[data] == "string") {
          merge_object[data] = merge_object[data].trim();
        }
      }
    }

    return merge_object;
  }
};

//Helper function to create a receipt id in payment controller
exports.nanoid = async () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  return `receipt_${timestamp}_${randomNum}`;
}
