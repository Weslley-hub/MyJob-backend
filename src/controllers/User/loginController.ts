import { Request, Response } from 'express';
import { authenticateUser } from "../../services/User/loginService";

export async function loginUser(req: Request, res: Response) {

    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Preencha todas as informações' });
    }
  
    try {
      const { token } = await authenticateUser(email, password);
      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
    }
}}