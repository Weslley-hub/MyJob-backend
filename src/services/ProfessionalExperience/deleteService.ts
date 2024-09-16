import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteProfessionalExperience(id: number) {
    try {
      const experience = await prisma.professionalExperience.delete({
        where: { id },
      });
      return experience;
    } catch (error) {
      throw new Error('Erro ao deletar experiência profissional');
    }
}