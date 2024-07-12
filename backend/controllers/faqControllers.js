const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/errorHander");
const FrequentlyQuestions = require("../models/faqModels")

exports.FrequentlyQuestionsPost = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    const frequentlyQuestion = await FrequentlyQuestions.create(req.body);
    const totalFrequentlyQuestion = await FrequentlyQuestions.countDocuments()
    res.status(201).json({
        success: true,
        frequentlyQuestion,
        totalFrequentlyQuestion,
      
    });
});



// exports.getFrequentlyQuestions = catchAsyncError(async (req, res, next) => {
//     const frequentlyQuestion = await FrequentlyQuestions.find(req.body);
//     const totalFrequentlyQuestion = await FrequentlyQuestions.countDocuments()
//     res.status(200).json({
//         success: true,
//         frequentlyQuestion,
//         totalFrequentlyQuestion
//     });
// });

exports.getFrequentlyQuestions = async (req, res, next) => {
  try {
    const FrequentlyQuestion = await FrequentlyQuestions.find();
    const totalFrequentlyQuestion = await FrequentlyQuestions.countDocuments();
    const formattedFaq = FrequentlyQuestion.map(Faq => ({
      _id: Faq._id,
      type: "Faq", 
      Faq: {
        _id: Faq._id,
        Questions: Faq.Questions,
        Answers: Faq.Answers,
        created_at: Faq.createdAt.toISOString(),
     
      }
    }));

    res.status(200).json({
      data: formattedFaq,
      meta: {
        totalFrequentlyQuestion
      },
      success: true
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};






exports.updateFrequentlyQuestions = catchAsyncError(async (req, res, next) => {
    let frequentlyQuestion = await FrequentlyQuestions.findById(req.params.id);
  
    if (!frequentlyQuestion) {
      return next(new ErrorHander("Frequently Question not found", 404));
    }
  
    frequentlyQuestion = await FrequentlyQuestions.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    // Assuming you have a message you want to send upon successful update
    const successMessage = 'Frequently Question updated successfully';
  
    res.status(200).json({
      success: true,
      message: successMessage,
      frequentlyQuestion,
    });
  });
  

exports.deleteFrequentlyQuestion = catchAsyncError(async (req, res, next) => {
    const FrequentlyQuestion = await FrequentlyQuestions.findByIdAndDelete(req.params.id);
    if (!FrequentlyQuestion) {
        return next(new ErrorHander("Frequently Question not found", 404));
    }
    const totalFrequentlyQuestion = await FrequentlyQuestions.countDocuments()
    res.status(200).json({
        success: true,
        message: "Frequently Question deleted",
        totalFrequentlyQuestion
    });
});
