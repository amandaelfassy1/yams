import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import gameRoutes from './src/routes/gamesRoutes';

import cors from 'cors';
import crypto from 'crypto';

// Générer une clé aléatoire de 64 octets (512 bits)
export const generateJwtSecret = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Working');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

mongoose.connect('mongodb://mongo/yummy_yams')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
