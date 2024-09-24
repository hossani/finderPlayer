import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { BadRequestError,UnauthenticatedError } from '../errors/index';  // Assuming you have a custom error handler
import { PrismaClient } from '@prisma/client';
import joiSchemas from '../helpers/joiSchema'; 

const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
  const { email, password, fullName, locationId, sportId, birthDate } = req.body;

  try {
    // Check that all required fields are provided.
    if (!email || !password || !fullName || !locationId || !sportId || !birthDate) {
      throw new BadRequestError('All fields are required.');
    }

    const { error } = joiSchemas.registerSchema.validate({email,password,fullName});
    if (error){
      const errorMessage=error.details[0].message;
      throw new BadRequestError(`${errorMessage}`); 
  } 
   
   // Check if the birth date is valid
    // Parse birth date and calculate age
    const parsedBirthDate = new Date(birthDate);
    const today = new Date();
    
    // Calculate age
    let age = today.getFullYear() - parsedBirthDate.getFullYear();
    const monthDifference = today.getMonth() - parsedBirthDate.getMonth();

    // Adjust age if birth date has not occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < parsedBirthDate.getDate())) {
      age--;
    }

    // Check if age is valid
    if (age < 10 || age > 80) {
      throw new BadRequestError('Age must be between 10 and 80 years old.');
    }


    // Check if the email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    });
    if (existingEmail) {
      throw new BadRequestError('This user already exists.');
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Convert birthDate if it is a string

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        locationId,
        sportId,
        birthDate: parsedBirthDate,
        picture:'https://res.cloudinary.com/dhtqzlo9k/image/upload/v1726227825/lsqx613v1mwxhvtw3top.jpg'
      }
    });

    // JWT token generation
    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Respond with success
    res.status(201).json({ userId:user.id, token });
  } catch (error) {
    // Error handling
    console.error('Problem in account creation.', error);

    if (error instanceof BadRequestError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: 'Error during account creation.' });
  }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      // Check that the email and password fields are provided
      if (!email || !password) {
        throw new BadRequestError('All fields are required.');
      }
  
       // Validate input data
       const { error } = joiSchemas.loginSchema.validate({ email, password });
      if (error) {
      const errorMessage = error.details[0].message;
      throw new BadRequestError(`${errorMessage}`);
      }

      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email }
      });
      if (!user) {
        throw new UnauthenticatedError('Invalid email or password.');
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthenticatedError('Invalid email or password.');
      }
  
      // JWT token generation
      const token =await jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  
      //Respond with success
      res.status(200).json({ userId: user.id, token });
    } catch (error) {
      // Error handling
      console.error('Problem during login', error);
      if (error instanceof BadRequestError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else if(error instanceof UnauthenticatedError){
        return res.status(error.statusCode).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error during login.' });
    }
  };



export { register,login };
