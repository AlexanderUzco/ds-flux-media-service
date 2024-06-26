import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'DEV';

const DB_URI = (process.env.DB_URI as string) || undefined;

const JWT_SECRET = (process.env.JWT_SECRET as string) || undefined;

const SALT_ROUNDS_PASSWORD =
  (process.env.SALT_ROUNDS_PASSWORD &&
    parseInt(process.env.SALT_ROUNDS_PASSWORD)) ||
  10;

const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
const EMAIL_USER = process.env.EMAIL_USER || '';

export {
  PORT,
  ENV,
  DB_URI,
  JWT_SECRET,
  SALT_ROUNDS_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_PASSWORD,
  EMAIL_USER,
};
