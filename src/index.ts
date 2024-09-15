import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = 3000;

app.use(cors());

app.use(json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

