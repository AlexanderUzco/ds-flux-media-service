import express from 'express';
import cors from 'cors';
import connectDB from './config/mongo';
import { router } from './routes/index';
import { PORT } from './enviroments/app.enviroment';

const app = express();

// Middlewares
app.use(cors());
app.use(router);

// Body parser
app.use(express.json());

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
