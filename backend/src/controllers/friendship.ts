import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError } from '../errors';
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: any; 
  }

  const acceptFriendRequest = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.userId;  // L'utilisateur actuel (celui qui accepte la demande)
    const { fromUserId } = req.params;  // L'utilisateur qui a envoyé la demande
  
    try {
      // Trouver la relation d'amitié où user1 est le sender et user2 est le receiver
      const friendship = await prisma.friendship.findFirst({
        where: {
          user1Id: Number(fromUserId),  // L'utilisateur "fromUserId" est le sender
          user2Id: Number(userId),      // L'utilisateur actuel est le receiver
          status: 'PENDING'             // Seulement pour les demandes en attente
        }
      });
  
      if (friendship) {
        // Mettre à jour le statut de la demande d'amitié à "ACCEPTED"
        await prisma.friendship.update({
          where: {
            id: friendship.id  // Utiliser l'ID de la relation trouvée pour la mise à jour
          },
          data: {
            status: 'ACCEPTED'
          }
        });
        res.status(200).json({ id: Number(fromUserId), status: 'ACCEPTED' });
      } else {
        throw new NotFoundError('Friend request not found or already processed.');
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
  
      res.status(500).json({ message: 'Error during the acceptance of the friend request' });
    }
  };


const getFriends =  async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId; // ID de l'utilisateur connecté
  try {
    const friends = await prisma.friendship.findMany({
      where: {
        OR: [
          { user1Id: userId, status: 'ACCEPTED' },
          { user2Id: userId, status: 'ACCEPTED' }
        ]
      },
      include: {
        user1: {
          include:{
            sport:true
          }
        }, // Inclure les données de user1
        user2: {
          include:{
            sport:true
          }
        }  // Inclure les données de user2
      }
    });

    if(friends.length==0) throw new NotFoundError('No friends found.');

    // Filtrer et formater les résultats pour retourner l'autre utilisateur dans chaque relation
    const friendList = friends.map(friendship => {
      return friendship.user1Id === userId ? friendship.user2 : friendship.user1;
    });
    res.status(200).json({friends:friendList});
  } catch (error) {
    console.error('Error fetching friends:', error);
    if(error instanceof NotFoundError){
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const sendFriendRequest = async (req: AuthenticatedRequest, res: Response) => {
  const user1Id=Number(req.user.userId); // Sender
  const {user2Id}= req.body;
  try {
    // Vérifier si une demande d'ami existe déjà entre les deux utilisateurs
    const existingRequest = await prisma.friendship.findUnique({
      where: {
        user1Id_user2Id: { user1Id, user2Id:Number(user2Id) },
      },
    });

    if (existingRequest) throw new BadRequestError('Request already sent');
    const senderUser = await prisma.user.findUnique({
      where: { id: user1Id },
   
    });
    // Créer la nouvelle demande d'ami dans la base de données
    const newFriendship = await prisma.friendship.create({
      data: {
        user1Id,
        user2Id,
        status: 'PENDING',
      },
    });

   
    res.status(201).json({newFriendship,senderUser});
  } catch (error) {
    console.error('Erreur lors de la création de la demande d\'ami:', error);
    if(error instanceof BadRequestError) return  res.status(error.statusCode).
    json({ message: error.message });

    res.status(500).json({ message: 'Erreur interne lors de la création de la demande d\'ami.' });
  }
};

const getFriendsPending = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId; // ID de l'utilisateur connecté

  try {
    // Trouver toutes les demandes d'amis en attente où l'utilisateur connecté est le destinataire
    const pendingRequests = await prisma.friendship.findMany({
      where: {
        user2Id: Number(userId), // L'utilisateur connecté est le destinataire
        status: 'PENDING' // Le statut de la demande est en attente
      },
      include: {
        user1: true // Inclure les informations sur l'utilisateur qui a envoyé la demande (user1)
      },
      orderBy: {
        dateAdded: 'desc' // Trier par date de création, les plus récentes en premier
      }
    });

    if (pendingRequests.length === 0) throw new NotFoundError('No pending friend requests found.');
  

    // Renvoyer les informations sur les utilisateurs qui ont envoyé les demandes d'amis
    const pendingList = pendingRequests.map(request => {
      return {
        id: request.id, // ID de la demande d'ami
        sender: request.user1, // Informations sur l'utilisateur qui a envoyé la demande
        fromUserId:request.user1.id // ID de user sender
      };
    });

    res.status(200).json({ pendingRequests: pendingList });
  } catch (error) {
    // console.error('Error fetching pending friend requests:', error);
    if (error instanceof NotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const rejectFriendRequest = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId;  // L'utilisateur actuel (celui qui rejette la demande)
  const { fromUserId } = req.params;  // L'utilisateur qui a envoyé la demande

  try {
    // Trouver la relation d'amitié où user1 est le sender et user2 est le receiver
    const friendship = await prisma.friendship.findFirst({
      where: 
          {
            user1Id: Number(fromUserId) , // L'utilisateur "fromUserId" est le sender
            user2Id: Number(userId),     // L'utilisateur actuel est le receiver
            status:'PENDING'
          }
    });

    if (friendship) {
      // Supprimer la relation d'amitié trouvée
      await prisma.friendship.delete({
        where: {
          id: friendship.id // Utiliser l'ID de la relation trouvée pour la suppression
        },
      });
      res.status(200).json({ id: Number(fromUserId)  });
    } else {
      throw new NotFoundError('Friend request not found or already processed.')
    }
  } catch (error) {
    if(error instanceof NotFoundError) return res.status(error.statusCode).json({ message: error.message });

    res.status(500).json({ message: 'Error during the rejection of the friend request' });
  }
};

const checkFriendStatus = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId; // ID de l'utilisateur connecté
  const { playerId } = req.params; // ID du joueur dont on veut vérifier le statut d'amitié

  if (!userId)  throw new BadRequestError("User not authenticated") ;
  if (!playerId) throw new BadRequestError("Player ID is required");
  
  try {
    // Rechercher si une relation d'amitié existe entre l'utilisateur connecté et le joueur
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: Number(userId), user2Id: Number(playerId) },
          { user1Id: Number(playerId), user2Id: Number(userId) }
        ]
      }
    });

if(friendship?.status) return res.status(200).json({ status: friendship.status });
  } catch (error) {
    console.error('Error checking friend status:', error);
    if(error instanceof BadRequestError) return res.status(error.statusCode).
    json({ message: error.message });

    res.status(500).json({ message: 'Internal server error' });
  }
};


 const deleteFriendshipAndMessages = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId; // L'utilisateur actuel
  const { friendId } = req.params; // L'ID de l'ami

  try {
    // Vérifier si la relation d'amitié existe
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: Number(userId), user2Id: Number(friendId) },
          { user1Id: Number(friendId), user2Id: Number(userId) }
        ]
      }
    });

    if (!friendship) throw new NotFoundError('Friendship not found')
   await prisma.$transaction([
      prisma.message.deleteMany({
        where: {
          OR: [
            { senderId: Number(userId), receiverId: Number(friendId) },
            { senderId: Number(friendId), receiverId: Number(userId) }
          ]
        }
      }),
     prisma.friendship.deleteMany({
      where: {
        OR: [
          { user1Id: Number(userId), user2Id: Number(friendId) },
          { user1Id: Number(friendId), user2Id: Number(userId) }
        ]
      }    }),
  ]);
    
    res.status(200).json({ message: 'Friendship and messages deleted successfully' });
  } catch (error) {
    console.error("Error deleting friendship and messages:", error);
    if(error instanceof NotFoundError) return res.status(error.statusCode).json({message:error.message})
    res.status(500).json({ message: 'Error deleting friendship and messages' });
  }
};


export { sendFriendRequest,acceptFriendRequest, rejectFriendRequest ,getFriends, getFriendsPending
  ,checkFriendStatus,deleteFriendshipAndMessages
};
