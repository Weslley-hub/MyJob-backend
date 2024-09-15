import express from 'express';
import { fetchCategories } from '../controllers/Category/categoryController';

const router = express.Router();

router.get('/list', fetchCategories);

export default router;