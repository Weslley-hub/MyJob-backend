import express from 'express';
import { createUser } from '../controllers/User/userController';
import { getUsersAll } from '../services/User/listService';

const router = express.Router();

router.post('/register', createUser);
router.get('/list', getUsersAll);


export default router;