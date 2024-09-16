import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteEducation(id: number) {
    try {
      const education = await prisma.education.delete({
        where: { id }
      });
      return education;
    } catch (error) {
      throw new Error('Erro ao deletar formação educacional');
    }
  }