const express = require('express')
const { CreateBooking, updateBooking, getBookings } = require('../controllers/Bookingcontroller')
const { isAuthanticatedUser } = require('../middleware/auth')

const router = express.Router()

router.route("/Booking").post( isAuthanticatedUser, CreateBooking),
router.route("/updateBooking/:id").put(isAuthanticatedUser,updateBooking)
router.route("/getBookings").get(getBookings)

module.exports = router