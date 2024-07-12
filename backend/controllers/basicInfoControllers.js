const catchAsyncError = require("../middleware/catchAsyncError");
const userBasicInfo = require("../models/basicInfoModels");
const ErrorHander = require("../utils/errorHander");

exports.basicInfo = catchAsyncError(async (req, res, next) => {
  console.log(req.user, "jj");
  req.body.user = req.user.id;
  const BasicInfo = await userBasicInfo.create(req.body);
  res.status(201).json({
    success: true,
    BasicInfo,
  });
});
exports.getUserBasicInfo = catchAsyncError(async (req, res, next) => {
  const getBasicInfo = await userBasicInfo.find(req.body);
  res.status(200).json({
    success: true,
    getBasicInfo,
  });
});
exports.deleteBasicInfo = catchAsyncError(async (req, res, next) => {
  const BasicInfo = await userBasicInfo.findByIdAndDelete(req.params.id);
  if (!BasicInfo) {
    return next(new ErrorHander("Basic Info not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Basic Info deleted",
  });
});
exports.updateBasicInfo = catchAsyncError(async (req, res, next) => {
  let BasicInfo = await userBasicInfo.findById(req.params.id);
  if (!BasicInfo) {
    return next(new ErrorHander("Basic Info not found", 404));
  }
  BasicInfo = await userBasicInfo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    BasicInfo,
  });
});
