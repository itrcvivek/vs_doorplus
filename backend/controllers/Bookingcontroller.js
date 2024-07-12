const catchAsyncError = require("../middleware/catchAsyncError");
const bookingModels = require("../models/bookingModels");
const ErrorHander = require("../utils/errorHander");

exports.CreateBooking = catchAsyncError(async (req, res, next) => {
    console.log(req.user, "jjJKJKKJ");
    req.body.user = req.user.id;
    const Booking = await bookingModels.create(req.body);
    const bookingFormateData = {
        _id: Booking._id,
        type: 'Booking check Out',
        Booking: {
            _id: Booking._id,
            name: Booking.name,
            lastname: Booking.lastname,
            mobile: Booking.mobile,
            email: Booking.email,
            user:Booking.user
        }
    }
    res.status(201).json({
        data: bookingFormateData,
        success: true
    });
});


exports.getBookings = catchAsyncError(async(req,res,next)=>{
    const Booking = await bookingModels.find()
    
    const formateData = Booking.map(Booking=>({
        _id: Booking._id,
        type: 'Booking check Out',
        Booking: {
            _id: Booking._id,
            name: Booking.name,
            lastname: Booking.lastname,
            mobile: Booking.mobile,
            email: Booking.email,
            FlatHouseNo:Booking.FlatHouseNo,
            LandMark:Booking.LandMark,
            city:Booking.city,
            zipcode:Booking.zipcode,
            categoryId:Booking.categoryId,
            SubCatgoryId:Booking.SubCatgoryId,
            user:Booking.user

        }
    }))
    res.status(201).json({
        data: formateData,
        success: true 
    })
})

exports.updateBooking = catchAsyncError(async (req, res, next) => {
    let updateBooking = await bookingModels.findById(req.params.id);
     console.log(updateBooking,"kkkkk")
     console.log(req.params.id,"hjhh")
    if (!updateBooking) {
        return next(new ErrorHander("Booking not found", 404));
    }

    updateBooking = await bookingModels.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        data: updateBooking
    });
});