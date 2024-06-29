const furnitureModel = require("../models/furnitureModel");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const categoryModel = require("../models/categoryModel");
const paymentModel = require("../models/paymentModel");

module.exports.getAllFurniture = catchAsync(async (req, res, next) => {
    let query = { ownerId: { $ne: req.query.id }, available: true };

    if (req.query.category) {
        query.category = req.query.category;
    }

    if (req.query.state) {
        query.state = req.query.state;
    }
    if (req.query.district) {
        query.district = req.query.district;
    }

    const furniture = await furnitureModel
        .find(query)
        .populate("category")
        .populate("ownerId");

    res.status(200).json({ status: "success", furnitures: furniture });
});

module.exports.getFurniture = catchAsync(async (req, res, next) => {
    const furniture = await furnitureModel
        .find(req.query)
        .populate("category")
        .populate("ownerId");

    res.status(201).json({ status: "success", furnitures: furniture });
});

module.exports.addFurniture = async (req, res, next) => {
    console.log(req.body);
    try {
        const {
            name,
            description,
            rentalPrice,
            available,
            category,
            rentalPeriod,
            ownerId,
        } = req.body;

        // Upload each file to Google Drive and collect file IDs or URLs

        const images = req.files.map((file) => file.filename);
        console.log(images);

        // Save furniture document with images (file IDs or URLs) to MongoDB
        const newFurniture = new furnitureModel({
            name,
            description,
            rentalPrice: rentalPrice * 100,
            available,
            images,
            category,
            rentalPeriod,
            ownerId,
        });
        await newFurniture.save();

        res.status(201).json({ message: "Furniture created successfully" });
    } catch (error) {
        console.error("Error creating furniture:", error);
        res.status(500).json({ error: "Failed to create furniture" });
    }
};

module.exports.getCategories = catchAsync(async (req, res, next) => {
    const categories = await categoryModel.find({});
    res.status(200).json({ categories });
});

module.exports.getCount = async (req, res) => {
    const categories = await categoryModel.countDocuments();
    const sellCount = await paymentModel.aggregate([{ $unwind: "$furniture" }]);
    const result = await paymentModel.aggregate([
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
        status: "success",
        categories,
        sellCount: sellCount.length,
        totalAmount: result[0].totalAmount * 0.1,
    });
};

module.exports.chartCount = async (req, res) => {
    try {
        const { groupByField } = req.query;

        if (!groupByField) {
            return res
                .status(400)
                .json({ error: "Missing groupByField parameter" });
        }

        const pipeline = [
            {
                $group: {
                    _id: `$${groupByField}`,
                    count: { $sum: 1 },
                },
            },
        ];

        const result = await furnitureModel.aggregate(pipeline);

        res.status(200).json({
            status: "success",
            result,
        });
    } catch (err) {
        console.error("Error while aggregating data:", err);
        res.status(500).json({ error: "Failed to aggregate data" });
    }
};
