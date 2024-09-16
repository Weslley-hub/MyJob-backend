import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getEducations(userId: number) {
    try {
      const educations = await prisma.education.findMany({
        where: { userId }
      });
      return educations;
    } catch (error) {
      throw new Error('Erro ao buscar formações educacionais');
    }
}