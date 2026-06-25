import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import fs from "fs";

const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

let storage;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder: "lms",
      resource_type: file.mimetype.startsWith("video/") ? "video" : "raw",
      public_id: file.originalname.split(".")[0] + "-" + Date.now(),
    }),
  });
  console.log("Cloudinary Storage configured successfully.");
} else {
  console.log("Cloudinary credentials missing in .env. Falling back to local disk storage.");
  
  const uploadDir = "./uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
      cb(null, `${Date.now()}-${cleanName}`);
    }
  });
}

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max limit
});

export { cloudinary };
