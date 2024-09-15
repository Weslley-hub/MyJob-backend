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
      const user = await prisma.user.findMany();
      
      return user;
    } catch (error) {
      throw new Error('Erro ao buscar Usuarios');
    }
  }