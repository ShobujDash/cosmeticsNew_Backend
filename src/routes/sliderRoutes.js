import express from "express";
import {
  createSlider,
  getSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
} from "../controllers/sliderController.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// ✅ Create a new slider with image upload
router.post(
  "/",
  upload.single("image"), // single image upload
  createSlider
);

// ✅ Get all sliders
router.get("/", getSliders);

// ✅ Get a single slider by ID
router.get("/:id", getSliderById);

// ✅ Update a slider by ID
router.put("/:id", updateSlider);

// ✅ Delete a slider by ID
router.delete("/:id", deleteSlider);

export default router;
