const catchAsyncError = require("../middleware/catchAsyncError");
const privacyPolicy = require("../models/privacy&PolicyModels");
const ErrorHander = require("../utils/errorHander");

exports.privacyPolicy = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const privacyAndPolicy = await privacyPolicy.create(req.body);
  console.log(privacyAndPolicy, "mm");
  res.status(201).json({
    success: true,
    privacyAndPolicy,
  });
});
exports.getPrivacyPolicy = catchAsyncError(async (req, res, next) => {
  const PrivacyAndPolicy = await privacyPolicy.find(req.body);
  res.status(200).json({
    success: true,
    PrivacyAndPolicy,
  });
});
exports.updateprivacyPolicy = catchAsyncError(async (req, res, next) => {
  let privacyandPolicy = await privacyPolicy.findById(req.params.id);
  console.log(privacyandPolicy, "jj");
  if (!privacyandPolicy) {
    return next(new ErrorHander("privacy Policy not found", 404));
  }
  privacyAndPolicy = await privacyPolicy.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    privacyAndPolicy,
  });
});
exports.deleteprivacyPolicy = catchAsyncError(async (req, res, next) => {
  const privacyAndPolicy = await privacyPolicy.findByIdAndDelete(req.params.id);
  if (!privacyAndPolicy) {
    return next(new ErrorHander("privac & Policy not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "privac & Policy deleted",
  });
});
