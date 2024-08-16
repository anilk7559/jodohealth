var express = require("express");
const authcontroller = require("../controllers/authcontroller");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello , I am admin");
});

router.get("/test", authcontroller.test);
router.post("/login", authcontroller.login);
router.post("/reset_password", authcontroller.reset_password)
router.post("/forgot_password", authcontroller.forgot_password)
// router.get('/forget_page', authcontroller.get_forget_page);


router.post("/register-login", authcontroller.userRegisterLogin);
router.post("/verify-otp", authcontroller.verifyOtp);

router.use((req, res, next) => {
  return helper.error400(res, "API not available. Please connect with the developer");
});

module.exports = router;






