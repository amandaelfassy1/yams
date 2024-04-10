import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

export default router;
