import prisma from "../config/db.js";

// ✅ Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      categoryName,
      purchasePrice,
      sellingPrice,
      stock,
      description,
    } = req.body;

    // Validate required fields
    if (
      !productName ||
      !categoryName ||
      !purchasePrice ||
      !sellingPrice ||
      !stock
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Product name, category Name, purchase price, selling price, and stock are required.",
      });
    }

    // Validate image uploads
    if (!req.files || req.files.length < 1) {
      return res.status(400).json({
        status: "error",
        message: "Upload at least 1 image.",
      });
    }

    console.log(req.files)

    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        productName,
        categoryName,
        image1: req.files["image1"] ? req.files["image1"][0].filename : null,
        image2: req.files["image2"] ? req.files["image2"][0].filename : null,
        image3: req.files["image3"] ? req.files["image3"][0].filename : null,
        image4: req.files["image4"] ? req.files["image4"][0].filename : null,
        image5: req.files["image5"] ? req.files["image5"][0].filename : null,
        purchasePrice: parseFloat(purchasePrice),
        sellingPrice: parseFloat(sellingPrice),
        stock: parseInt(stock),
        description,
      },
    });

    res.status(201).json({
      status: "success",
      message:
        "Product added successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create product.",
      error: error.message,
    });
  }
};

// ✅ Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch products.",
      error: error.message,
    });
  }
};

// ✅ Get product by ID
export const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid product ID.",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true, subCategory: true },
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve product.",
      error: error.message,
    });
  }
};

// ✅ Update a product
export const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid product ID.",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update product.",
      error: error.message,
    });
  }
};

// ✅ Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid product ID.",
      });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    res.status(204).json({
      status: "success",
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete product.",
      error: error.message,
    });
  }
};


// ✅ Search products by categoryName
export const searchProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        status: "error",
        message: "Category name is required for search.",
      });
    }

    const products = await prisma.product.findMany({
      where: {
        categoryName: {
          contains: category, // Case-insensitive search
          mode: "insensitive",
        },
      },
    });

    if (products.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No products found for this category.",
      });
    }

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to search products.",
      error: error.message,
    });
  }
};
