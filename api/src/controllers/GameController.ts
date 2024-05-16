import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Pastry from '../models/Pastries';

// genere une liste de 5 valeurs aléatoires entre 1 et 6 simulant le lancer de dés
function rollDice(): number[] {
  // const dice = [5,5,5,5,5];
  const dice = [];
  for (let i = 0; i < 5; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1); 
  }
  return dice;
}

//prend en entrée un user et les dés lancés puis verifie s'il y a une combinaison gagnante
//Si une combinaison gagnante est détectée, des pâtisseries sont attribuées à l'utilisateur en utilisant la fonction attribuatePastries.
async function checkWinningCombination(user:IUser, dice: number[]): Promise<{}|any> {
  let data;
  if (detectFull(dice)) {
    data = await attribuatePastries(user, 'YAMS', 3)
  } else if (detectForOfFive(dice)) {
    data = await attribuatePastries(user, 'CARRE', 2)
  } else if (detectTwoPairs(dice)) {
    data = await attribuatePastries(user, 'DOUBLE', 1)
  }else{
    user.nb_game++
    await user.save()
  }
  return data;
}
//Endpoint playGame : C'est la fonction principale de l'API pour jouer au jeu. 
//Elle prend en compte les requêtes HTTP entrantes, vérifie les conditions d'erreur, génère les dés, 
//vérifie les combinaisons gagnantes et attribue les pâtisseries en conséquence.
//Elle renvoie également les messages appropriés et les données associées.
export const playGame = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur introuvable' });
  }
  if (user.nb_game > 2) {
    return res.status(200).json({ message: 'Trop de tentatives' });
  }
  
  const pastryStockZero = await Pastry.find({ stock: { $gt: 0 } }).countDocuments() === 0;
  if (pastryStockZero) {
    return res.status(200).json({ message: 'Toutes les pâtisseries sont épuisées. Le jeu est terminé.' });
  }
  
  if (user.wins.length>0) {
    return res.status(200).json({ message: 'L\'utilisateur a deja gagné' });
  }
  const dice = rollDice();
  const data = await checkWinningCombination(user,dice);
  if(!data){
    res.status(200).json({message:"Relancer", dice})
  }else{
    res.status(200).json({message:`Félicitations ${user.username}`, data, dice, user });
  }
  
};
// Cette fonction attribue les pâtisseries gagnantes à l'utilisateur, met à jour les stocks de pâtisseries disponibles et enregistre les informations dans la base de données.
async function attribuatePastries(user: any, type:string, quantity:number): Promise<{}> {
  try {
    const pastries = await Pastry.aggregate([{$match:{stock:{$gt:0}}},{ $sample: { size: quantity } }]); 

    for (const pastry of pastries) {
      user.wins.push({
        name: pastry.name,
        image: pastry.image,
        date: new Date(),
      });

      await Pastry.findByIdAndUpdate(pastry._id, { $inc: { stock: -1, quantityWon:1 } }); 
    }

    user.nb_game++; 
    await user.save();
    const data = {
      id:user._id,
      email:user.email,
      username: user.username,
      wins:user.wins,
      type:type
    }
    return data
  } catch (error) {
    console.error('Erreur lors de l\'attribution des pâtisseries:', error);
    throw new Error('Erreur lors de l\'attribution des pâtisseries');
  }
}

//Fonctions de détection de combinaisons : Ces fonctions auxiliaires sont utilisées pour détecter les combinaisons gagnantes dans les dés lancés.
const detectFull = (dice: number[]): boolean => {
  return dice.every((val: number) => val === dice[0]);
}

const detectForOfFive = (dice: number[]): boolean => {
  const identicalValues = dice.filter((val) => val === dice[0]);
  return identicalValues.length === 4;
}

const detectTwoPairs = (dice: number[]): boolean => {
  const occurrences: { [key: number]: number } = {};
  
  for (const die of dice) {
    occurrences[die] = (occurrences[die] || 0) + 1;
  }
  
  let pairCount = 0;
  for (const die in occurrences) {
    if (occurrences[die] >= 2) {
      pairCount++;
    }
  }
  
  return pairCount >= 2;
}
