import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || ''

export async function authenticateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      throw new Error('Usuario não existe');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      throw new Error('Senha invalida');
    }
  
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
  
    return { token };
}