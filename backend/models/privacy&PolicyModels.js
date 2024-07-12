const mongoose = require("mongoose");

const privacyPolicySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter title"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Description"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("privacyPolicy", privacyPolicySchema);
