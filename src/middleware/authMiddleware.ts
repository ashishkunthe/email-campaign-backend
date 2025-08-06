import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestUpdated extends Request {
  userId: string;
}

export async function authMiddleware(
  req: RequestUpdated,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token found! try to login",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    if (!decode) {
      return res.json({
        message: "Invalid credentials",
      });
    }

    req.userId = decode.userId as string;
    next();
  } catch (error) {
    console.log("Error in decoding the token");
    res.status(500).json({
      message: "Error in decoding the token",
    });
  }
}
