import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '../errors/index'; // Assuming you have a custom error handler
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: any; 
}

// Controller to create a response to an announce
const createResponse = async (req: AuthenticatedRequest, res: Response) => {
  const { content } = req.body;
  const {announceId}=req.params;
  const userId=Number(req.user.userId);
  try {
    // Check if all required fields are provided
    if (!userId || !announceId) throw new BadRequestError('User ID and Announce ID are required.');
    
    // Check if the user has already responded to the announce
    const existingResponse = await prisma.response.findUnique({
      where: {
        userId_announceId: {
          userId,
          announceId:Number(announceId)
        }
      }
    });

    if (existingResponse) throw new BadRequestError('You have already responded to this announce.');    

    // Create the response
    const response = await prisma.response.create({
      data: {
        userId,
        announceId:Number(announceId),
        content
      }
    });

    res.status(201).json({ message: 'Response created successfully', response });
  } catch (error) {
    console.error('Error creating response:', error);

    if (error instanceof BadRequestError) return res.status(error.statusCode).json({ message: error.message });
    
    res.status(500).json({ message: 'Error creating response' });
  }
};

export { createResponse };
