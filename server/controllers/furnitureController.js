const furnitureModel = require("../models/furnitureModel");
const catchAsync = require("../utils/catchAsync");

module.exports.getAllFurniture = catchAsync(async (req, res, next) => {
  const furniture = await Furniture.find();
  res.status(201).json({ status: "success", furniture });
});

module.exports.addFurniture = catchAsync(async (req, res, next) => {
  const { name, description, price, image, category, location } = req.body;

  const newFurniture = new furnitureModel({
    name,
    description,
    rentalPrice,
    images,
    category,
    rentalPeriod,
    ownerId,
    location,
  });

  const furniture = await newFurniture.save();
  res.status(201).json({ status: "success", furniture });
});
