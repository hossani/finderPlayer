import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../errors';
const prisma = new PrismaClient();

 const getSports = async (req: Request, res: Response) => {
  try {
    const sports = await prisma.sport.findMany();
    res.status(200).json(sports);
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Error fetching sports' });
  }
};



 const getSportById = async (req: Request, res: Response) => {
  const { sportId } = req.params;  // Récupère l'ID du sport depuis les paramètres de la requête
  try {
    const sport = await prisma.sport.findUnique({
      where: { id: Number(sportId) },  // Utilise l'ID pour trouver le sport
    });

    if (sport) {
      res.status(200).json(sport);
    } else {
throw new NotFoundError('Sport not found')    }
  } catch (error) {
    console.error('Error fetching sport:', error);
    if(error instanceof NotFoundError){
      return res.status(error.statusCode).json({message:error.message})
    }
    res.status(500).json({ message: 'Error fetching sport' });
  }
};


export { getSports,getSportById };
