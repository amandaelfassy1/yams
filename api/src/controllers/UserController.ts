import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
  async signup(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
        expiresIn: '1h',
      });

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: 'Error signing up user' });
    }
  }

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
}

export default UserController;
