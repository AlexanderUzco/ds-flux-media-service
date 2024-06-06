import { connect } from 'mongoose';
import { DB_URI } from '../enviroments/app.enviroment';

const connectDB = async () => {
  try {
    if (!DB_URI) {
      console.log('\x1b[31m', 'No database URI provided', '\x1b[0m');
      return;
    }
    await connect(DB_URI);
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to database');
    console.log(error);
  }
};
export default connectDB;
