import cloudinary from "./config";
import { UploadApiResponse } from "cloudinary";

interface UploadOptions {
  folder: string;
  resourceType?: "image" | "video" | "auto";
}

export const uploadToCloud = async (
  file: File,
  options: UploadOptions,
): Promise<UploadApiResponse> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: options.folder,
          resource_type: options.resourceType ?? "auto",
        },
        (error, result) => {
          if (error) return reject(error);

          if (!result) {
            return reject(new Error("Cloudinary upload failed"));
          }

          resolve(result);
        },
      )
      .end(buffer);
  });
};
