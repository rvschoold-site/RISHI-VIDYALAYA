import { Request, Response } from 'express';

export const handleImageUpload = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.',
      });
    }

    // With memory storage, file buffer is in req.file.buffer
    // This legacy endpoint is kept for backward compatibility
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully.',
      fileName: req.file.originalname,
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
