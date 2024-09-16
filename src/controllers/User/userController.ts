import { Request, Response } from 'express';
import { authenticateUser } from "../../services/User/loginService";
import { registerUser } from '../../services/User/registerService';
import { getUsersAll } from '../../services/User/listService';

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Preencha todas as informações'
    });
  }

  try {
    const { token, user } = await authenticateUser(email, password);

    res.json({
      status: 'success',
      code: 200,
      token,
      user
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: error.message
      });
    } else {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Erro interno do servidor'
      });
    }
  }
}

export async function createUser(req: Request, res: Response) {
  const { name, email, password, categoriaId } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Verifique se preencheu todos os dados' });
  }

  try {
    const user = await registerUser(name, email, password, categoriaId);

    return res.status(201).json({ user });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);

    return res.status(500).json({ error: error.message || 'Erro interno ao criar usuário' });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await getUsersAll();
    res.status(200).json({ users });
  } catch (error: any) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: error.message || 'Erro interno ao buscar usuários' });
  }
}
