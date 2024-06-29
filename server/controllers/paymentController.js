const paymentModel = require("../models/paymentModel");
const bookingModel = require("../models/bookingModel");

module.exports.addPayment = async (req, res, next) => {
  try {
    const newBooking = new bookingModel({
      user: req.body.user,
      furniture: req.body.furniture,
      startDate: Date.now(),
      endDate: req.body.endDate,
      totalAmount: req.body.totalAmount,
    });

    const booked = await newBooking.save();

    const newPay = new paymentModel({
      buyerId: req.body.buyerId,
      sellerId: req.body.sellerId,
      amount: req.body.amount,
      bookingId: booked._id,
    });

    const payment = await newPay.save();

    res.json({
      booked,
      payment,
    });
  } catch (err) {
    console.log(err);
    res.json({
      err,
    });
  }
};
