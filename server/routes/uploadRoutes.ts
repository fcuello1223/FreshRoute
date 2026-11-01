import express, { Request, Response } from "express";
import multer from "multer";

import cloudinary from "../config/cloudinary.js";

import auth from "../middlewares/auth.js";

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

uploadRouter.post(
  "/",
  auth,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "freshroute",
        resource_type: "auto",
      });
      res.json({ url: result.secure_url });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default uploadRouter;
