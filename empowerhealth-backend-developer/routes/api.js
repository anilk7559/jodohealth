var express = require("express");
const apiController = require("../controllers/apiController");
const paymentController = require("../controllers/paymentController");

var router = express.Router();
//Added middleware
var middleware = require("../middleware/Auth")
//Check User Role Permission
const { checkUserRole } = require('../middleware/roleCheck');
const helper = require("../config/helper");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello , Welcome to baseline pm tool");
});

// Sub Admin Module
router.get("/user/download/xml", apiController.userListDownloadXml);
router.get("/agency/download/xml", apiController.agencyListDownloadXml);
router.get("/lab/download/xml", apiController.labListDownloadXml);
router.get("/lab/download/xml", apiController.labListDownloadXml);
router.get("/user/subscription/download/xml", apiController.userSubscriptionListDownloadXml);
router.get("/user/unsubscription/download/xml", apiController.userUnSubscriptionListDownloadXml);



router.get("/user/download/pdf", apiController.userListDownloadPdf);


router.use(middleware.Auth)

//User Module
router.get("/create-subscription'", paymentController.createSubscription);
router.get("/confirm-payment'", paymentController.confirmPayment);
router.get("/create-phonepe-payment'", paymentController.createPhonepePayment);
router.get("/phonepe-callback'", paymentController.phonepeCallback);
router.get("/create-googlepay-payment'", paymentController.createGooglepayPayment);


// router.post("/appointment/create", apiController.createAppointment)
//Common Api
// router.post("/logout", checkUserRole("Agency", "Admin"),apiController.logout)
// router.post('/logout', checkUserRole("Agency", "Admin"), apiController.logout);
router.post('/refresh-token', apiController.refreshToken)
router.delete('/logout', apiController.logout)



////////////////////////////////////////////Admin Panel Start //////////////////////////////////////////////

//Agency Module
router.post("/agency/create-account", checkUserRole("Admin"),apiController.create_agency);
router.get("/agency/all-list", checkUserRole("Admin"),apiController.getAllAgencyList);
router.get("/agency/list", checkUserRole("Admin"),apiController.getAgencyListBYId);
router.post("/agency/update", checkUserRole("Admin"),apiController.updateAgencyById);
router.get("/agency/deactivate", checkUserRole("Admin"),apiController.deactivateAgency)
router.get("/agency/activate", checkUserRole("Admin"),apiController.activateAgency)
router.post("/agency/newPassword", checkUserRole("Admin"),apiController.newPasswordAgency);


//Lab Module
router.post("/lab/create-account", checkUserRole("Admin","Agency"),apiController.create_lab);
router.get("/lab/all-list", checkUserRole("Admin","Agency"),apiController.getAllLabList);
router.get("/lab/list", checkUserRole("Admin","Agency"),apiController.getLabListBYId);
router.post("/lab/update", checkUserRole("Admin","Agency"),apiController.updateLabById);
router.get("/lab/deactivate", checkUserRole("Admin","Agency"),apiController.deactivateLab)
router.get("/lab/activate", checkUserRole("Admin","Agency"),apiController.activateLab)
router.post("/lab/newPassword", checkUserRole("Admin","Agency"),apiController.newPasswordLab);

//Appointment 
router.get("/appointment/all-list", checkUserRole("Admin","Agency","Lab","User"),apiController.getAllAppointment);
router.get("/appointment/list", checkUserRole("Admin","Lab"),apiController.getAppointmentBYId);
router.post("/appointment/update", checkUserRole("Admin","Lab","User"),apiController.updateAppointmentById);
router.post("/appointment/update/status", checkUserRole("Admin","Lab"),apiController.updateAppointmentStatusById);


//User 
router.get("/user/all-list", checkUserRole("Admin","Agency","Lab"),apiController.getAllUser);
router.post("/user/subscription/status", checkUserRole("Admin"),apiController.updateSubsciptionStatus);
// router.get("/user/download/xml", checkUserRole("Admin"),apiController.userListDownloadXml);



////////////////////////////////////////////Admin Panel End //////////////////////////////////////////////

////////////////////////////////////////////Lab Panel Start //////////////////////////////////////////////


////////////////////////////////////////////Lab Panel End //////////////////////////////////////////////


////////////////////////////////////////////Agency Panel Start //////////////////////////////////////////////


////////////////////////////////////////////Agency Panel End //////////////////////////////////////////////


////////////////////////////////////////////Common Panel Start //////////////////////////////////////////////
router.get("/getProfile", apiController.getProfile);
router.post("/compleate-profile", checkUserRole("Agency", "Admin","Lab","User"),apiController.completeProfile)
router.post("/changePassword", checkUserRole("Agency", "Admin","Lab"),apiController.changePassword)
router.get("/dashboard", checkUserRole("Agency", "Admin","Lab"),apiController.dashboard)




////////////////////////////////////////////Common Panel End //////////////////////////////////////////////

////////////////////////////////////////////User Panel Start //////////////////////////////////////////////
router.post("/user/create-subscription", apiController.createSubscription);
router.post("/user/create-appointment", apiController.createAppointment);
router.post("/user/subscription", apiController.createUserSubscription);
router.get("/user/subscription/member", apiController.getUserSubscription);


// app.post('user/order', apiController.createOrder)
// app.post("user/verify", apiController.verifyPayment)
////////////////////////////////////////////User Panel End //////////////////////////////////////////////


router.use((req, res, next) => {
  return helper.error400(res, "API not available. Please connect with the developer");
});
module.exports = router;
