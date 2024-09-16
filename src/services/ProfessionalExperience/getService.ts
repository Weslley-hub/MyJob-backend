import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProfessionalExperiences(userId: number) {
    try {
      const experiences = await prisma.professionalExperience.findMany({
        where: {
          userId,
        },
        orderBy: {
          startDate: 'desc',
        },
      });
      return experiences;
    } catch (error) {
      throw new Error('Erro ao buscar experiências profissionais');
    }
}