const express = require('express')
const { isAuthanticatedUser, authorizedRole } = require('../middleware/auth')
const { FrequentlyQuestionsPost, getFrequentlyQuestions, deleteFrequentlyQuestion, updateFrequentlyQuestions } = require('../controllers/faqControllers')

const router = express.Router()
router.route("/FrequentlyQuestion")
    .post(isAuthanticatedUser, authorizedRole("admin"), FrequentlyQuestionsPost);

router.route("/AllFaQ")
    .get(getFrequentlyQuestions);

router.route("/FrequentlyQuestion/:id")
    .delete(isAuthanticatedUser, authorizedRole("admin"), deleteFrequentlyQuestion);

router.route("/updateFrequentlyQuestions/:id").put(isAuthanticatedUser, authorizedRole('admin'), updateFrequentlyQuestions)
module.exports = router