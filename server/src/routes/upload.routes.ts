import { Router } from 'express';
import { handleImageUpload } from '../controllers/upload.controller';
import { upload } from '../services/cloudinary.service';

const router = Router();

// 'image' is the field name in the multipart form
router.post('/', upload.single('image'), handleImageUpload);

export default router;
