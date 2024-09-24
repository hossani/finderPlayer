import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../errors';
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: any; 
  }

 const checkSeen = async(req:AuthenticatedRequest,res:Response)=>{
  const {id}=req.params;
  console.log(id)
  try{
   const updatedMessage=await prisma.message.update({
        where:{
          id:Number(id),
        },
        data:{
          seen:true
        }
      })
      if (!updatedMessage)  throw new NotFoundError('Message not found' );
      
res.status(200).json({messageId:id})
  }catch(error){
    if(error instanceof NotFoundError) return res.status(error.statusCode).json({message:error.message})
    res.status(500).json({message:'An error occurred while marking the message as seen'})
  }
 }

// Send a message
const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  const { receiverId, content } = req.body;
  const senderId = Number(req.user.userId);

  try {
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId:Number(receiverId),
        content
      }
    });
    const response=await prisma.user.findUnique({
      where:{
        id:senderId
      }
    })
    res.status(201).json({ message, sender:response?.fullName,picture:response?.picture});
  } catch (error) {
    res.status(500).json({ message: 'Error sending the message.' });
  }
};

// Retrieve message history with a specific user
const getMessageHistory = async (req: AuthenticatedRequest, res: Response) => {
  const { otherUser } = req.params;
  const userId = req.user.userId;

  try {
    // Récupérer tous les messages entre l'utilisateur connecté et l'autre utilisateur
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: parseInt(userId), receiverId: parseInt(otherUser) },
          { senderId: parseInt(otherUser), receiverId: parseInt(userId) }
        ]
      },
      orderBy: {
        dateSent: 'asc'
      }
    });

    // Mettre à jour le champ "seen" des messages non vus pour les marquer comme vus
    await prisma.message.updateMany({
      where: {
        senderId: parseInt(otherUser),
        receiverId: parseInt(userId),
        seen: false
      },
      data: {
        seen: true
      }
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Erreur lors de la récupération et de la mise à jour des messages:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des messages.' });
  }
};

const getUserConversations = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.userId; // ID de l'utilisateur connecté

    // Obtenir la liste des derniers messages par utilisateur, en filtrant les répétitions
    const conversations = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: Number(userId) },
          { receiverId: Number(userId) }
        ]
      },
      distinct: ['senderId', 'receiverId'], // Éviter les répétitions d'utilisateurs
      orderBy: {
        dateSent: 'desc' // Trier par date du dernier message
      },
      select: {
        content: true,
        dateSent: true,
        senderId: true,
        receiverId: true,
        sender: {
          select: {
            id: true,
            fullName: true,
            picture: true
          }
        },
        receiver: {
          select: {
            id: true,
            fullName: true,
            picture: true
          }
        }
      }
    });

    if (conversations.length === 0) throw new NotFoundError('Messages not found.');

    // Filtrer pour ne garder que les dernières conversations avec les autres utilisateurs
    const uniqueConversations: any[] = [];
    const userIds = new Set();

    conversations.forEach((message: any) => {
      // Identifier l'autre utilisateur dans la conversation
      const otherUser = message.senderId === userId ? message.receiver : message.sender;

      // Vérifier si cet autre utilisateur a déjà été traité
      if (!userIds.has(otherUser.id)) {
        userIds.add(otherUser.id);
        uniqueConversations.push({
          id: otherUser.id,
          fullName: otherUser.fullName,
          picture: otherUser.picture,
          content: message.content,
          dateSent: message.dateSent
        });
      }
    });

    return res.status(200).json({ uniqueConversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    if (error instanceof NotFoundError) return res.status(error.statusCode).json({ message: error.message });
    return res.status(500).json({ message: 'Erreur lors de la récupération des conversations.' });
  }
};

const getUnreadMessages = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId;

  try {
    const unreadMessages = await prisma.message.findMany({
      where: {
        receiverId: userId,
        seen: false
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            picture: true
          }
        }
      }
    });

    return res.json(unreadMessages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des messages non vus' });
  }
};

const deleteMessagesBetweenUsers = async (req: AuthenticatedRequest, res: Response) => {
  const { otherUserId } = req.params; // L'autre utilisateur avec qui on souhaite supprimer la conversation
  const userId = req.user.userId; // Utilisateur connecté

  try {
    // Supprimer tous les messages entre l'utilisateur connecté et l'autre utilisateur
    const deletedMessages = await prisma.message.deleteMany({
      where: {
        OR: [
          { senderId: parseInt(userId), receiverId: parseInt(otherUserId) },
          { senderId: parseInt(otherUserId), receiverId: parseInt(userId) }
        ]
      }
    });

    if (deletedMessages.count == 0) throw new NotFoundError('No messages found between the users.');
  
     res.status(200).json({ message: `${deletedMessages.count} messages deleted successfully.` });
  } catch (error) {
    console.error('Error deleting messages:', error);
    if (error instanceof NotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
     res.status(500).json({ message: 'Error deleting messages between the users.' });
  }
};

export { sendMessage, getMessageHistory,getUserConversations ,checkSeen,getUnreadMessages,
  deleteMessagesBetweenUsers
};
