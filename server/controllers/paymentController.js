const paymentModel = require("../models/paymentModel");
const bookingModel = require("../models/bookingModel");
const furnitureModel = require("../models/furnitureModel");

module.exports.addPayment = async (req, res, next) => {
    console.log(req.body);
    try {
        const newBooking = new bookingModel({
            user: req.body.user,
            furniture: req.body.furniture,
            startDate: Date.now(),
            endDate: Date.now(),
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
        const furniture = await furnitureModel.findOne({
            _id: req.body.furniture,
        });
        furniture.available = false;
        await furniture.save();
        res.json({
            booked,
            payment,
            status: "success",
        });
    } catch (err) {
        console.log(err);
        res.json({
            err,
        });
    }
};
