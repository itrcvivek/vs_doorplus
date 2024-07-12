const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  
  Blogtitle: {
    type: String,
    required: [true, "Please Enter Blog Title"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Blog Description"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
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
});

module.exports = mongoose.model("blogPost", BlogSchema);
