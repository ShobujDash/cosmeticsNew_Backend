import prisma from "../config/db.js";

// ✅ Get all colors
export const getAllColors = async (req, res) => {
  try {
    const colors = await prisma.color.findMany();

    res.status(200).json({
      status: "success",
      results: colors.length,
      data: colors,
    });
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch colors.",
      error: error.message,
    });
  }
};

// ✅ Create a new color
export const createColor = async (req, res) => {
  try {
    const { colorName, hexCode, status = "active" } = req.body;

    // Validate required fields
    if (!colorName || !hexCode) {
      return res.status(400).json({
        status: "error",
        message: "Color name and hex code are required.",
      });
    }

    const newColor = await prisma.color.create({
      data: {
        colorName,
        hexCode,
        status,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Color created successfully.",
      data: newColor,
    });
  } catch (error) {
    console.error("Error creating color:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create color.",
      error: error.message,
    });
  }
};

// ✅ Update a color
export const updateColor = async (req, res) => {
  try {
    const colorId = Number(req.params.id);
    if (isNaN(colorId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid color ID.",
      });
    }

    const updatedColor = await prisma.color.update({
      where: { id: colorId },
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      message: "Color updated successfully.",
      data: updatedColor,
    });
  } catch (error) {
    console.error("Error updating color:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update color.",
      error: error.message,
    });
  }
};

// ✅ Delete a color
export const deleteColor = async (req, res) => {
  try {
    const colorId = Number(req.params.id);
    if (isNaN(colorId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid color ID.",
      });
    }

    await prisma.color.delete({
      where: { id: colorId },
    });

    res.status(204).json({
      status: "success",
      message: "Color deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting color:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete color.",
      error: error.message,
    });
  }
};
