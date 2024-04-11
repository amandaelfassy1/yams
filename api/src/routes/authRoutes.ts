import express from 'express';
import AuthController from '../controllers/AuthController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();
const authController = new AuthController();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.get('/me', verifyToken, authController.me);

export default router;
