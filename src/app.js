import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import sizeRoutes from "./routes/sizeRoutes.js";
import colorRoutes from "./routes/colorRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(cors());
app.use(
  cors({
    origin: "*", // Allows requests from any origin
    credentials: true, // Allows cookies
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/uploads", express.static("src/uploads")); 

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/cart", cartRoutes);

app.use(errorHandler);

export default app;
