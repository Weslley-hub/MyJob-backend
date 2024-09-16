import express from 'express';
import { createExperience, getExperiences, deleteExperience } from '../controllers/ProfessionalExperience/professionalExperience';


const router = express.Router();

router.post('/resgister', createExperience);
router.get('/list/:userId', getExperiences);
router.delete('/delete/:id', deleteExperience);

export default router;