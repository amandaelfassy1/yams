import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import gameRoutes from './src/routes/gamesRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Working')
})
app.listen(3001, function() {
  console.log("Server is running on port " + 3001);
});
// Routes
//app.use('/api/users', userRoutes);
//app.use('/api/auth', authRoutes);
//app.use('/api/game', gameRoutes);

// MongoDB Connection
//mongoose
//  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yummy_yams', {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//  })
//  .then(() => {
//    console.log('Connected to MongoDB');
//    app.listen(PORT, () => {
//      console.log(`Server is running on port ${PORT}`);
//    });
//  })
//  .catch((error) => console.error('Error connecting to MongoDB:', error));
