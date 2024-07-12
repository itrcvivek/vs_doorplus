const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  categoryId: {
    type:String,
  },
  SubcategoryTitle: {
    type: String,
    required: [true, "Please Enter subcategorytitle"],
  },
  description: {
    type: String,
    required: [true, "Please Enter description"],
  },
  image:{
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

module.exports = mongoose.model("subCategoryModel", subCategorySchema);
