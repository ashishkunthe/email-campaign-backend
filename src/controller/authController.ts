import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export async function Register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(409).json({
        message: "User already exist please continue with login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      message: "User registered",
      token: token,
    });
  } catch (error) {
    console.log("Error user registration ", error);
    res.status(500).json({
      message: "Error in Registration",
    });
  }
}

export async function Login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, userExist.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { userId: userExist._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      message: "User Login successful",
      token: token,
    });
  } catch (error) {
    console.log("User Login Error", error);
    res.status(500).json({
      message: "User Login error",
    });
  }
}
