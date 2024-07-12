const mongoose = require("mongoose");

const FrequentlyQuestionsSchema = mongoose.Schema({
    Questions: {
    type: String,
    required: [true, "Please Enter Questions"],
  },
  Answers: {
    type: String,
    required: [true, "Please Enter Answers"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model("FrequentlyQuestions", FrequentlyQuestionsSchema);
