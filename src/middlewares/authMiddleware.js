// middlewares/authMiddleware.js
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRATE_KEY;

export const checkCartKey = (req, res, next) => {
  if (!req.cookies.cart_key) {
    const cartKey = uuidv4();
    const token = jwt.sign({ cartKey }, SECRET_KEY, { expiresIn: "7d" });

    const options = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true, // Will work over HTTPS
      sameSite: "None", // Allows cross-site cookies
    };
    res.cookie("cart_key", token, options);
    req.cartKey = cartKey;
  } else {
    try {
      const decoded = jwt.verify(req.cookies.cart_key, SECRET_KEY);
      req.cartKey = decoded.cartKey;
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired cart token" });
    }
  }
  next();
};
