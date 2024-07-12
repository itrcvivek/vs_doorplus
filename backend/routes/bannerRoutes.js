const express = require("express");
const { isAuthanticatedUser, authorizedRole } = require("../middleware/auth");
const singlUpload = require("../middleware/multer");
const { BannerCreate, getBanner, BannerDelete, Doorplus_$$_Banner } = require("../controllers/BannerController");
const router = express.Router();
router
  .route("/admin/Banner/new").post(isAuthanticatedUser, authorizedRole("admin"),singlUpload,BannerCreate);

  router.route("/DoorPlusBG").get(getBanner)
  router.route("/BannerDelete/:id").delete(isAuthanticatedUser, authorizedRole("admin"),BannerDelete)

  module.exports = router;