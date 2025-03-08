import prisma from "../config/db.js";

// ✅ Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { subCategories: true },
    });

    res.status(200).json({
      status: "success",
      results: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch categories.",
      error: error.message,
    });
  }
};

// ✅ Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid category ID.",
      });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { subCategories: true },
    });

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve category.",
      error: error.message,
    });
  }
};

// ✅ Create a category
export const createCategory = async (req, res) => {
  try {
    const { categoryName, status = "active" } = req.body;

    // Validate required fields
    if (!categoryName) {
      return res.status(400).json({
        status: "error",
        message: "Category name is required.",
      });
    }

    // Get the uploaded file path
    const image = req.file ? req.file.filename : null;

    // Create the category
    const newCategory = await prisma.category.create({
      data: {
        categoryName,
        image, // Store the full path (e.g., "uploads/image-1740748850960.jpg")
        status,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create category.",
      error: error.message,
    });
  }
};

// ✅ Update a category
export const updateCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid category ID.",
      });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update category.",
      error: error.message,
    });
  }
};

// ✅ Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid category ID.",
      });
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    res.status(204).json({
      status: "success",
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete category.",
      error: error.message,
    });
  }
};
