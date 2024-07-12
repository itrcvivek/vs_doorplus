const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
        title: {
            type: String,
            required: [true, "Please Enter Category Name"],
           
        },
        description: {
            type: String,
            required: [true, "Please Enter Category Description"]
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
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

});

module.exports = mongoose.model("CategoryModel", categorySchema);



