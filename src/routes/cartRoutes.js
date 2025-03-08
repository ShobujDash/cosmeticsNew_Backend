// routes/cartRoutes.js
import express from "express";

import { checkCartKey } from "../middlewares/authMiddleware.js";
import { createCart, getCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/create", checkCartKey, createCart);
router.get("/get", checkCartKey, getCart);

export default router;
