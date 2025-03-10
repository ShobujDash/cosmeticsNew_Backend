


import multer from "multer";
import path from "path";
import fs from "fs";

// Define the absolute path for the uploads directory
const uploadsDir = path.join(process.cwd(), "src", "uploads");

// Ensure the uploads directory exists, create it if not
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads directory created:", uploadsDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the absolute path
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid =
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype);

  if (isValid) cb(null, true);
  else cb(new Error("শুধুমাত্র JPG, PNG, JPEG, এবং WEBP ফাইল অনুমোদিত!"));
};

const upload = multer({ storage, fileFilter });

export default upload;
