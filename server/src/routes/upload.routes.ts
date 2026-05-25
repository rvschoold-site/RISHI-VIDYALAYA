import { Router } from 'express';
import { handleImageUpload } from '../controllers/upload.controller';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

// 'image' is the field name in the multipart form
router.post('/', upload.single('image'), handleImageUpload);

export default router;
