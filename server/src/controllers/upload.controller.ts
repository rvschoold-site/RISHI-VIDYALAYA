import { Request, Response } from 'express';

export const handleImageUpload = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.',
      });
    }

    // req.file.path will contain the Cloudinary URL because of multer-storage-cloudinary
    const imageUrl = req.file.path;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully to Cloudinary.',
      url: imageUrl,
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image.',
      error: error.message,
    });
  }
};
