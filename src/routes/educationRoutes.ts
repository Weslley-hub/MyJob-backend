import express from 'express';
import { createEducationHandler, getEducationsHandler, deleteEducationHandler } from 'src/controllers/Education/educationController';

const router = express.Router();

router.post('/register', createEducationHandler);
router.get('/list/:userId', getEducationsHandler);
router.delete('/delete/:id', deleteEducationHandler);

export default router;