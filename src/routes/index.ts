import express from 'express';
import categoryRoutes from './categoryRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import experienceRoutes from './experienceRoutes';
import educationRoutes from './educationRoutes';

const router = express.Router();

router.use('/auths', authRoutes);

router.use('/users', userRoutes);

router.use('/professional-experiences', experienceRoutes);

router.use('/categories', categoryRoutes);

router.use('/educations', educationRoutes);

export default router;