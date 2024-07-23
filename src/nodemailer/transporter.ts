import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'mail.hosting.reg.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL, // Your email address
    pass: process.env.SENDER_PASSWORD, // Your Gmail password or an app-specific password
  },
  tls: {
    // Do not fail on invalid certificates
    rejectUnauthorized: false,
  },
});

// RESERVED GMAIL TRANSPORTER
// export const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.SENDER_EMAIL, // Your email address
//     pass: process.env.SENDER_PASSWORD, // Your Gmail password or an app-specific password
//   },
//   secure: false,
//   tls: {
//     // Do not fail on invalid certificates
//     rejectUnauthorized: false,
//   },
// });
