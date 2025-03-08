import express from "express";
import {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.get("/", getAllBrands);
router.post("/", upload.single("image"),createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;
