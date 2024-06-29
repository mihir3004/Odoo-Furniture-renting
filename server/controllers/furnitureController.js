const furnitureModel = require("../models/furnitureModel");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const { google } = require("googleapis");
const categoryModel = require("../models/categoryModel");

// Google Drive API credentials
const credentials = require("../../apikey.json"); // Replace with your actual credentials file
const scopes = ["https://www.googleapis.com/auth/drive"];
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);
const drive = google.drive({ version: "v3", auth });

module.exports.getAllFurniture = catchAsync(async (req, res, next) => {
  const furniture = await furnitureModel.find(req.query).populate("category");
  res.status(201).json({ status: "success", furniture });
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
    const images = []; // Array to store Google Drive file IDs or URLs

    // Upload each file to Google Drive and collect file IDs or URLs
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const filePath = file.path;
      const mimeType = file.mimetype;

      const fileMetadata = {
        name: file.filename,
        mimeType: mimeType,
        parents: ["1XXIX4fLAnLMAk0G47UBENlnQxmamTLwS"],
      };
      const media = {
        mimeType: mimeType,
        body: require("fs").createReadStream(filePath),
      };

      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id, webContentLink", // Retrieve file ID and webContentLink (URL)
      });

      const fileId = response.data.id;
      const fileUrl = response.data.webContentLink; // You can use this if you prefer to store URLs instead of IDs

      images.push(fileId); // Store Google Drive file ID
      // images.push(fileUrl); // Uncomment if storing URLs instead

      // Delete local file after uploading to Google Drive
      fs.unlinkSync(filePath);
    }

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
