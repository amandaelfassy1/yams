import express from 'express';
import AuthController from '../controllers/AuthController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/me', verifyToken, authController.me);

export default router;
