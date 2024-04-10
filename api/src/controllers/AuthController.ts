import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
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
      res.status(500).json({ message: 'Error logging in user' });
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
