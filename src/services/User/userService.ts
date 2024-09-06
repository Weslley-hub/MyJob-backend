import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

export async function registerUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw new Error('User registration failed');
  }
}
