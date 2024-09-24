import { Request, Response } from "express";
import { BadRequestError } from '../errors/index';  // Assuming you have a custom error handler
import joiSchemas from '../helpers/joiSchema'; 
import { smtpServiceForContact } from "../helpers/contactUsingSMTP";

const sendMessageContact=async (req:Request,res:Response)=>{

    const {name,subject,message,email}=req.body;
    try{

        const { error } = joiSchemas.contactSchema.validate({name,subject,message,email});
        if (error) {
        const errorMessage = error.details[0].message;
        throw new BadRequestError(`${errorMessage}`);
        }

  await smtpServiceForContact (name,email,subject,message);
  res.status(200).json({message:'Message sent successfully'})

    }catch(error){
        console.log('Error during send message',error)
        if(error instanceof BadRequestError) return res.status(error.statusCode).json({message:error.message})
   res.status(500).json({message:'Internal server problem'})
        }
}

export {sendMessageContact};