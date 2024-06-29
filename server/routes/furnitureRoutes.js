const furnitureController = require("../controllers/furnitureController");
const authController = require("./../controllers/authController");
const multer = require("multer");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Destination folder for storing uploaded images temporarily
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/getAll", furnitureController.getAllFurniture);
router.post(
  "/add",
  upload.array("images", 5),
  furnitureController.addFurniture
);
router.get("/getCategories", furnitureController.getCategories);
router.get("/getCount", furnitureController.getCount);

module.exports = router;
