import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError } from '../errors'; // Assuming you have a custom error handler
import joiSchemas from '../helpers/joiSchema'; 
import * as generator from 'generate-password';
import { smtpService } from '../helpers/smpt';
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId; 
  const { fullName, email, bio, birthDate, locationId, sportId,picture } = req.body;
  try {
    // Prepare data to be updated
    const updatedData: any = {};
    if(picture) updatedData.picture=picture;
    if (fullName) updatedData.fullName = fullName;
    if (email) updatedData.email = email;
    if(bio) updatedData.bio=bio;
    if (birthDate) updatedData.birthDate = new Date(birthDate);
    if (locationId) updatedData.locationId = Number(locationId);
    if (sportId) updatedData.sportId = Number(sportId);
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: updatedData
    });
    
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error updating user profile.' });
  }
};
const getNewPlayer= async (req:AuthenticatedRequest, res:Response) => {
  try {
    const {userId} = req.params; 
    
    if (!userId) {
      throw new BadRequestError('Invalid user ID')
    }

    const user = await prisma.user.findUnique({where:{
      id:parseInt(userId)
    },
    include:{
      sport:true,
      location:true
    }
  });

    if (!user) {
      throw new NotFoundError('User not found')

    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    if(error instanceof BadRequestError || error instanceof NotFoundError){
      return res.status(error.statusCode).json({message:error.message})
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const userId = req.user.userId; 
    
    if (!userId) {
      throw new BadRequestError('Invalid user ID')
    }

    const user = await prisma.user.findUnique({where:{
      id:parseInt(userId)
    },
    include:{
      sport:true,
      location:true
    }
  });

    if (!user) {
      throw new NotFoundError('User not found')

    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    if(error instanceof BadRequestError || error instanceof NotFoundError){
      return res.status(error.statusCode).json({message:error.message})
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

 const deleteAccount = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.userId; 
    if (!userId) throw new BadRequestError('Invalid user ID');
  

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) throw new NotFoundError('User not found');


    await prisma.$transaction([
      prisma.announce.deleteMany({
        where: { userId: parseInt(userId) }
      }),
      prisma.response.deleteMany({
        where: { userId: parseInt(userId) }
      }),
      prisma.message.deleteMany({
        where: { OR: [{ senderId: parseInt(userId) }, { receiverId: parseInt(userId) }] }
      }),
      prisma.friendship.deleteMany({
        where: { OR: [{ user1Id:  parseInt(userId) }, { user2Id:  parseInt(userId) }] }
      }),
      prisma.user.delete({
        where: { id:  parseInt(userId) }
      })
    ])

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};


const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.userId; 
    const { currentPassword, newPassword } = req.body;

    if (!userId) throw new BadRequestError('Invalid user ID');


    if (!currentPassword || !newPassword) throw new BadRequestError('Both current and new passwords are required');

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) throw new NotFoundError('User not found');

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) throw new BadRequestError('Current password is incorrect');
    

    const { error } = joiSchemas.passwordSchema.validate({newPassword});
    if (error){
      const errorMessage=error.details[0].message;
      throw new BadRequestError(`${errorMessage}`); 
  } 

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const changeEmail = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.userId; 
    const { newEmail } = req.body;
    if (!userId)   throw new BadRequestError('Invalid user ID');
  
    const { error } = joiSchemas.emailSchema.validate({newEmail});
    if (error){
      const errorMessage=error.details[0].message;
      throw new BadRequestError(`${errorMessage}`); 
  } 

    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { email: newEmail },
    });

    if (!user)   throw new NotFoundError('User not found');
    
    res.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Error updating email:', error);
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const forgetPasswordAuth = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId; 

  try {
    let user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });
    if (!user) throw new NotFoundError('User not found');
    const newPassword = generator.generate({
      length:6,
      numbers:true,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt); // Hacher le mot de passe

    // Mettre à jour le mot de passe de l'utilisateur dans la base de données
 user= await prisma.user.update({
      where: { id: Number(userId) },
      data: { password: hashedPassword }
    });

    if(user){
     await smtpService(user.email,newPassword);
      res.status(200).json({ message: 'New password sent to your email' });
    }
  } catch (error) {
    console.error('Error recovering account:', error);
    if(error instanceof NotFoundError){
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};


const getFilteredPlayers = async (req: AuthenticatedRequest, res: Response) => {
  console.log(req.query)
  const { locationId, sportId, date }: any = req.query;
  const userId=req.user.userId;
  console.log("sportId",sportId)
  console.log("locationId",locationId)
  console.log("date",date)

  try {
    const orderByDate: any =
      date == 'recent' ? { dateRegistered: 'desc' } : { dateRegistered: 'asc' };

    // Requête pour récupérer les joueurs filtrés
    const players = await prisma.user.findMany({
      where: {
        id: { not: Number(userId) }, // Exclure l'utilisateur authentifié
        locationId: locationId =='allCities' ? undefined : Number(locationId),
        sportId: sportId == 'allSports' ? undefined : Number(sportId),
      },
      orderBy: orderByDate, // Ordre par date d'inscription
      include: {
        location: true, // Inclure les informations de localisation
        sport: true, // Inclure les informations de sport
      },
    });

    if(players.length>0) return  res.status(200).json({ listePlayers:players });
      
    // Vérifier si des joueurs ont été trouvés
    if (players.length == 0)  throw new NotFoundError('Players not found');
    
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs:', error);
    if (error instanceof NotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }else{
     return res.status(500).json({ message: 'Error fetching players' });

    }
  }
};

export { updateUserProfile , getUserById,deleteAccount,changePassword,changeEmail,forgetPasswordAuth,
  getFilteredPlayers,getNewPlayer

};
