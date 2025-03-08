import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Get all subcategories
export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.subcategory.findMany({
      include: { category: true, products: true },
    });

    res.status(200).json({
      status: "success",
      results: subCategories.length,
      data: subCategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch subcategories.",
      error: error.message,
    });
  }
};

// ✅ Get a single subcategory by ID
export const getSubCategoryById = async (req, res) => {
  try {
    const subCategoryId = parseInt(req.params.id);
    if (isNaN(subCategoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid subcategory ID.",
      });
    }

    const subCategory = await prisma.subcategory.findUnique({
      where: { id: subCategoryId },
      include: { category: true, products: true },
    });

    if (!subCategory) {
      return res.status(404).json({
        status: "error",
        message: "Subcategory not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: subCategory,
    });
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch subcategory.",
      error: error.message,
    });
  }
};

// ✅ Create a new subcategory
export const createSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryID, status = "active" } = req.body;

    // Validate required fields
    if (!subCategoryName || !categoryID) {
      return res.status(400).json({
        status: "error",
        message: "Subcategory name and category ID are required.",
      });
    }

    const newSubCategory = await prisma.subcategory.create({
      data: {
        subCategoryName,
        categoryID,
        status,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Subcategory created successfully.",
      data: newSubCategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create subcategory.",
      error: error.message,
    });
  }
};

// ✅ Update a subcategory
export const updateSubCategory = async (req, res) => {
  try {
    const subCategoryId = parseInt(req.params.id);
    if (isNaN(subCategoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid subcategory ID.",
      });
    }

    const updatedSubCategory = await prisma.subcategory.update({
      where: { id: subCategoryId },
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      message: "Subcategory updated successfully.",
      data: updatedSubCategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update subcategory.",
      error: error.message,
    });
  }
};

// ✅ Delete a subcategory
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = parseInt(req.params.id);
    if (isNaN(subCategoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid subcategory ID.",
      });
    }

    await prisma.subcategory.delete({
      where: { id: subCategoryId },
    });

    res.status(204).json({
      status: "success",
      message: "Subcategory deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete subcategory.",
      error: error.message,
    });
  }
};
