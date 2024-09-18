import express from 'express';
import categoryRoutes from './categoryRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import experienceRoutes from './experienceRoutes';
import educationRoutes from './educationRoutes';
import friendsRoutes from './friendsRoutes';
import graphRoutes from './graphRoutes';

const router = express.Router();

router.use('/auths', authRoutes);

router.use('/users', userRoutes);

router.use('/professional-experiences', experienceRoutes);

router.use('/categories', categoryRoutes);

router.use('/educations', educationRoutes);

router.use('/friends', friendsRoutes);

router.use('/graph/', graphRoutes); 

export default router;