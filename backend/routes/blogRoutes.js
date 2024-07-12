const express = require("express");
const { isAuthanticatedUser, authorizedRole } = require("../middleware/auth");
const singleUpload = require("../middleware/multer");
const { blogPost, getAllBlogs, deleteBlogPost, updateBlogPost } = require("../controllers/blogControllers");

const router = express.Router();

router
  .route("/admin/BlogPost/new")
  .post(isAuthanticatedUser, authorizedRole("admin"), singleUpload, blogPost);
router.route("/AllBlogs").get(getAllBlogs);
router.delete("/blog/:id", isAuthanticatedUser, authorizedRole("admin"), deleteBlogPost);
router.put("/updateBlog/:id", isAuthanticatedUser, authorizedRole("admin"), singleUpload, updateBlogPost);
module.exports = router;
