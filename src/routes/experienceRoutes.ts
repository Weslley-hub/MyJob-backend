import express from 'express';
import { createExperience, deleteExperience, getExperiences } from 'src/controllers/ProfessionalExperience/professionalExperience';

const router = express.Router();

router.post('/resgister', createExperience);
router.get('/list/:userId', getExperiences);
router.delete('/delete/:id', deleteExperience);

export default router;