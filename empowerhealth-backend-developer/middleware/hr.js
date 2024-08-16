const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const db = require("../models");
const helper = require("../config/helper");

module.exports = {
  Hr: async (req, res, next) => {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return helper.error401(
          res,
          "You are not logged in! Please log in to get access."
        );
      }

      const decoded = await promisify(jwt.verify)(token, "my_secret_key");

      if (!decoded) {
        return helper.error401(
          res,
          "Invalid token! Please log in again."
        );
      }

      console.log(decoded.role_type,"ppppppppp")

      
      console.log(decoded.role_type, "ppppppppp");

      if (decoded.role_type !== "HR") {
        return helper.error401(
          res,
          "You are not authorized to access this resource."
        );
      }

      const currentUser = await db.users.findOne({
        where: {
          id: decoded.id,
          role_type: decoded.role_type,
        },
      });

      if (!currentUser) {
        return helper.error401(
          res,
          "The user belonging to this token does not exist."
        );
      }

      req.user = currentUser;
      next();
 
    } catch (error) {
      console.error("Error verifying token:", error);
      return helper.error403(
        res,
        "An unexpected error occurred while verifying the token."
      );    }
  },
};
