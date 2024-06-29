const furnitureModel = require("../models/furnitureModel");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const categoryModel = require("../models/categoryModel");

module.exports.getAllFurniture = catchAsync(async (req, res, next) => {
  const furniture = await furnitureModel.find(req.query).populate("category");

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
      rentalPrice,
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

  // const {
  //   name,
  //   description,
  //   rentalPrice,
  //   images,
  //   available,
  //   category,
  //   rentalPeriod,
  //   ownerId,
  // } = req.body;

  // const newFurniture = new furnitureModel({
  //   name,
  //   description,
  //   rentalPrice,
  //   images,
  //   available,
  //   category,
  //   rentalPeriod,
  //   ownerId,
  // });

  // const furniture = await newFurniture.save();
  // res.status(201).json({ status: "success", furniture });
};

module.exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await categoryModel.find({});
  res.status(200).json({ categories });
});
