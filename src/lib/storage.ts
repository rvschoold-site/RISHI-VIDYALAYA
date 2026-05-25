import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// AWS S3 Config
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.AWS_S3_BUCKET || 'rishividalaya';

export interface StorageResult {
  storage: 's3';
  url: string;
  key: string;
}

/**
 * Upload a file to AWS S3.
 * Images go to `gallery/` prefix, PDFs/docs go to `documents/` prefix.
 */
export async function uploadFile(file: File): Promise<StorageResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const mimeType = file.type;
  const sanitizedName = file.name.replace(/\s+/g, '_');
  const fileName = `${Date.now()}-${sanitizedName}`;

  const isImage = mimeType.startsWith('image/');
  const prefix = isImage ? 'gallery' : 'documents';
  const key = `${prefix}/${fileName}`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      })
    );

    const region = process.env.AWS_REGION || 'ap-southeast-2';
    const url = `https://${BUCKET}.s3.${region}.amazonaws.com/${key}`;

    return { storage: 's3', url, key };
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Failed to upload file to S3');
  }
}

/**
 * Generates a temporary access URL for the file.
 * For S3, generates a pre-signed URL (default 1 hour expiry) for private access.
 * For public gallery images, the direct URL is returned.
 */
export async function getAccessUrl(fileRecord: any): Promise<string> {
  if (fileRecord.storage === 's3' && fileRecord.key) {
    // For documents (PDFs), generate a pre-signed URL
    if (!fileRecord.key.startsWith('gallery/')) {
      const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: fileRecord.key,
      });
      return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    }
  }
  // For gallery images (public) or any other, return the direct URL
  return fileRecord.url;
}

/**
 * Delete a file from S3 by its key.
 */
export async function deleteStoredFile(storage: 's3', key: string) {
  if (storage === 's3' && key) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
  }
}
