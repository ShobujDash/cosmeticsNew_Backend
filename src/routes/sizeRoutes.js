import express from "express";
import {
  getAllSizes,
  createSize,
  updateSize,
  deleteSize,
} from "../controllers/sizeController.js";

const router = express.Router();

router.get("/", getAllSizes);
router.post("/", createSize);
router.put("/:id", updateSize);
router.delete("/:id", deleteSize);

export default router;
