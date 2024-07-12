const express = require("express");
const { isAuthanticatedUser } = require("../middleware/auth");
const { userAddress, getuserAddress, deleteAddress, updateAddress } = require("../controllers/addressController");
const router = express.Router();

router.route("/address").post(isAuthanticatedUser,userAddress);
router.route("/getaddress").get(isAuthanticatedUser,getuserAddress);
router.route("/deleteAddress/:id").delete(isAuthanticatedUser,deleteAddress);
router.route("/updateAddress/:id").put(isAuthanticatedUser,updateAddress);

module.exports = router;