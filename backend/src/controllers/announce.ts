import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../errors';
import { filterByDate } from '../helpers/filterByDate';
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: any; 
  }

// Create an announcement
const createAnnounce = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, locationId, sportId,deadline } = req.body;
  const deadlineDate = new Date(deadline);
  const userId = req.user.userId;
  try {
    const announce = await prisma.announce.create({
      data: {
        title,
        description,
        locationId,
        sportId,
        deadline:deadlineDate,
        userId
      }
    });

    res.status(201).json({ announce });
  } catch (error) {
    res.status(500).json({ message: 'Error during the creation of the announcement.' });
  }
};


 const getFilteredEvents = async (req: Request, res: Response) => {
  const { locationId, sportId, date }:any = req.query;
  try {
    const orderByDate:any|undefined =
    date === 'recent' ? { datePosted: 'desc' } : date === 'old' ? { datePosted: 'asc' } : undefined;
    const announces = await prisma.announce.findMany({
      where: {
        locationId: locationId=='allCities' ? undefined: parseInt(locationId),
        sportId: sportId=='allSports' ? undefined: parseInt(sportId),
        datePosted: date!='recent' && 'old' ? filterByDate(date) : undefined,
      },
      orderBy: orderByDate,
      include: {
        location: true,
        sport: true,
        user: true,
      },
    }); 
    if(announces.length == 0) {throw new NotFoundError('Anouncements not found');}
    res.status(200).json({announces});
  } catch (error) {
    console.error('Error fetching events:', error);
    if(error instanceof NotFoundError){
      return res.status(error.statusCode).json({message:error.message});

    }
    res.status(500).json({ message: 'Error fetching events' });
  }
};




const getAnnounceById = async (req: Request, res: Response) => {
  const { eventID } = req.params;
  try {
    const announce = await prisma.announce.findUnique({
      where: { id: Number(eventID) },
      include: {
        user: {
          select: {
            fullName: true,
            picture: true,
            sport: {
              select: {
                title: true,
                imageUrl: true,
              },
            },
          },
        },
        sport: {
          select: {
            title: true,
            imageUrl: true,
          },
        },
        location: {
          select: {
            city: true,
          },
        },
      },
    });

    if (announce) {
      res.status(200).json({ announce });
    } else {
      throw new NotFoundError('Announcement not found.')
    }
  } catch (error) {
    if(error instanceof NotFoundError){
      return res.status(error.statusCode).json({message:error.message})
    }
    res.status(500).json({ message: 'Error during the retrieval of the announcement.' });
  }
};


export { createAnnounce, getFilteredEvents ,getAnnounceById };
