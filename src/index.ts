import express, { json } from 'express';
import { createUser } from './controllers/User/userController';

const app = express();
const port = 3000;

app.use(json());

app.post('/register', createUser);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
