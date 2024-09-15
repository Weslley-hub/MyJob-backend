import express from 'express';
import { loginUser } from '../controllers/User/userController';

const router = express.Router();

router.post('/login', loginUser);

export default router;