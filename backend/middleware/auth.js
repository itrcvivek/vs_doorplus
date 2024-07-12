
const catchAsyncError = require("./catchAsyncError");
const user = require("../models/userModels");
const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorHander");

exports.isAuthanticatedUser = catchAsyncError(async (req, res, next) => {
// console.log(req.cookies,'kk')
    const { token } = req.headers;
// console.log(token ,'kk')
    if (!token) {
        return next(new ErrorHander("please login to access this resource", 401));
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decodeData.id);
    next();
});

exports.authorizedRole = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return next(new ErrorHander(
                `Role:${req.user.role} 
        is not allowed to access this `
                , 403
            )
            );
        }

        next();
    }
}
