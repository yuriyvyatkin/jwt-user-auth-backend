import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors';

dotenv.config();

// connect to database
connectDB();

const app = express();

app.use(cors());

// Body parser
app.use(express.json());

// API routes
app.use('/api/user', userRoutes);

// Check server health
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Serve favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'favicon.ico'));
});

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`,
  ),
);
