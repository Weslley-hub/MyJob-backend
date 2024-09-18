import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type MutualFriend = {
    friendId: number;
};

export const sendFriendRequest = async (userId: number, friendId: number): Promise<void> => {
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    });
  
    if (existingFriendship) {
      throw new Error('Já existe uma solicitação ou amizade entre esses usuários.');
    }
  
    await prisma.friendship.create({
      data: {
        userId,
        friendId,
        status: 'PENDING'
      }
    });
};

export const acceptFriendRequest = async (userId: number, friendId: number): Promise<void> => {
  await prisma.friendship.updateMany({
    where: {
      userId: friendId,
      friendId: userId,
      status: 'PENDING'
    },
    data: {
      status: 'ACCEPTED'
    }
  });
};

export const getFriendshipLevel = async (userId: number, targetUserId: number): Promise<number> => {
    const directFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId: targetUserId, status: 'ACCEPTED' },
          { userId: targetUserId, friendId: userId, status: 'ACCEPTED' }
        ]
      }
    });
  
    if (directFriendship) {
      return 1;
    }

    const mutualFriends = await prisma.$queryRaw<MutualFriend[]>`
      SELECT f1."friendId" 
      FROM "Friendship" f1
      JOIN "Friendship" f2 ON f1."friendId" = f2."friendId"
      WHERE f1."userId" = ${userId} AND f2."userId" = ${targetUserId} AND f1."status" = 'ACCEPTED' AND f2."status" = 'ACCEPTED'
    `;
  
    if (mutualFriends.length > 0) {
      return 2;
    }

    return 3;
  };

export const listReceivedFriendRequests = async (userId: number) => {
    const receivedRequests = await prisma.friendship.findMany({
      where: {
        friendId: userId,
        status: 'PENDING'
      },
      include: {
        user: true
      }
    });
  
    return receivedRequests.map(request => ({
      id: request.id,
      sender: request.user,
      status: request.status
    }));
};

export const listFriends = async (userId: number) => {
    const friends = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status: 'ACCEPTED' },
          { friendId: userId, status: 'ACCEPTED' }
        ]
      },
      include: {
        user: true,
        friend: true
      }
    });
  
    return friends.map(friendship => {
      const friendData = friendship.userId === userId ? friendship.friend : friendship.user;
      return {
        id: friendship.id,
        friend: friendData,
        status: friendship.status
      };
    });
};
