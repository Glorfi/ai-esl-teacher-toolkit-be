import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';

const loggerDb =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_LOGS_LINK
    : 'mongodb://127.0.0.1:27017/logs';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    format.json()
  ),
  transports: [
    new transports.MongoDB({
      level: 'info',
      db: loggerDb ? loggerDb : '', //'mongodb://localhost:27017/logs', // Replace with your MongoDB URI
      options: { useUnifiedTopology: true },
      collection: 'api_logs',
      expireAfterSeconds: 2592000,
    }).on('error', (err) => {
      console.error('Error connecting to MongoDB transport:');
    }),
  ],
});