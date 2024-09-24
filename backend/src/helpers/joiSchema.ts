import Joi from 'joi';

// Define the Joi schema
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).regex(/(?=.*[a-zA-Z])(?=.*\d)/).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'string.pattern.base': 'Password must contain both letters and numbers.',
    'any.required': 'Password is required.',
  }),
  fullName: Joi.string().pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/).required().messages({
    'string.pattern.base': 'Full name must contain two words separated by a space.',
    'any.required': 'Full name is required.',
  }),
});

// Define the Joi schema
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.',
  }),
});

// Schéma pour changer l'email
const emailSchema = Joi.object({
  newEmail: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'any.required': 'Email is required.',
  }),
});

// Schéma pour changer le mot de passe
const passwordSchema = Joi.object({
  newPassword: Joi.string().min(6).regex(/(?=.*[a-zA-Z])(?=.*\d)/).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'string.pattern.base': 'Password must contain both letters and numbers.',
    'any.required': 'New password is required.',
  }),
});

const contactSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z0-9\s]+$/).required().messages({
    'string.pattern.base': 'Name must contain only letters, numbers, or spaces.',
    'any.required': 'Name is required.',
  }),
  subject: Joi.string().pattern(/^[a-zA-Z0-9\s]+$/).required().messages({
    'string.pattern.base': 'Subject must contain only letters, numbers, or spaces.',
    'any.required': 'Subject is required.',
  }),
  message: Joi.string().pattern(/^[a-zA-Z0-9\s.,!?]+$/).required().messages({
    'string.pattern.base': 'Message must contain only letters, numbers, spaces, and common punctuation.',
    'any.required': 'Message is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'any.required': 'Email is required.',
  }),
});


export default {
  registerSchema,
  loginSchema,
  passwordSchema,
  emailSchema,
  contactSchema
};
