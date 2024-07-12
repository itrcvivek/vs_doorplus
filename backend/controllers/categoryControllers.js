const ErrorHander = require("../Utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const Features = require("../utils/features");
const CategoryModel = require("../models/CategoryModels");
const cloudinary = require('cloudinary');
const getDataUri = require("../utils/dataUri");



exports.createCategory = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  const fileUri = getDataUri(file);
   console.log(fileUri,"gvgyuugygb")
  const myCloud = await cloudinary.uploader.upload(fileUri.content, {
   // folder: 'CategoryImg'
  });
  console.log(myCloud,"rggrt")
  const newCategory = await CategoryModel.create({
    title: req.body.title,
    description: req.body.description,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.url
    }, 
    user: req.user.id
  });
  console.log(newCategory,"gghgh")

  res.status(201).json({
    success: true,
    newCategory,
  });
});

exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  const categoryCount = await CategoryModel.countDocuments();
  // const resultPerPage = 4;
  const apiFeature = new Features(CategoryModel.find(), req.query)
    .search()
    .filter()
  // .pagination(resultPerPage);
  const categories = await apiFeature.query;
  if (!categories) {
    return next(new ErrorHander("Category not found", 404));
  }
  res.status(200).json({
    success: true,
    categories,
    categoryCount,
  });
});
exports.updateCategory = catchAsyncError(async (req, res, next) => {
  let category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "category not found"
    });
  }

  category.title = req.body.title || category.title;
  category.description = req.body.description || category.description;
  if (req.file) {
    await cloudinary.uploader.destroy(category.image.public_id);
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.uploader.upload(fileUri.content, {});

    category.image = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  }
  await category.save();
  res.status(200).json({
    success: true,
    category,
  });
});
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const categorydelte = await CategoryModel.findById(req.params.id);
  if (!categorydelte) {
    return res.status(404).json({
      success: false,
      message: "category not found"
    });
  }
  await cloudinary.uploader.destroy(categorydelte.image.public_id);
  await CategoryModel.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "category deleted successfully"
  });
});

// get AlCategory Details
// exports.getCategoryDetails = catchAsyncError(async (req, res, next) => {
//     const category = await CategoryModel.findById(req.params.id);
//     if (!category) {
//         return next(new ErrorHander("Category not found", 404));
//     }
//     res.status(200).json({
//         success: true,
//         category
//     });
// });
