const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rentalPrice: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
        default: true,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
    category: {
        type: String,
        required: true,
    },
    rentalPeriod: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
    },
});

module.exports = mongoose.model("furnitures", furnitureSchema);