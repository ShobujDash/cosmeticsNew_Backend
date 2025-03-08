import prisma from "../config/db.js";


// ✅ Get all brands
export const getAllBrands = async (req, res) => {
  try {
    const brands = await prisma.brand.findMany();

    res.status(200).json({
      status: "success",
      results: brands.length,
      data: brands,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch brands.",
      error: error.message,
    });
  }
};

// ✅ Create a new brand
export const createBrand = async (req, res) => {
  try {
    const { brandName} = req.body;

    // Validate required fields
    if (!brandName) {
      return res.status(400).json({
        status: "error",
        message: "Brand name is required.",
      });
    }

    // Get the uploaded file path
    const brandImage = req.file ? req.file.filename : null;

    // Create the brand
    const newBrand = await prisma.brand.create({
      data: {
        brandName,
        brandImage, // Store the full path (e.g., "uploads/brand-1740748850960.jpg")
      },
    });

    res.status(201).json({
      status: "success",
      message: "Brand created successfully.",
      data: newBrand,
    });
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create brand.",
      error: error.message,
    });
  }
};

// ✅ Update a brand
export const updateBrand = async (req, res) => {
  try {
    const brandId = Number(req.params.id);
    if (isNaN(brandId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid brand ID.",
      });
    }

    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      message: "Brand updated successfully.",
      data: updatedBrand,
    });
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update brand.",
      error: error.message,
    });
  }
};

// ✅ Delete a brand
export const deleteBrand = async (req, res) => {
  try {
    const brandId = Number(req.params.id);
    if (isNaN(brandId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid brand ID.",
      });
    }

    await prisma.brand.delete({
      where: { id: brandId },
    });

    res.status(204).json({
      status: "success",
      message: "Brand deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete brand.",
      error: error.message,
    });
  }
};
