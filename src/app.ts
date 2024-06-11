import express from 'express';
import cors from 'cors';
import connectDB from './config/mongo';
import { router } from './routes/index';
import { ENV, PORT } from './enviroments/app.enviroment';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middleware';
import { User, UserBasicInfo } from './interfaces/user.interface';
import { CORS_ALLOWED_ORIGINS } from './dictionaries';

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || CORS_ALLOWED_ORIGINS[ENV].includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();

// Middlewares:
app.use(errorHandler);
app.use(express.json());
// allow any request from any origin
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(router);

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
