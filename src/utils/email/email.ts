import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USER } from '../../enviroments/app.enviroment';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export { transporter };
