import { Request, Response } from 'express';
import { calculateDistanceBFS, recommendFriendsBasedOnDistance } from '../../services/Graph/graphService';

// Calcula a distância entre dois usuários
export const calculateDistanceController = async (req: Request, res: Response): Promise<void> => {
  const { startUserId, targetUserId } = req.params;

  try {
    const distance = await calculateDistanceBFS(Number(startUserId), Number(targetUserId));
    res.status(200).json({ distance });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Recomenda amigos com base na distância
export const recommendFriendsController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const recommendations = await recommendFriendsBasedOnDistance(Number(userId));
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
