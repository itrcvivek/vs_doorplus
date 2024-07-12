const express = require("express");
const { isAuthanticatedUser, authorizedRole } = require("../middleware/auth");
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
} = require("../controllers/categoryControllers");
const singleUpload = require("../middleware/multer");

const router = express.Router();

//get all category
router.route("/getCategory").get(getAllCategory);

//creat new category
router
  .route("/admin/category/new").post(isAuthanticatedUser, authorizedRole("admin"),singleUpload,createCategory);

router
  .route("/Category/:id")
  .put(isAuthanticatedUser, authorizedRole("admin"), singleUpload, updateCategory)
  .delete(isAuthanticatedUser, authorizedRole("admin"), deleteCategory);

//  router
//   .route("/Category/=id")
//   .put(isAuthanticatedUser, authorizedRole("admin"), updateCategory)
//.delete(isAuthanticatedUser, authorizedRole("admin"), deleteCategory)
//    .get(getCategoryDetails);

module.exports = router;
