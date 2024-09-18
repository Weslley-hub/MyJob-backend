// Adicione a importação do PrismaClient
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Calcula a distância mínima entre dois usuários usando BFS
export const calculateDistanceBFS = async (startUserId: number, targetUserId: number): Promise<number> => {
  // Cria um mapa para armazenar as distâncias
  if (startUserId === targetUserId) {
    return 0; // Nível 0: o próprio usuário
  }

  const distances = new Map<number, number>();
  const queue: number[] = [startUserId];
  
  distances.set(startUserId, 0);

  while (queue.length > 0) {
    const currentUserId = queue.shift();
    if (currentUserId === undefined) continue;

    const currentDistance = distances.get(currentUserId)!;

    // Busca os amigos do usuário atual
    const friends = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId: currentUserId, status: 'ACCEPTED' },
          { friendId: currentUserId, status: 'ACCEPTED' }
        ]
      }
    });

    for (const friend of friends) {
      const neighborId = friend.userId === currentUserId ? friend.friendId : friend.userId;

      // Verifica se o vizinho já foi visitado
      if (!distances.has(neighborId)) {
        distances.set(neighborId, currentDistance + 1);
        queue.push(neighborId);

        // Verifica se chegou ao destino
        if (neighborId === targetUserId) {
          return distances.get(neighborId)!;
        }
      }
    }
  }

  // Retorna 3 se não houver caminho entre os usuários
  return 3;
};

// Sugere amizades com base na distância mínima
export const recommendFriendsBasedOnDistance = async (userId: number): Promise<any[]> => {
  // Busca todos os usuários, exceto o próprio
  const allUsers = await prisma.user.findMany({
    where: {
      NOT: { id: userId },
    },
  });

  // Busca as amizades já existentes para o usuário
  const existingFriends = await prisma.friendship.findMany({
    where: {
      OR: [
        { userId: userId, status: 'ACCEPTED' },
        { friendId: userId, status: 'ACCEPTED' },
      ]
    }
  });

  // Cria um Set para armazenar IDs de amigos existentes
  const existingFriendIds = new Set<number>();
  existingFriends.forEach(friendship => {
    if (friendship.userId === userId) {
      existingFriendIds.add(friendship.friendId);
    } else {
      existingFriendIds.add(friendship.userId);
    }
  });

  const recommendations: { userId: number, distance: number }[] = [];

  // Para cada usuário, calcula a distância se não for amigo existente
  for (const user of allUsers) {
    if (!existingFriendIds.has(user.id)) {
      const distance = await calculateDistanceBFS(userId, user.id);

      // Adiciona na lista de recomendação se a distância for 1 ou 2
      if (distance <= 2) {
        recommendations.push({ userId: user.id, distance });
      }
    }
  }

  // Ordena as recomendações com base na distância (menor primeiro)
  recommendations.sort((a, b) => a.distance - b.distance);

  // Retorna os usuários recomendados com base na menor distância
  return recommendations;
};

