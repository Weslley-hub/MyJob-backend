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
        categoria: {
          select: {
            nome: true,
          },
        },
        professionalExperiences: {
          select: {
            company: true,
            role: true,
          },
        },
        educations: {
          select: {
            institution: true,
            degree: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    throw new Error('Erro ao buscar usuários');
  }
}