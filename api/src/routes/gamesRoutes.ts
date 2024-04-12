import express from 'express';
import { playGame } from '../controllers/GameController';
import verifyToken from '../middleware/verifyToken'; // Import du middleware

const router = express.Router();
router.use('/', verifyToken)

router.get('/play', playGame);

export default router;
