import express from 'express';
import { fetchCategories } from '../controllers/Category/categoryController';

const router = express.Router();

router.get('/categories', fetchCategories);

export default router;