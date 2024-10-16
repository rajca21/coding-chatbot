import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));
app.use('/api/v1', router);

app.get('/api', (req, res) => {
  return res.status(200).json('Chatbot Backend Works!');
});

export default app;
