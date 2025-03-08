import prisma from "../config/db.js";

// ✅ Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ status: "error", error: "Failed to fetch orders" });
  }
};

// ✅ Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res
        .status(404)
        .json({ status: "error", error: "Order not found" });
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ status: "error", error: "Failed to fetch order" });
  }
};

// ✅ Create order
export const createOrder = async (req, res) => {
  try {
    const { invoice, date, userName, userEmail, phone, amount, productID } =
      req.body;

    // Validate required fields
    if (!invoice || !phone || !amount || !productID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the order
    const newOrder = await prisma.order.create({
      data: {
        invoice,
        date: new Date(date), // Convert date string to Date object
        userName,
        userEmail,
        phone,
        amount: parseFloat(amount), // Ensure amount is a float
        productID,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// ✅ Update order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { productID, invoice, date, userName, userEmail, phone, amount } =
      req.body;

    // Check if the order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return res
        .status(404)
        .json({ status: "error", error: "Order not found" });
    }

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        productID,
        invoice,
        date: date ? new Date(date) : null,
        userName,
        userEmail,
        phone,
        amount: amount ? parseFloat(amount) : undefined,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ status: "error", error: "Failed to update order" });
  }
};
// ✅ Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return res
        .status(404)
        .json({ status: "error", error: "Order not found" });
    }

    // Delete the order
    await prisma.order.delete({
      where: { id },
    });

    res.status(204).json({
      status: "success",
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ status: "error", error: "Failed to delete order" });
  }
};
