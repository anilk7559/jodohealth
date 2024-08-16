// In middleware/roleCheck.js
const helper = require("../config/helper");

exports.checkUserRole = function(...rolesRequired) {
  return function(req, res, next) {
    // Assuming req.user contains the authenticated user's details
    const userRole = req.user.role_type; // Adjust according to your authentication setup

    // Check if the user's role matches any of the required roles
    const hasAccess = rolesRequired.some(role => role === userRole);

    if (hasAccess) {
      next(); // Proceed to the route handler
    } else {
      return helper.error401(
        res,
        "You are not allow this api.",`Your role is ${userRole}`
      );
    }
  };
};

  