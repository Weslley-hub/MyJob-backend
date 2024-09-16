import express from 'express';
import { createUser, getUsers } from '../controllers/User/userController';

const router = express.Router();

router.post('/register', createUser);
router.get('/list', getUsers);


export default router;