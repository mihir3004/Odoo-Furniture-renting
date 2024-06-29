const mongoose = require("mongoose");
const furnitureModel = require("./furnitureModel");

const paymentSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  sellerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  amount: {
    type: Number,
  },
  isSent: {
    type: Boolean,
    default: false,
  },
  isReceived: {
    type: Boolean,
    default: false,
  },
  bookingId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "bookings",
  },
});
