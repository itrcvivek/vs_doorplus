const express = require("express");
const { isAuthanticatedUser, authorizedRole } = require("../middleware/auth");
const { createSubCategory, getAllSubCategory, deleteSubCategory, updateSubCategory } = require("../controllers/sabCategoryControllers");
const singlUpload = require("../middleware/multer");

const router = express.Router();

// Create Sub Category -----Admin
router
    .route("/admin/subCategory")
    .post(isAuthanticatedUser, authorizedRole("admin"), singlUpload,createSubCategory);
// get Sub Category
router
    .route("/subCategory/:categoryId")
    .get(getAllSubCategory);


    router
  .route("/updateSubCategory/:id")
  .put(isAuthanticatedUser, authorizedRole("admin"), updateSubCategory);

// delete Sub category ----Admin
router
    .route("/subCategory/:id")
    .delete(isAuthanticatedUser, authorizedRole("admin"), deleteSubCategory);

module.exports = router;


