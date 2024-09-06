import express, { json } from 'express';
import cors from 'cors';
import { createUser } from './controllers/User/userController';

const app = express();
const port = 3000;

app.use(cors());

app.use(json());

app.post('/register', createUser);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

