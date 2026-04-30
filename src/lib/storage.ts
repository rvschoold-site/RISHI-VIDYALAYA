import { v2 as cloudinary } from 'cloudinary';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// AWS S3 Config
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export interface StorageResult {
  storage: 'cloudinary' | 's3';
  url: string;
  publicId?: string;
  key?: string;
}

export async function uploadFile(file: File): Promise<StorageResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const mimeType = file.type;
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

  // Routing Logic: Images to Cloudinary, Others (PDFs) to S3
  const isImage = mimeType.startsWith('image/');
  const isPdf = mimeType === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    // S3 Upload for PDFs
    const bucketName = process.env.AWS_S3_BUCKET;
    const key = `documents/${fileName}`;
    
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
          // No ACL specified - keeps bucket private by default
        })
      );

      const region = process.env.AWS_REGION || 'ap-southeast-2';
      const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

      return {
        storage: 's3',
        url,
        key,
      };
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new Error('Failed to upload file to S3');
    }
  }

  // Cloudinary Upload for Images and everything else
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

/**
 * Generates a temporary access URL for the file.
 * For Cloudinary, returns the secure URL.
 * For S3, generates a pre-signed URL (default 1 hour expiry) for private access.
 */
export async function getAccessUrl(fileRecord: any): Promise<string> {
  if (fileRecord.storage === 's3' && fileRecord.key) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileRecord.key,
    });
    
    // Generate pre-signed URL valid for 3600 seconds (1 hour)
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }
  
  return fileRecord.url;
}

export async function deleteStoredFile(storage: 'cloudinary' | 's3', idOrKey: string) {
  if (storage === 'cloudinary') {
    await cloudinary.uploader.destroy(idOrKey);
  } else if (storage === 's3') {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: idOrKey,
      })
    );
  }
}
