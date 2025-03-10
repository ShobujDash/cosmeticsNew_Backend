import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByCategory,
} from "../controllers/productController.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  createProduct
);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/search", searchProductsByCategory);

export default router;
