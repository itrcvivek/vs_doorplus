const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, getUserDetails, resetPassword } = require("../controllers/userController")
const { isAuthanticatedUser ,authorizedRole} = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/loginuser").post(loginUser);
router.route("/logoutuser").get(logoutUser);
 router.route("/password/forgot").post(forgotPassword);
  router.route("/password/reste/:token").put(resetPassword);
router.route("/me").get(isAuthanticatedUser,getUserDetails);

module.exports = router;



