import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createProfessionalExperience(
    userId: number,
    company: string,
    role: string,
    startDate: Date,
    endDate?: Date
  ) {
    try {
      const experience = await prisma.professionalExperience.create({
        data: {
          userId,
          company,
          role,
          startDate,
          endDate: endDate || undefined
        }
      });
      return experience;
    } catch (error) {
      throw new Error('Erro ao criar experiência profissional');
    }
  }
  