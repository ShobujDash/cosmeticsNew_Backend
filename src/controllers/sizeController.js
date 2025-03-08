import prisma from "../config/db.js";

export const getAllSizes = async (req, res) => {
  try {
    const sizes = await prisma.size.findMany();
    res.status(200).json({
      success: true,
      results: sizes.length,
      data: sizes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sizes",
      error: error.message,
    });
  }
};

export const createSize = async (req, res) => {
  try {
    const newSize = await prisma.size.create({ data: req.body });
    res.status(201).json({
      success: true,
      message: "Size created successfully",
      data: newSize,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create size",
      error: error.message,
    });
  }
};

export const updateSize = async (req, res) => {
  try {
    const updatedSize = await prisma.size.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json({
      success: true,
      message: "Size updated successfully",
      data: updatedSize,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Size not found or update failed",
      error: error.message,
    });
  }
};

export const deleteSize = async (req, res) => {
  try {
    await prisma.size.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({
      success: true,
      message: "Size deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Size not found or deletion failed",
      error: error.message,
    });
  }
};
