import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const DB_URI = (process.env.DB_URI as string) || undefined;

export { PORT, DB_URI };
