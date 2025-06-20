import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createtoken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError(400, "User Already exist");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  createToken(res, user._id);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User Created SuccessFully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    const isPasswordMatched = await bcrypt.compare(
      password,
      existedUser.password
    );

    if (isPasswordMatched) {
      createToken(res, existedUser._id);

      res
        .status(201)
        .json(new ApiResponse(201, existedUser, "User login successfully"));
      return;
    }
  }
});

const logOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });

  res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});

  res
    .status(200)
    .json(new ApiResponse(200, user, "All Users fetched successfully"));
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Current User Profile fetched successfully")
    );
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedUser, "User Profile Updated Successfully")
      );
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      throw new ApiError(400, "Cannot delete Admin");
    }

    console.log(user._id);
    const deleteUser = await User.deleteOne({ _id: user._id });

    return res
      .status(200)
      .json(new ApiResponse(200, deleteUser, "User Remove"));
  } else {
    throw new ApiError(400, "User Not Found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw new ApiError(400, "User Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Fetched Successfully"));
});

const updateUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()

    res.json({
      _id : updatedUser._id,
      username : updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  }


});

export {
  createUser,
  loginUser,
  logOut,
  getAllUsers,
  getCurrentUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserByID,
};
