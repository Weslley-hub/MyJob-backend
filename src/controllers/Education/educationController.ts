import { Request, Response } from 'express';
import { deleteEducation } from '../../services/Education/delete';
import { getEducations } from '../../services/Education/list';
import { createEducation } from '../../services/User/registerEducation';

export async function createEducationHandler(req: Request, res: Response) {
  const { userId, institution, degree, startDate, endDate } = req.body;

  if (!userId || !institution || !degree || !startDate) {
    return res.status(400).json({ error: 'Preencha todas as informações obrigatórias' });
  }

  try {
    const education = await createEducation(userId, institution, degree, new Date(startDate), endDate ? new Date(endDate) : undefined);
    res.status(201).json({ education });
  } catch (error) {
    console.error('Erro ao criar formação educacional:', error);
    res.status(500).json({ error: 'Erro interno ao criar formação educacional' });
  }
}

export async function getEducationsHandler(req: Request, res: Response) {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuário inválido' });
  }

  try {
    const educations = await getEducations(userId);
    res.status(200).json({ educations });
  } catch (error) {
    console.error('Erro ao buscar formações educacionais:', error);
    res.status(500).json({ error: 'Erro interno ao buscar formações educacionais' });
  }
}

export async function deleteEducationHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const education = await deleteEducation(id);
    res.status(200).json({ message: 'Formação educacional deletada com sucesso', education });
  } catch (error) {
    console.error('Erro ao deletar formação educacional:', error);
    res.status(500).json({ error: 'Erro interno ao deletar formação educacional' });
  }
}
