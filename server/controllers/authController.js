const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // secure: true,
    httpOnly: true,
  };

  if (!process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  //remove pass from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

module.exports.signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      state: req.body.state,
      role: "user",
      district: req.body.district,
      contact: req.body.contact,
      stripeId: req.body.stripeId || "",
    });

    // const token = signToken(newUser._id);
    createSendToken(newUser, 201, res);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      status: "fail",
      message: "An error occurred while creating the user",
      error: err.message,
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // 1) Check if email and password exist
    if (!email || !password || !role) {
      return next(
        new AppError("Please provide email , password and Role!", 400)
      );
    }

    // 2) Check if user exists && password is correct
    const user = await userModel
      .findOne({ email: email, role: role })
      .select("+password");

    if (!user) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports.protect = async (req, res, next) => {
  try {
    // 1. Get token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "fail",
          message: "Your token has expired! Please log in again.",
        });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          status: "fail",
          message: "Invalid token. Please log in again.",
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }

    // 3. Check if user still exists
    const currentUser = await userModel.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The token belongs to a user that no longer exists.",
      });
    }

    // 4. Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: "fail",
        message: "User recently changed password! Please log in again.",
      });
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you do not have permision to perform this action", 403)
      );
    }
    next();
  };
};

module.exports.getAll = async (req, res, next) => {
  try {
    const all = await userModel.find({});
    res.json({ all });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};

module.exports.forgetPassword = async (req, res, next) => {
  //1.get user based on posted email
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is  no user with this mail"));
  }
  //2.geenerate the randome reset token
  const resetToken = user.createPasswordResetToken();
  // console.log(resetToken);
  await user.save({ validateBeforeSave: false });
  console.log("done!!!");
  res.status(200).json({
    resetToken,
  });
  // console.log("heikc");
  // next();
  //   // // 3.send it to user's email
  //   // const resetURL = `${req.protocol}://${req.get(
  //   //   "host"
  //   // )}/api/v1/users/resetPassword/${resetToken}`;

  //   // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  //   // try {
  //   //   await sendEmail({
  //   //     email: user.email,
  //   //     subject: "Your password reset token (valid for 10 min)",
  //   //     message,
  //   //   });

  //   res.status(200).json({
  //     status: "success",
  //     message: "token sent to email!",
  //   });
  // } catch (err) {
  //   user.passwordResetToken = undefined;
  //   user.passwordResetExpires = undefined;
  //   await user.save({ validateBeforeSave: false });

  //   return next(
  //     new AppError("There was an error sending the email. Try again later!"),
  //     500
  //   );
  // }
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // console.log('done!!');

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await userModel.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;

  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
