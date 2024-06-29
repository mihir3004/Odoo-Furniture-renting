const express = require("express");

const authController = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/getall", authController.protect, authController.getAll);

router.post("/resetPassword/:token", authController.resetPassword);
router.post("/forgotPassword", authController.forgetPassword);

//after login
router.patch(
    "/updateMyPassword",
    authController.protect,
    authController.updatePassword
);

module.exports = router;
