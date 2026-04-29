import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface StorageResult {
  storage: 'cloudinary';
  url: string;
  publicId?: string;
}

export async function uploadFile(file: File): Promise<StorageResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const mimeType = file.type;
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

  // Routing Logic
  const isImage = mimeType.startsWith('image/');

  // Cloudinary Upload
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: isImage ? 'app/images/' : 'app/docs/',
        resource_type: isImage ? 'image' : 'raw',
        public_id: fileName,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          storage: 'cloudinary',
          url: result!.secure_url,
          publicId: result!.public_id,
        });
      }
    );
    uploadStream.end(buffer);
  });
}

export async function getAccessUrl(fileRecord: any): Promise<string> {
  return fileRecord.url;
}

export async function deleteStoredFile(storage: 'cloudinary', idOrKey: string) {
  if (storage === 'cloudinary') {
    await cloudinary.uploader.destroy(idOrKey);
  }
}

