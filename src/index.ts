import express, { json } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';
import routes from './routes';

const app = express();
const port = 3000;

app.use(cors());

app.use(json());

app.use('/api', routes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

