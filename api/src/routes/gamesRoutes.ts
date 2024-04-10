import express from 'express';
import GameController from '../controllers/GameController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();
const gameController = new GameController();

router.post('/roll-dice', verifyToken, gameController.rollDice);
router.get('/result', verifyToken, gameController.getGameResult);

export default router;
