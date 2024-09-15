import { Request, Response } from 'express';
import { getCategories } from '../../services/Category/listCategoriesService';

export async function fetchCategories(req: Request, res: Response) {
  try {
    const categories = await getCategories();
    res.status(200).json({ categories });
  } catch (error: any) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: error.message || 'Erro interno ao buscar categorias' });
  }
}
