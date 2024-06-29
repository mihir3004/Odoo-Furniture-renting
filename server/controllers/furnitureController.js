const furnitureModel = require("../models/furnitureModel");
const catchAsync = require("../utils/catchAsync");

module.exports.getAllFurniture = catchAsync(async (req, res, next) => {
  const furniture = await Furniture.find();
  res.json(furniture);
});
