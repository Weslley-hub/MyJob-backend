import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categorias = [
    { nome: 'Engenharia' },
    { nome: 'Medicina e Saúde' },
    { nome: 'Tecnologia da Informação (TI)' },
    { nome: 'Direito e Ciências Jurídicas' },
    { nome: 'Educação' },
    { nome: 'Ciências Exatas' },
    { nome: 'Arquitetura e Design' },
    { nome: 'Ciências Humanas e Sociais' },
    { nome: 'Administração e Negócios' },
    { nome: 'Artes e Entretenimento' },
    { nome: 'Comunicação e Mídia' }
  ];

  for (const categoria of categorias) {
    await prisma.categoria.create({
      data: categoria,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
