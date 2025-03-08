import app from "./app.js";
import prisma from "./config/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // await prisma.$connect();
  console.log("Database connected");
});
