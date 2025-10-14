import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import { Readable } from "stream";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async (localPath) => {
    try {
    if (!localPath) throw new Error("No localPath provided");

    // Case 1: localPath is a local path string
    if (typeof localPath === "string") {
      return await cloudinary.uploader.upload(localPath, { resource_type: "auto" });
    }

    // Case 2: localPath is a buffer (memoryStorage)
    if (localPath.buffer) {
      const bufferStream = Readable.from(localPath.buffer);

      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferStream.pipe(stream);
      });
    }

    throw new Error("Invalid localPath type");

  } catch (err) {
    console.error("Cloudinary upload failed:", err.message);
    throw err;
  }
}