import prisma from "../config/db.js";

// ✅ Create a new slider
export const createSlider = async (req, res) => {
  try {
    const { title, description, text, side, exploreUrl, shopUrl } = req.body;

    // Validate required fields
    if (!title || !description || !text || !side) {
      return res.status(400).json({
        status: "error",
        message: "Title, description, text, and side are required.",
      });
    }

    // Validate image upload (note: use req.file for single file upload)
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Upload at least 1 image.",
      });
    }
    console.log(req.file);

    // Create the slider
    const newSlider = await prisma.slider.create({
      data: {
        image: req.file ? req.file.filename : null, // Get the filename from req.file
        title,
        description,
        text,
        side,
        exploreUrl,
        shopUrl,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Slider added successfully!",
      data: newSlider,
    });
  } catch (error) {
    console.error("Error creating slider:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create slider.",
      error: error.message,
    });
  }
};

// ✅ Get all sliders
export const getSliders = async (req, res) => {
  try {
    const sliders = await prisma.slider.findMany();
    res.status(200).json({
      status: "success",
      data: sliders,
    });
  } catch (error) {
    console.error("Error getting sliders:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get sliders.",
      error: error.message,
    });
  }
};

// ✅ Get a single slider by ID
export const getSliderById = async (req, res) => {
  try {
    const slider = await prisma.slider.findUnique({
      where: { id: req.params.id },
    });

    if (!slider) {
      return res.status(404).json({
        status: "error",
        message: "Slider not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: slider,
    });
  } catch (error) {
    console.error("Error getting slider by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get slider.",
      error: error.message,
    });
  }
};

// ✅ Update a slider by ID
export const updateSlider = async (req, res) => {
  try {
    const { title, description, text, side, exploreUrl, shopUrl } = req.body;

    const updatedSlider = await prisma.slider.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        text,
        side,
        exploreUrl,
        shopUrl,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Slider updated successfully!",
      data: updatedSlider,
    });
  } catch (error) {
    console.error("Error updating slider:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update slider.",
      error: error.message,
    });
  }
};

// ✅ Delete a slider by ID
export const deleteSlider = async (req, res) => {
  try {
    const deletedSlider = await prisma.slider.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "success",
      message: "Slider deleted successfully!",
      data: deletedSlider,
    });
  } catch (error) {
    console.error("Error deleting slider:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete slider.",
      error: error.message,
    });
  }
};
