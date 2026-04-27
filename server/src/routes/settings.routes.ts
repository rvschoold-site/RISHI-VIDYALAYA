import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller';
import { verifyJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', verifyJWT, getSettings);
router.patch('/', verifyJWT, authorizeRoles('SUPER_ADMIN'), updateSettings);

export default router;
