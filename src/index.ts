import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { setupSwaggerDocs } from './swagger.config';
import { weatherRoute } from './routes/weather.route';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/', weatherRoute());

app.get('/api/status', (req, res) => {
  return res.json({ status: 'Up and running!' });
});

app.get('/', (req, res) => {
  return res.json({ message: 'Hello from Weather Info Server app!' });
});

setupSwaggerDocs(app);

app.listen(PORT, async () => {
  console.log(`Server started on URL ${HOST}:${PORT} 🎉`);
});

export default app;

