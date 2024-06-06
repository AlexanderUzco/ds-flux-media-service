import express from 'express';
import cors from 'cors';
import connectDB from './config/mongo';
import { router } from './routes/index';
import { PORT } from './enviroments/app.enviroment';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middleware';
import { User, UserBasicInfo } from './interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();

// Middlewares
app.use(errorHandler);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
