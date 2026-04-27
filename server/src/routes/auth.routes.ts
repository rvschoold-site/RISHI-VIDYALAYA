import { Router } from 'express';
import { login, setupSuperAdmin, forgotPassword, resetPassword, getMe } from '../controllers/auth.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/setup', setupSuperAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/me', verifyJWT, getMe);

export default router;
