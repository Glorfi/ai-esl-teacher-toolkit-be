import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL, // Your email address
    pass: process.env.SENDER_PASSWORD, // Your Gmail password or an app-specific password
  },
  secure: false,
  tls: {
    // Do not fail on invalid certificates
    rejectUnauthorized: false,
  },
});
