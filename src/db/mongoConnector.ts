import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userSchema from './models/userSchema.js';
import exerciseSchema from './models/exerciseSchema.js';
import sentenceSchema from './models/sentenceSchema.js';
import topicSchema from './models/topicSchema.js';

// dotenv.config();
// const currentDb =
//   process.env.NODE_ENV === 'production'
//     ? process.env.MONGO_LINK
//     : 'mongodb://127.0.0.1:27017/exsdb';

// mongoose
//   .connect(currentDb || '', {})
//   .then(() => {
//     console.log('DataBase is Connected');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
});

const Users = mongoose.model('users', userSchema);
const Exercises = mongoose.model('exercises', exerciseSchema);
const Sentences = mongoose.model('sentences', sentenceSchema);
const Topics = mongoose.model('topics', topicSchema);

export { Users, Exercises, Sentences, Topics };
