import { Request, Response } from 'express';
import User from '../models/User';

export const getAllWinners = async (req: Request, res: Response) => {
  try {
    const winners = await User.find({ 'wins.0': { $exists: true } }); // Récupérer les utilisateurs qui ont des victoires

    res.status(200).json(winners); // Renvoyer la liste des gagnants
  } catch (error) {
    console.error('Erreur lors de la récupération des gagnants :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des gagnants' });
  }
};
