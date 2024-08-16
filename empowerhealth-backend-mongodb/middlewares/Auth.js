const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const helper = require("../config/helper");

module.exports = {
  Auth: async (req, res, next) => {
    try {
      let token;
      
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return helper.error401(res, "You are not logged in! Please log in to get access.");
      }

      const decoded = await promisify(jwt.verify)(token, "my_secret_key");
      console.log("Decoded token:", decoded);

      const userId = decoded.id.toString();
      const currentUser = await User.findById(userId);

      if (!currentUser) {
        return helper.error401(res, "The user belonging to this token does no longer exist.");
      }

      req.user = currentUser;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return helper.error401(res, "Token has expired. Please log in again.");
      } else {
        console.log("Authentication error:", error);
        return helper.error401(res, "Failed to authenticate token.");
      }
    }
  }
};
