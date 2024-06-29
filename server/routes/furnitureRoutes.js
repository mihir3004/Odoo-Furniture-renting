const furnitureController = require("../controllers/furnitureController");
const authController = require("./../controllers/authController");
const express = require("express");
const router = express.Router();

router.get("/getAllFurniture", furnitureController.getAllFurniture);
router.post(
  "/addFurniture",
  authController.protect,
  furnitureController.addFurniture
);

module.exports = router;
