const express = require("express");
const { basicInfo, getUserBasicInfo, deleteBasicInfo, updateBasicInfo } = require("../controllers/basicInfoControllers");
const { isAuthanticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/basicinfo").post(isAuthanticatedUser,basicInfo);
router.route("/getUserBasicInfo").get(getUserBasicInfo);
router.route("/deleteBasicInfo/:id").delete(isAuthanticatedUser,deleteBasicInfo);
router.route("/updateBasicInfo/:id").put(isAuthanticatedUser,updateBasicInfo);

module.exports = router;