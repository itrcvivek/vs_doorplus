const catchAsyncError = require("../middleware/catchAsyncError");
const userAddressModels = require("../models/addressModels");
const ErrorHander = require("../utils/errorHander");

exports.userAddress = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const UserAddress = await userAddressModels.create(req.body);
  res.status(201).json({
    success: true,
    UserAddress,
  });
});
exports.getuserAddress = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const getAddress = await userAddressModels.find(req.body);
  res.status(201).json({
    success: true,
    getAddress,
  });
});

exports.deleteAddress = catchAsyncError(async (req, res, next) => {
  const userAddress = await userAddressModels.findByIdAndDelete(req.params.id);
  if (!userAddress) {
    return next(new ErrorHander("Address not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Address deleted successfully",
  });
});
exports.updateAddress = catchAsyncError(async (req, res, next) => {
  let upAddress = await userAddressModels.findById(req.params.id);
  if (!upAddress) {
    return next(new ErrorHander("Address not found", 404));
  }
  updatedAddress = await userAddressModels.findByIdAndUpdate(
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
    updatedAddress,
  });
});
