import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createEducation(
    userId: number,
    institution: string,
    degree: string,
    startDate: Date,
    endDate?: Date
  ) {
    try {
      const education = await prisma.education.create({
        data: {
          userId,
          institution,
          degree,
          startDate,
          endDate: endDate || undefined
        }
      });
      return education;
    } catch (error) {
      throw new Error('Erro ao criar formação educacional');
    }
  }
  