const mongoose = require("mongoose");
const validator = require("validator");
const md5 = require("md5");
const crypto = require("crypto");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please tell your name!"],
  },
  email: {
    type: String,
    require: [true, "Please provide your email!"],
    // uniquw:true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  stripe_id: {
    type: String,
  },

  state: {
    type: String,
  },
  district: {
    type: String,
  },

  contact: {
    type: String,
  },
  password: {
    type: String,
    require: [true, "please provide a password"],
    minlength: 8,
    select: false,
  },

  isActive: {
    type: Number,
    default: 1,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  //only run this function if password was actuaaly modified
  if (!this.isModified("password")) {
    return next();
  }
  this.password = md5(this.password);

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
//

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  //in instance meathod this keyword points to the current document
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(this.passwordChangedAt, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  //False means not change  user can work
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
