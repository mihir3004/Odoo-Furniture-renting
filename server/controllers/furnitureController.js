const furnitureModel = require("../models/furnitureModel");
const catchAsync = require("../utils/catchAsync");

module.exports.getAllFurniture = catchAsync(async (req, res, next) => {
  const furniture = await furnitureModel.find(req.query);
  res.status(201).json({ status: "success", furniture });
});

module.exports.addFurniture = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    rentalPrice,
    images,
    available,
    category,
    rentalPeriod,
    ownerId,
  } = req.body;

  const newFurniture = new furnitureModel({
    name,
    description,
    rentalPrice,
    images,
    available,
    category,
    rentalPeriod,
    ownerId,
  });

  const furniture = await newFurniture.save();
  res.status(201).json({ status: "success", furniture });
});
