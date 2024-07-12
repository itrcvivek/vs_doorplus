const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary").v2;
const getDataUri = require("../utils/dataUri");
const BlogPost = require("../models/blogModel");

exports.blogPost = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.uploader.upload(fileUri.content, {});
  const PostCreated = await BlogPost.create({
    Blogtitle: req.body.Blogtitle,
    description: req.body.description,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.url,
    },
    user: req.user.id,
  });
  res.status(201).json({
    success: true,
    PostCreated,
  });
});
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogPost.find();
    const totalblogs = await BlogPost.countDocuments();
    const formattedBlogs = blogs.map(blog => ({
      _id: blog._id,
      type: "Blog", 
      blogPost: {
        _id: blog._id,
        title: blog.Blogtitle,
        description: blog.description,
        created_at: blog.createdAt.toISOString(),
        image: blog.image.url
      }
    }));

    res.status(200).json({
      data: formattedBlogs,
      meta: {
        totalblogs
      },
      success: true
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.deleteBlogPost = catchAsyncError(async (req, res, next) => {
  const blog = await BlogPost.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found"
    });
  }
  await cloudinary.uploader.destroy(blog.image.public_id);
  await BlogPost.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Blog post deleted successfully"
  });
});


exports.updateBlogPost = catchAsyncError(async (req, res, next) => {
  let blog = await BlogPost.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found"
    });
  }

  blog.Blogtitle = req.body.Blogtitle || blog.Blogtitle;
  blog.description = req.body.description || blog.description;
  if (req.file) {
    await cloudinary.uploader.destroy(blog.image.public_id);
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.uploader.upload(fileUri.content, {});

    blog.image = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  }
  await blog.save();
  res.status(200).json({
    success: true,
    blog,
  });
});








