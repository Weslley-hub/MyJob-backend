import { Request, Response } from 'express';
import { 
  sendFriendRequest, 
  acceptFriendRequest, 
  getFriendshipLevel, 
  listReceivedFriendRequests, 
  listFriends 
} from '../../services/Friends/friendService';

export const sendFriendRequestController = async (req: Request, res: Response): Promise<void> => {
  const { userId, friendId } = req.body;

  try {
    await sendFriendRequest(parseInt(userId, 10), parseInt(friendId, 10));
    res.status(200).json({ message: 'Solicitação de amizade enviada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const acceptFriendRequestController = async (req: Request, res: Response): Promise<void> => {
  const { userId, friendId } = req.body;

  try {
    await acceptFriendRequest(parseInt(userId, 10), parseInt(friendId, 10));
    res.status(200).json({ message: 'Solicitação de amizade aceita com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getFriendshipLevelController = async (req: Request, res: Response): Promise<void> => {
  const { userId, targetUserId } = req.params;

  const userIdInt = parseInt(userId, 10);
  const targetUserIdInt = parseInt(targetUserId, 10);

  if (isNaN(userIdInt) || isNaN(targetUserIdInt)) {
    res.status(400).json({ message: 'IDs de usuário inválidos.' });
    return;
  }

  try {
    const level = await getFriendshipLevel(userIdInt, targetUserIdInt);
    res.status(200).json({ level });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const listReceivedFriendRequestsController = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.query.userId);

  if (isNaN(userId)) {
    res.status(400).json({ message: 'User ID deve ser um número válido.' });
    return;
  }

  try {
    const requests = await listReceivedFriendRequests(userId);
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const listFriendsController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.query;

  try {
    const friends = await listFriends(Number(userId));
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
