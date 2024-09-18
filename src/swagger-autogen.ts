import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.ts'];

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Descrição da sua API'
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  import('../src/index'); 
});