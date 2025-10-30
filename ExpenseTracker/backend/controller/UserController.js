import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import UserModel from "../schemes/UserScheme.js"; // <- aapka mongoose model
import jwt from "jsonwebtoken"
const router = express.Router();


const uploadPath = "uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });


 export const SignUpUser  =async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || !req.file) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const isExistUser = await UserModel.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({ success: false, message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      image: req.file.filename,
    });
    console.log(user)
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ------------------ LOGIN ------------------ */
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,        // send token to frontend
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const GetMyProfile = async (req, res) => {
  try {
    // `req.user` middleware se aaya hua data hota hai
    const userId = req.user.id;

    const user = await UserModel.findById(userId).select("-password"); 
    // .select("-password") matlab password send nahi karenge

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};

// backend route (optional)
export const Logout = async (req, res) => {
  // JWT me server side session nahi hota, to bas client ko instruct karo
  return res.status(200).json({
    success: true,
    message: "Logout successful. Please remove token on client side."
  });
};
