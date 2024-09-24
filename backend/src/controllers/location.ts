import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../errors';
const prisma = new PrismaClient();

 const getLocations = async (req: Request, res: Response) => {
    try {
      const locations = await prisma.location.findMany();
      res.status(200).json(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ message: 'Error fetching locations' });
    }
  };


 const getLocationById = async (req: Request, res: Response) => {
  const { locationId } = req.params;  // Récupère l'ID de la location depuis les paramètres de la requête
  try {
    const location = await prisma.location.findUnique({
      where: { id: Number(locationId) },  // Utilise l'ID pour trouver la location
    });

    if (location) {
      res.status(200).json(location);
    } else {
      throw new NotFoundError('Location not found')    
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    if(error instanceof NotFoundError){
      return res.status(error.statusCode).json({message:error.message})
    }
    res.status(500).json({ message: 'Error fetching location' });
  }
};

export { getLocations,getLocationById };
