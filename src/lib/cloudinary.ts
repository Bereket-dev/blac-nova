import { v2 as cloudinary } from "cloudinary";

export function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

export function createUploadSignature(params: {
  folder?: string;
  timestamp?: number;
}) {
  const cloud = configureCloudinary();
  const timestamp = params.timestamp ?? Math.floor(Date.now() / 1000);
  const folder =
    params.folder ?? process.env.CLOUDINARY_UPLOAD_FOLDER ?? "blac-nova/projects";

  const signature = cloud.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {
    timestamp,
    folder,
    signature,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
  };
}
