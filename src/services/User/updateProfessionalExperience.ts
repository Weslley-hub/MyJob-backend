import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateProfessionalExperience(
    id: number,
    company: string,
    role: string,
    startDate: Date,
    endDate?: Date
  ) {
    try {
      const experience = await prisma.professionalExperience.upsert({
        where: { id },
        update: {
          company,
          role,
          startDate,
          endDate: endDate || undefined,
        },
        create: {
          userId: 0, 
          company,
          role,
          startDate,
          endDate: endDate || undefined,
        }
      });
      return experience;
    } catch (error) {
      throw new Error('Erro ao atualizar experiência profissional');
    }
  }
  