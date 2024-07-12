const mongoose = require("mongoose");
const validator = require("validator");
const basicInfo = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    mobile: {
        type: Number,
        required: [true, "Please enter mobile number"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
  
})

module.exports = mongoose.model("userBasicInfo", basicInfo);