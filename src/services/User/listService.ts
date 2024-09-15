import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function getUserById(id) {
//   try {
//     const user = await prisma.user.findUnique(id);
//     return user;
//   } catch (error) {
//     throw new Error('Erro ao buscar Usuario');
//   }
// }

export async function getUsersAll() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        description: true,
        categoria: {
          select: {
            id: true,
            nome: true,
          },
        },
        professionalExperiences: {
          select: {
            id: true,
            company: true,
            role: true,
            startDate: true,
            endDate: true,
          },
        },
        educations: {
          select: {
            id: true,
            institution: true,
            degree: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    throw new Error('Erro ao buscar usuários com categorias, experiências e educação');
  }
}
