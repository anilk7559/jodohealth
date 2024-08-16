var express = require("express");
const apiController = require("../controllers/apiController");
const paymentController = require('../controllers/paymentController')

var router = express.Router();
var middleware = require("../middlewares/Auth");
const { checkUserRole } = require('../middlewares/roleCheck');
const helper = require("../config/helper");

router.get("/", function (req, res, next) {
  res.send("Hello, Welcome to baseline pm tool");
});


router.get("/user/download/xml", apiController.userListDownloadXml);
router.get("/agency/download/xml", apiController.agencyListDownloadXml);
router.get("/lab/download/xml", apiController.labListDownloadXml);
router.get("/user/subscription/download/xml", apiController.userSubscriptionListDownloadXml);
router.get("/user/unsubscription/download/xml", apiController.userUnSubscriptionListDownloadXml);

router.use(middleware.Auth);

// Common Api
router.get("/getProfile", apiController.getProfile);

// Admin Panel
router.post("/agency/create-account", checkUserRole("Admin"), apiController.createAgency);
router.get("/agency/all-list", checkUserRole("Admin"), apiController.getAllAgencies);
router.get("/agency/list", checkUserRole("Admin"), apiController.getAgencyById);
router.post("/agency/update", checkUserRole("Admin"), apiController.updateAgencyById);
router.get("/agency/deactivate", checkUserRole("Admin"), apiController.deactivateAgency);
router.get("/agency/activate", checkUserRole("Admin"), apiController.activateAgency);
router.post("/agency/newPassword", checkUserRole("Admin"), apiController.newPasswordAgency);

// Lab Module
router.post("/lab/create-account", checkUserRole("Admin","Agency"), apiController.createLab);
router.get("/lab/all-list", checkUserRole("Admin","Agency"), apiController.getAllLabs);
router.get("/lab/list", checkUserRole("Admin","Agency"), apiController.getLabBYId);
router.post("/lab/update", checkUserRole("Admin","Agency"), apiController.updateLabById);
router.get("/lab/deactivate", checkUserRole("Admin","Agency"), apiController.deactivateLab);
router.get("/lab/activate", checkUserRole("Admin","Agency"), apiController.activateLab);
router.post("/lab/newPassword", checkUserRole("Admin","Agency"), apiController.newPasswordLab);

// User Module
router.get("/user/all-list", checkUserRole("Admin","Agency"), apiController.getAllUsers);

// Appointment
router.get("/appointment/all-list", checkUserRole("Admin","Agency","Lab","User"), apiController.getAllAppointment);
router.get("/appointment/list", checkUserRole("Admin","Lab"), apiController.getAppointmentBYId);
router.post("/appointment/update", checkUserRole("Admin","Lab"), apiController.updateAppointmentById);
router.post("/appointment/update/status", checkUserRole("Admin","Lab"), apiController.updateAppointmentStatusById);

// Common Panel
router.get("/getProfile", apiController.getProfile);
router.post("/complete-profile", checkUserRole("Agency", "Admin","Lab","User"), apiController.completeProfile);
router.post("/changePassword", checkUserRole("Agency", "Admin","Lab"), apiController.changePassword);
router.get("/dashboard", checkUserRole("Agency", "Admin","Lab"), apiController.dashboard);

// User Panel
// router.post("/user/create-subscription", apiController.createSubscription);
router.post("/user/create-appointment", apiController.createAppointment);//pending
router.post("/user/subscription", apiController.createUserSubscription);
router.get("/user/subscription/member", apiController.getUserSubscription);

//Sukhi
router.post('/order', checkUserRole("User"),paymentController.createOrder)
router.post("/verify", checkUserRole("User"),paymentController.verifyPayment)
router.post("/webhook", checkUserRole("User"),paymentController.webhookEventMonitor)
router.use((req, res, next) => {
  return helper.error400(res, "API not available. Please connect with the developer");
});

module.exports = router;




