import express, { json } from 'express';
import cors from 'cors';
import { createUser } from './controllers/User/registerController';
import { loginUser } from './controllers/User/loginController';

const app = express();
const port = 3000;

app.use(cors());

app.use(json());

app.post('/login', loginUser)
app.post('/register', createUser);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

