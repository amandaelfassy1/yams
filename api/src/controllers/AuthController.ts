import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
const crypto = require('crypto');

const generateJwtSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

console.log(generateJwtSecret());

class AuthController {
  async signup(req: Request, res: Response) {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email existe déjà' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || '', {
        expiresIn: '1h',
      });
  
      res.status(201).json({ message: 'Inscription réalisée avec succés', token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }
  

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(req.body)

    try {
      const user = await User.findOne({ email });
      console.log(user);
      
      if (!user) {
        return res.status(404).json({ message: 'User non trouvé' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
        expiresIn: '1h',
      });

      res.status(200).json({ user, token });
    } catch (error) {
      console.error('Error registering user:', error); // Afficher l'erreur dans la console
      res.status(500).json({ message: 'Error registering user', error }); // Envoyer l'erreur dans la réponse
    }
  }

  async me(req: Request, res: Response) {
    const userId = req.body.userId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user information' });
    }
  }
}

export default AuthController;
