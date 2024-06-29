const bookingModel = require("../models/bookingModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

module.exports.createBooking = catchAsync(async (req, res, next) => {
  const { user, furniture, startDate, endDate, totalAmount } = req.body;
  const newBooking = new bookingModel({
    user,
    furniture,
    startDate,
    endDate,
    totalAmount,
    status: "pending", // Default status
  });

  const booking = await newBooking.save();
  res.status(200).json({ booking });
});

module.exports.getBookings = catchAsync(async (req, res, next) => {
  const bookings = await bookingModel
    .find()
    .populate("user")
    .populate("furniture");
  res.json(bookings);
});
