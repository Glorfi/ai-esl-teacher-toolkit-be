import express from 'express';
import { router } from '../src/routes/index.js';
import { errors } from 'celebrate';
import cors from 'cors';
import { transporter } from './nodemailer/transporter.js';

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('The server is up and running!');
});
app.use('/api', router); // тут позже добавить env
app.use(errors());
app.use((err: any, req: any, res: any, next: any) => {
  if (err.statusCode) {
    res
      .status(err.statusCode)
      .json({ message: err.message, code: err.statusCode });
  } else {
    res.status(500).json(err);
  }
  next(err);
});
app.listen({ port: 5050 }, () => {
  console.log(`Server is running at http://localhost:5050`);
});
transporter
  .verify()
  .then(() => console.log('Connected to Google SMTP'))
  .catch((err) => console.log(err));

let mailOptions = {
  from: 'no-reply@eslteachertoolkit.com', // Sender address
  to: 'mrglorf@gmail.com', // List of recipients
  subject: 'Test Email', // Subject line
  html: `'Hello from Node.js! This is node!'`, // Plain text body
};
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//       return console.log(error);
//   }
//   console.log('Message sent: %s', info.accepted);
// });

export default app;
