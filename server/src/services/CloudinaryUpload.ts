import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";
import environment from "../environment";

cloudinary.config({
  cloud_name: environment.CLOUDINARY_CLOUD_NAME,
  api_key: environment.CLOUDINARY_API_KEY,
  api_secret: environment.CLOUDINARY_API_SECRET,
});

class CloudinaryService {
  static async uploadImage(
    fileBuffer: Buffer,
    fileName: string
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "avatars", // create folder
            public_id: fileName, // file name WITHOUT extension
            format: "jpg", // final format
            width: 512, // resize width
            height: 512, // resize height
            crop: "fill", // crop mode
            quality: "auto", // smart compression
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        )
        .end(fileBuffer);
    });
  }

  static async uploadPdf(
    fileBuffer: Buffer,
    fileName: string
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "documents",
            public_id: fileName,
            format: "pdf",
            access_mode: "authenticated",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        )
        .end(fileBuffer);
    });
  }

  static async deleteFile(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
  }
}

export default CloudinaryService;
