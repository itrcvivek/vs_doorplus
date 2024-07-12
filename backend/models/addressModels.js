const mongoose = require("mongoose");
const AddressSchema = mongoose.Schema({
   
    FlatHouseNo: {
        type: String,
        required: [true, "Please enter House Number"]
    },
    LandMark: {
        type: String,
        required: [true, "Please enter LandMark"]
    },
    city: {
        type: String,
        required: [true, "Please enter city"]
    },
    zipCode: {
        type: Number,
        required: [true, "Please enter zip code"]
    },
    addressType: {
        type: String,
        enum: ["home", "office"],
        default: "home", 
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
  
})

module.exports = mongoose.model("userAddressModels", AddressSchema);