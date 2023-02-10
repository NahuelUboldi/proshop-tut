import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHAndler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHAndler);

const PORT = process.env.PORT || 5000;
app.listen(
  5000,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
