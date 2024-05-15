import express from 'express';
import { playGame } from '../controllers/GameController';
import { getAllWinners } from '../controllers/WinnerController';
import verifyToken from '../middleware/verifyToken'; // Import du middleware
import { CheckGame } from '../controllers/CheckGame';

const router = express.Router();
router.use('/', verifyToken)

router.get('/play', playGame);
router.get('/check', CheckGame);
router.get('/winners', getAllWinners);

export default router;
