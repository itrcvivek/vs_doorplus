const validator = require('validator')
const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    lastname: {
        type: String,
        required: [true, "Please Enter Your last Name"],
        maxLength: [30, "last name cannot exceed 30 characters"],
        minLength: [4, "last name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    mobile: {
        type: String,
        required: [true, "Please Enter Your Mobile Number"],
    },

    FlatHouseNo: {
        type: String,
        maxLength: [30, "Flat House No  cannot exceed 30 characters"],
        minLength: [4, "Flat House No  should have more than 4 characters"],
    },
    LandMark: {
        type: String,
        maxLength: [30, "LandMark cannot exceed 30 characters"],
        minLength: [4, "LandMark should have more than 4 characters"],

    },
    Zip: {
        type: String,
        maxLength: [8, "Zip cannot exceed 30 characters"],
        minLength: [8, "Zip should have more than 4 characters"],
    },
    city: {
        type: String,
        maxLength: [30, "city cannot exceed 30 characters"],
        minLength: [4, "city should have more than 4 characters"],
    },
    categoryId: {
        type: String,
    },
    SubCatgoryId: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

module.exports = mongoose.model('BookingModel', BookingSchema)