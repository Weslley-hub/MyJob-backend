import express from 'express';
import categoryRoutes from './categoryRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

router.use('/auths', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/users', userRoutes);

export default router;