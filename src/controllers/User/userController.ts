import { Request, Response } from 'express';
import { registerUser } from '../../services/User/userService';

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await registerUser(name, email, password);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
}