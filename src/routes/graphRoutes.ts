import express from 'express';
import { calculateDistanceController, recommendFriendsController } from '../controllers/Graph/grapgController';

const router = express.Router();

// Calcula a distância entre dois usuários
router.get('/distance/:startUserId/:targetUserId', calculateDistanceController);

// Recomenda amigos com base na distância
router.get('/recommendations/:userId', recommendFriendsController);

export default router;
