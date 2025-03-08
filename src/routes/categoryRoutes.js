import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", upload.single("image"), createCategory); 
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
