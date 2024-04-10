import { Request, Response } from 'express';
import { GameResult } from '../models/GamesResult';
import { diceRoll } from '../utils/diceRoll';

class GameController {
  async rollDice(req: Request, res: Response) {
    try {
      // Effectuer le tirage des dés
      const result = diceRoll();

      // Retourner le résultat au client
      res.status(200).json({ result });
    } catch (error) {
      // En cas d'erreur, retourner un message d'erreur au client
      res.status(500).json({ message: 'Error rolling the dice' });
    }
  }

  async getGameResult(req: Request, res: Response) {
    try {
      // Récupérer les résultats du jeu depuis la base de données
      const gameResults = await GameResult.find();

      // Retourner les résultats au client
      res.status(200).json({ gameResults });
    } catch (error) {
      // En cas d'erreur, retourner un message d'erreur au client
      res.status(500).json({ message: 'Error fetching game result' });
    }
  }

  async playGame(req: Request, res: Response) {
    try {
      // Implémenter la logique pour jouer au jeu et enregistrer les résultats dans la base de données
      const result = diceRoll();
      const gameResult = new GameResult({ result });
      await gameResult.save();

      // Retourner le résultat au client
      res.status(200).json({ gameResult });
    } catch (error) {
      // En cas d'erreur, retourner un message d'erreur au client
      res.status(500).json({ message: 'Error playing the game' });
    }
  }
}

export default GameController;
