import express from "express";
import {
  getAllSubCategories,
  createSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();
router.get("/", getAllSubCategories);
router.get("/:id", getSubCategoryById);
router.post("/", createSubCategory);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);

export default router;
