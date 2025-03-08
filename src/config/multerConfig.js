import multer from "multer";
import path from "path";

// Multer Storage কনফিগারেশন
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // uploads ফোল্ডারটি src এর ভিতরে থাকবে
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// ফাইল ফিল্টার
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid =
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype);

  if (isValid) cb(null, true);
  else cb(new Error("শুধুমাত্র JPG এবং PNG ফাইল অনুমোদিত!"));
};

const upload = multer({ storage, fileFilter });

export default upload;


// import multer from "multer";
// import path from "path";

// // Define the absolute path for the uploads directory
// const uploadsDir = path.join(process.cwd(), "src", "uploads");

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir); // Use the absolute path
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // File Filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const isValid =
//     allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
//     allowedTypes.test(file.mimetype);

//   if (isValid) cb(null, true);
//   else cb(new Error("শুধুমাত্র JPG এবং PNG ফাইল অনুমোদিত!"));
// };

// const upload = multer({ storage, fileFilter });

// export default upload;
