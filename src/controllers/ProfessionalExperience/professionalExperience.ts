import { Request, Response } from 'express';
import { deleteProfessionalExperience } from 'src/services/ProfessionalExperience/deleteService';
import { getProfessionalExperiences } from 'src/services/ProfessionalExperience/getService';
import { createProfessionalExperience } from 'src/services/ProfessionalExperience/registerService';

export async function createExperience(req: Request, res: Response) {
  const { userId, company, role, startDate, endDate } = req.body;

  if (!userId || !company || !role || !startDate) {
    return res.status(400).json({ error: 'Preencha todas as informações obrigatórias' });
  }

  try {
    const experience = await createProfessionalExperience(userId, company, role, new Date(startDate), endDate ? new Date(endDate) : undefined);
    res.status(201).json({ experience });
  } catch (error) {
    console.error('Erro ao criar experiência profissional:', error);
    res.status(500).json({ error: 'Erro interno ao criar experiência profissional' });
  }
}

export async function getExperiences(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10);
  
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'ID de usuário inválido' });
    }
  
    try {
      const experiences = await getProfessionalExperiences(userId);
      res.status(200).json({ experiences });
    } catch (error) {
      console.error('Erro ao buscar experiências profissionais:', error);
      res.status(500).json({ error: 'Erro interno ao buscar experiências profissionais' });
    }
}

export async function deleteExperience(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
  
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
  
    try {
      const experience = await deleteProfessionalExperience(id);
      res.status(200).json({ message: 'Experiência profissional deletada com sucesso', experience });
    } catch (error) {
      console.error('Erro ao deletar experiência profissional:', error);
      res.status(500).json({ error: 'Erro interno ao deletar experiência profissional' });
    }
  }