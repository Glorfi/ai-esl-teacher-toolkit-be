import { transporter } from './transporter.js';

export function sendAlarmEmail() {
  transporter.sendMail(
    {
      to: process.env.SERVERHOST_EMAIL,
      subject: 'ALARM! SERVER WENT DOWN!',
      text: 'Get to https://vercel.com/ to pick me up!',
    },
    (error, info) => {
      if (error) {
        console.log('GameOver The server is down');
      } else {
        console.log('Alarm email has been sent');
        // res.status(201).send({ message: 'Email has been sent' });
      }
    }
  );
}
