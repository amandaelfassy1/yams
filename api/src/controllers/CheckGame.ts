import Pastry from '../models/Pastries';
import { Request, Response } from 'express';

export const CheckGame = async (req: Request, res: Response) => {
    try {
      const pastryStockZero = await Pastry.find({ stock: { $gt: 0 } }).countDocuments() === 0;
      if (pastryStockZero) {
        return res.status(200).json({ message: 'Toutes les pâtisseries sont épuisées. Le jeu est terminé.' });
      } else {
        return res.status(200).json({ message: 'Le jeu peut continuer.' });
      }
    } catch (error) {
      console.error('Error checking game:', error);
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de la vérification du jeu.' });
    }
  };
  