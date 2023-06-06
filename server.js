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

// Serve static files from the 'public' directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

// Route handler for the root path ("/")
app.get('/', (req, res) => {
  res.send('Hello, world! This is the root path.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
