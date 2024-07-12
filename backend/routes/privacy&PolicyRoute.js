const express = require("express");
const { isAuthanticatedUser, authorizedRole } = require("../middleware/auth");
const {
  privacyPolicy,
  getPrivacyPolicy,
  updateprivacyPolicy,
  deleteprivacyPolicy,
} = require("../controllers/privacy&PolicyController");
const router = express.Router();

router
  .route("/privacyPolicy")
  .post(isAuthanticatedUser, authorizedRole("admin"), privacyPolicy);

router.route("/PrivacyPolicy").get( getPrivacyPolicy);
router
  .route("/PrivacyPolicy/:id")
  .put(isAuthanticatedUser, authorizedRole("admin"), updateprivacyPolicy);
router
  .route("/PrivacyPolicy/:id")
  .delete(isAuthanticatedUser, authorizedRole("admin"), deleteprivacyPolicy);
module.exports = router;
