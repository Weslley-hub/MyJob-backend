import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCategories() {
  try {
    const categories = await prisma.categoria.findMany();
    return categories;
  } catch (error) {
    throw new Error('Erro ao buscar categorias');
  }
}