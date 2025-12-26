import multer from "multer";
import path from "path";
import express from "express";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), "frontend", "public", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const isMatch = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (isMatch) cb(null, true);
  else cb(new Error("Only image file allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded Successfully",
    file: `/images/${req.file.filename}`,
  });
});

export default router;
