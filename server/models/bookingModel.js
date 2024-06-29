const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true, // Add index for better search performance
  },
  furniture: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "furnitures",
      required: true,
      index: true, // Add index for better search performance
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    index: true, // Add index for better search performance
  },
  isActive: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bookings", BookingSchema);
