import prisma from "../config/db.js";

export const createCart = async (req, res) => {
  try {
    const products  = req.body;
    const cartKey = req.cartKey;

    const cart = await prisma.cart.create({
      data: { cartKey, products },
    });

    return res
      .status(201)
      .json({ success: true, message: "Cart created", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const cartKey = req.cartKey;

    const cart = await prisma.cart.findMany({
      where: { cartKey },
      orderBy: { createdAt: "desc" },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
