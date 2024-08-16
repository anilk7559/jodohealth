// In middleware/roleCheck.js
const helper = require("../config/helper");

exports.checkUserRole = function(...rolesRequired) {
  return function(req, res, next) {
    const userRole = req.user.role_type; 
    const hasAccess = rolesRequired.some(role => role === userRole);

    if (hasAccess) {
      next(); 
    } else {
      return helper.error401(
        res,
        "You are not allow this api.",`Your role is ${userRole}`
      );
    }
  };
};

  