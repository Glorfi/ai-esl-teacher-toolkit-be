import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userSchema from './models/userSchema.js';
import exerciseSchema from './models/exerciseSchema.js';
import sentenceSchema from './models/sentenceSchema.js';

dotenv.config()

mongoose
  .connect(process.env.MONGO_LINK || "", {})
  .then(() => {
    console.log('DataBase is Connected');
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
db.on('error', () => {
  console.error('Failed to connect to DB');
});

const Users = mongoose.model('users', userSchema);
const Exercises = mongoose.model('exercises', exerciseSchema);
const Sentences = mongoose.model('sentences', sentenceSchema);

export { Users, Exercises, Sentences };
